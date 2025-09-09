import Security_Data_List from '@/components/actors/general/securities/content/security-data-list';
import { Stack } from '@mantine/core';
import type { Metadata } from 'next';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { MAN } from '@/assets/actor';
import { getSecuritiesIds } from '@/actions/actors/general/security-data/getSecurities-Ids';

const FALLBACK = {
  TITLE: 'بيانات الأمن | AL-AQSA Camp',
  DESCRIPTION: 'عرض جميع بيانات أفراد الأمن المسجلين في منصة مخيم الأقصى مع مهامهم ومعلوماتهم.',
  IMAGE: MAN.src,
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getSecuritiesIds();
    const totalSecurities = response?.security_Ids.length || 0;

    const title = `بيانات الأمن (${totalSecurities}) | AL-AQSA Camp`;
    const description = `عدد أفراد الأمن المسجلين: ${totalSecurities}. تصفح بيانات الأمن ومهامهم في منصة مخيم الأقصى.`;

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'website',
        url: APP_URL + GENERAL_ACTOR_ROUTES.SECURITIES,
        images: [
          {
            url: FALLBACK.IMAGE,
            width: 600,
            height: 600,
            alt: 'Security Data',
          },
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
        url: APP_URL + GENERAL_ACTOR_ROUTES.SECURITIES,
        images: [
          {
            url: FALLBACK.IMAGE,
            width: 600,
            height: 600,
            alt: 'Security Data',
          },
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

export default function SecurityData() {
  return (
    <Stack p={10} pos='relative' w='100%'>
      <Security_Data_List />
    </Stack>
  );
}
