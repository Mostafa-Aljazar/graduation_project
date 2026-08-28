import Manager_Aid_Page from '@/components/actors/manager/aids-management/aid/manager-aid-page';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import { USER_RANK } from '@/constants/userTypes';
import { FAVICON } from '@/assets/common';
import { Suspense } from 'react';

const FALLBACK = {
  TITLE: 'إدارة المساعدة | AL-AQSA Camp',
  DESCRIPTION: 'عرض تفاصيل المساعدة الخاصة بالمدير في منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ manager: string; aid: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { manager, aid } = await params;
  const managerId = Number(manager);
  const aidId = Number(aid);

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const response = await getAid({
      aid_Id: aidId,
      actor_Id: managerId,
      role: USER_RANK.MANAGER,
    });
    const aid = response?.aid;

    const title = aid ? `إدارة المساعدة: ${aid.aid_name} | AL-AQSA Camp` : FALLBACK.TITLE;
    const description = aid
      ? `عرض تفاصيل المساعدة "${aid.aid_name}" للمدير في منصة مخيم الأقصى.`
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
        type: 'website',
        url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId, aid_Id: aidId }).AID,
        images: [
          { url: image, width: 600, height: 600, alt: aid?.aid_name || 'Aid Details' },
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
        url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId, aid_Id: aidId }).AID,
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

export default async function Manager_Aid({ params }: Props) {
  const { manager, aid } = await params;
  const managerId = Number(manager);
  const aidId = Number(aid);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Aid_Page manager_Id={managerId} aid_Id={aidId} />
    </Suspense>
  );
}
