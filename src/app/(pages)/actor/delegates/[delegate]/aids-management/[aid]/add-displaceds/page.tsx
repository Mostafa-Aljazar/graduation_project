import Delegate_Aid_Add_Displaceds_Page from '@/components/actors/delegate/aids-management/add-displaceds/delegate-aid-add-displaceds-page';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { USER_RANK } from '@/constants/userTypes';
import { DELEGATE_ROUTES_fUNC, GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import { FAVICON } from '@/assets/common';

const FALLBACK = {
  TITLE: 'إضافة نازحين إلى المساعدة | AL-AQSA Camp',
  DESCRIPTION: 'إضافة المستفيدين إلى المساعدة التي يشرف عليها المندوب في منصة مخيم الأقصى.',
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

    const aidTitle = response?.aid?.aid_name || 'مساعدة';
    const title = `إضافة نازحين إلى "${aidTitle}" | AL-AQSA Camp`;
    const description = `أضف المستفيدين إلى المساعدة "${aidTitle}" التي يشرف عليها المندوب في منصة مخيم الأقصى.`;

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'website',
        url:
          APP_URL +
          DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId, aid_Id: aidId }).ADD_AID_DISPLACEDS,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Add Displaceds to Aid' },
          ...previousImages,
        ],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [FALLBACK.IMAGE],
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
        type: 'website',
        url: APP_URL + GENERAL_ACTOR_ROUTES.DELEGATES,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Add Displaceds to Aid' },
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

export default async function Delegate_Add_Displaceds_Aid({ params }: Props) {
  const { delegate, aid } = await params;
  const delegateId = Number(delegate);
  const aidId = Number(aid);

  return <Delegate_Aid_Add_Displaceds_Page delegate_Id={delegateId} aid_Id={aidId} />;
}
