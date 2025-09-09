import Delegate_Aid_Page from '@/components/actors/delegate/aids-management/add-displaceds/delegate-aid-add-displaceds-page';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import { USER_RANK } from '@/constants/userTypes';
import { FAVICON } from '@/assets/common';

const FALLBACK = {
  TITLE: 'إدارة المساعدة | AL-AQSA Camp',
  DESCRIPTION: 'إضافة المستفيدين إلى المساعدة الخاصة بالمندوب في منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ delegate: string; aid: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { delegate, aid } = await params;
  const delegateId = Number(delegate);
  const aidId = Number(aid);
  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const response = await getAid({
      aid_Id: aidId,
      actor_Id: delegateId,
      role: USER_RANK.DELEGATE,
    });

    const aidData = response?.aid;

    const title = aidData ? `إدارة المساعدة: ${aidData.aid_name} | AL-AQSA Camp` : FALLBACK.TITLE;
    const description = aidData
      ? `إضافة المستفيدين للمساعدة "${aidData.aid_name}" عبر المندوب في منصة مخيم الأقصى.`
      : FALLBACK.DESCRIPTION;
    const image = FALLBACK.IMAGE;

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'article',
        url: APP_URL + DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId, aid_Id: aidId }).AID,
        images: [
          { url: image, width: 600, height: 600, alt: aidData?.aid_name || 'Aid Details' },
          ...previousImages,
        ],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title: FALLBACK.TITLE,
        description: FALLBACK.DESCRIPTION,
        type: 'article',
        url: APP_URL + DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId, aid_Id: aidId }).AID,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Aid Details' },
          ...previousImages,
        ],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title: FALLBACK.TITLE,
        description: FALLBACK.DESCRIPTION,
        images: [FALLBACK.IMAGE],
      },
    };
  }
}

export default async function Delegate_Aid({ params }: Props) {
  const { delegate, aid } = await params;
  const delegateId = Number(delegate);
  const aidId = Number(aid);

  return <Delegate_Aid_Page delegate_Id={delegateId} aid_Id={aidId} />;
}
