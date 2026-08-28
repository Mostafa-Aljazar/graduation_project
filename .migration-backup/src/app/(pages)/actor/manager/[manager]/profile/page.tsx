import Manager_Profile_Form from '@/components/actors/manager/profile/manager-profile-form';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { getManagerProfile } from '@/actions/actors/manager/profile/getManagerProfile';
import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';

const FALLBACK = {
  TITLE: 'الملف الشخصي للمدير | AL-AQSA Camp',
  DESCRIPTION: 'تفاصيل الملف الشخصي لمدير مخيم الأقصى.',
  IMAGE: MAN.src,
};

interface Props {
  params: Promise<{ manager: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { manager } = await params;
  const managerId = Number(manager);
  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const res = await getManagerProfile({ manager_Id: managerId });
    const user = res?.status === 200 ? res.user : null;

    if (user) {
      const title = `الملف الشخصي: ${user.name} | AL-AQSA Camp`;
      const description = `عرض تفاصيل ${user.name} في مخيم الأقصى`;
      const image = user.profile_image || FALLBACK.IMAGE;

      return {
        title,
        description,
        metadataBase: new URL(APP_URL),
        openGraph: {
          siteName: 'AL-AQSA Camp',
          title,
          description,
          type: 'profile',
          url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId }).PROFILE,
          images: [...previousImages, { url: image, width: 600, height: 600, alt: user.name }],
          locale: 'ar',
        },
        twitter: {
          card: 'summary',
          title,
          description,
          images: [image],
        },
      };
    }
  } catch {}

  return {
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    metadataBase: new URL(APP_URL),
    openGraph: {
      siteName: 'AL-AQSA Camp',
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      type: 'profile',
      url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId }).PROFILE,
      images: [
        { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'AL-AQSA Camp' },
        ...previousImages,
      ],
      locale: 'ar',
    },
    twitter: {
      card: 'summary',
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      images: [FALLBACK.IMAGE],
    },
  };
}

export default async function ManagerProfile({ params }: Props) {
  const { manager } = await params;
  const managerId = Number(manager);

  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Manager_Profile_Form manager_Id={managerId} />
    </Suspense>
  );
}
