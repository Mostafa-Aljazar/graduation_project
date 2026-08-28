import Manager_Add_Aid_Page from '@/components/actors/manager/aids-management/add/page/manager-add-aid-page';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';

const FALLBACK = {
  TITLE: 'إضافة مساعدة | AL-AQSA Camp',
  DESCRIPTION: 'إضافة مساعدة جديدة عبر المدير في منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
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

  return {
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    metadataBase: new URL(APP_URL),
    openGraph: {
      siteName: 'AL-AQSA Camp',
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      type: 'website',
      url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId }).ADD_AID,
      images: [{ url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Add Aid' }, ...previousImages],
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

export default async function Manager_Add_Aid({ params }: Props) {
  const { manager } = await params;
  const managerId = Number(manager);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Add_Aid_Page manager_Id={managerId} />
    </Suspense>
  );
}
