// app/(your-path)/edit/[aid_id]/page.tsx (or similar route file)

import Aid_Page from '@/components/actors/manager/aids-management/aid/Aid';

export default function Page({
  params,
}: {
  params: { aid_id: string | number };
}) {
  return <Aid_Page aid_id={params.aid_id} />;
}
