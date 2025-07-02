import { DisplacedPerson } from '@/components/actors/displaced/profile/displaced-profile';

export default async function Displaced_Profile({
  params,
}: {
  params: Promise<{ displaced_Id: string }>;
}) {
  const { displaced_Id } = await params;

  return <DisplacedPerson displaced_Id={Number(displaced_Id)} />;
}
