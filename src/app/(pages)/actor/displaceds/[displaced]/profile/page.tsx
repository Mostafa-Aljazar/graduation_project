import Displaced_Profile_Form from '@/components/actors/displaced/profile/displaced-profile-form';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { getDisplacedProfile } from '@/actions/actors/displaced/profile/getDisplacedProfile';
import { APP_URL } from '@/constants/services';
import { DISPLACED_ROUTES_fUNC } from '@/constants/routes';
import { MAN } from '@/assets/actor';

const FALLBACK = {
  TITLE: 'الملف الشخصي للنازح | AL-AQSA Camp',
  DESCRIPTION: 'تفاصيل الملف الشخصي للنازحين على منصة مخيم الأقصى.',
  IMAGE: MAN?.src,
};

interface Props {
  params: Promise<{ displaced: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { displaced } = await params;
  const displacedId = Number(displaced);
  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const res = await getDisplacedProfile({ displaced_Id: displacedId });
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
          url: APP_URL + DISPLACED_ROUTES_fUNC({ displaced_Id: displacedId }).PROFILE,
          images: [{ url: image, width: 600, height: 600, alt: user.name }, ...previousImages],
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
      url: APP_URL + DISPLACED_ROUTES_fUNC({ displaced_Id: displacedId }).PROFILE,
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

export default async function DisplacedProfile({ params }: Props) {
  const { displaced } = await params;
  const displacedId = Number(displaced);

  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Displaced_Profile_Form displaced_Id={displacedId} />
    </Suspense>
  );
}
