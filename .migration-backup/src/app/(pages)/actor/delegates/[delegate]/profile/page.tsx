import Delegate_Profile_Form from '@/components/actors/delegate/profile/delegate-profile-form';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { getDelegateProfile } from '@/actions/actors/delegates/profile/getDelegateProfile';
import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';

const FALLBACK = {
  TITLE: 'الملف الشخصي للمندوب | AL-AQSA Camp',
  DESCRIPTION: 'تفاصيل الملف الشخصي للمندوبين على منصة مخيم الأقصى.',
  IMAGE: MAN.src,
};

interface Props {
  params: Promise<{ delegate: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { delegate } = await params;
  const delegateId = Number(delegate);

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const res = await getDelegateProfile({ delegate_Id: delegateId });
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
          url: APP_URL + DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId }).PROFILE,
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
      url: APP_URL + DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId }).PROFILE,
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

export default async function DelegateProfile({ params }: Props) {
  const { delegate } = await params;
  const delegateId = Number(delegate);

  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Delegate_Profile_Form delegate_Id={delegateId} />
    </Suspense>
  );
}
