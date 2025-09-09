import Security_Profile_Form from '@/components/actors/security/profile/security-profile-form';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { getSecurityProfile } from '@/actions/actors/security/profile/getSecurityProfile';
import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { SECURITY_ROUTES_fUNC } from '@/constants/routes';

const FALLBACK = {
  TITLE: 'الملف الشخصي للحارس | AL-AQSA Camp',
  DESCRIPTION: 'تفاصيل الملف الشخصي للحراس على منصة مخيم الأقصى.',
  IMAGE: MAN.src,
};

interface Props {
  params: Promise<{ security: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { security } = await params;
  const securityId = Number(security);

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const res = await getSecurityProfile({ security_Id: securityId });
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
          url: APP_URL + SECURITY_ROUTES_fUNC({ security_Id: securityId }).PROFILE,
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
      url: APP_URL + SECURITY_ROUTES_fUNC({ security_Id: securityId }).PROFILE,
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

export default async function SecurityProfile({ params }: Props) {
  const { security } = await params;
  const securityId = Number(security);

  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Security_Profile_Form security_Id={securityId} />
    </Suspense>
  );
}
