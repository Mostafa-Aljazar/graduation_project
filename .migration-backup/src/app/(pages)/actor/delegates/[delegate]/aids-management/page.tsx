import Common_Aids_Management_Page from '@/components/actors/general/aids-management/main/content/common-aids-management-page';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { USER_RANK } from '@/constants/userTypes';
import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';
import { getAids } from '@/actions/actors/general/aids-management/getAids';
import { TYPE_GROUP_AIDS } from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';

const FALLBACK = {
  TITLE: 'إدارة مساعدات المندوب | AL-AQSA Camp',
  DESCRIPTION: 'عرض جميع المساعدات التي يشرف عليها المندوب في منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ delegate: string }>;
  searchParams: Promise<{ 'aids-tab'?: TYPE_GROUP_AIDS }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { delegate } = await params;
  const delegateId = Number(delegate);
  const tab = (await searchParams)['aids-tab'] || TYPE_GROUP_AIDS.ONGOING_AIDS;
  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const response = await getAids({
      page: 1,
      limit: 1,
      type: null,
      date_range: [null, null],
      recipients_range: [null, null],
      type_group_aids: tab,
      actor_Id: delegateId,
      role: USER_RANK.DELEGATE,
    });

    const totalAids = response?.pagination?.total_items || 0;
    const title = `مساعدات المندوب (${totalAids}) | AL-AQSA Camp`;
    const description = `عدد المساعدات التي يشرف عليها المندوب: ${totalAids}. تصفح جميع المساعدات في منصة مخيم الأقصى.`;

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'website',
        url: APP_URL + DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId }).AIDS_MANAGEMENT,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Delegate Aids Management' },
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
        url: APP_URL + DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId }).AIDS_MANAGEMENT,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Delegate Aids Management' },
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

export default async function DelegateAidsManagement({ params }: Props) {
  const { delegate } = await params;
  const delegateId = Number(delegate);

  return <Common_Aids_Management_Page delegate_Id={delegateId} />;
}
