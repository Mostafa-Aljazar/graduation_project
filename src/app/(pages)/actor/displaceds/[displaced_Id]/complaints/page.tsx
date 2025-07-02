import Displaced_Complaints from '@/components/actors/displaced/complaints/displaced-complaints';

export default async function Complaints({
  params,
}: {
  params: Promise<{ displaced_Id: string }>;
}) {
  const { displaced_Id } = await params;

  return <Displaced_Complaints displaced_ID={Number(displaced_Id)} />;
}
