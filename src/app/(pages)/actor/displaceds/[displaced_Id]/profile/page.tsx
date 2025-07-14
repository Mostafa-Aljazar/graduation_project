import Displaced_Person from '@/components/actors/displaced/profile/displaced-profile';

export default async function Displaced_Profile({
  params,
}: {
  params: Promise<{ displaced_Id: string }>;
}) {
  const { displaced_Id } = await params;

  return <Displaced_Person displaced_Id={Number(displaced_Id)} />;
}
