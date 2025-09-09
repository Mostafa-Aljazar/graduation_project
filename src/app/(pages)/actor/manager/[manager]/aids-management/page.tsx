import Common_Aids_Management_Page from '@/components/actors/general/aids-management/main/content/common-aids-management-page';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { USER_RANK } from '@/constants/userTypes';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { getAids } from '@/actions/actors/general/aids-management/getAids';
import { TYPE_GROUP_AIDS } from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';

const FALLBACK = {
  TITLE: 'إدارة مساعدات المدير | AL-AQSA Camp',
  DESCRIPTION: 'عرض جميع المساعدات التي يشرف عليها المدير في منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ manager: string }>;
  searchParams: Promise<{ 'aids-tab'?: TYPE_GROUP_AIDS }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { manager } = await params;
  const managerId = Number(manager);
  const { 'aids-tab': tabParam } = await searchParams;
  const tab = tabParam || TYPE_GROUP_AIDS.ONGOING_AIDS;

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const aidsResponse = await getAids({
      page: 1,
      limit: 1,
      type: null,
      date_range: [null, null],
      recipients_range: [null, null],
      type_group_aids: tab,
      actor_Id: managerId,
      role: USER_RANK.MANAGER,
    });

    const totalAids = aidsResponse?.pagination?.total_items || 0;
    const title = `مساعدات المدير (${totalAids}) | AL-AQSA Camp` || FALLBACK.TITLE;
    const description =
      `عدد المساعدات التي يشرف عليها المدير: ${totalAids}. تصفح جميع المساعدات في منصة مخيم الأقصى.` ||
      FALLBACK.DESCRIPTION;

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'website',
        url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId }).AIDS_MANAGEMENT,
        images: [
          { url: FAVICON.src, width: 600, height: 600, alt: 'Displaced Received Aid' },
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
  } catch {}
  return {
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    metadataBase: new URL(APP_URL),
    openGraph: {
      siteName: 'AL-AQSA Camp',
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      type: 'website',
      url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId }).AIDS_MANAGEMENT,
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

export default async function Manager_Aids_Management({ params }: Props) {
  const { manager } = await params;
  const managerId = Number(manager);

  return <Common_Aids_Management_Page manager_Id={managerId} />;
}
