import Displaced_Profile_Form from '@/components/actors/displaced/profile/displaced-profile-form';

export default async function Displaced_Profile({
  params,
}: {
  params: Promise<{ displaced_Id: string }>;
}) {
  const { displaced_Id } = await params;

  return <Displaced_Profile_Form displaced_Id={Number(displaced_Id)} />;
}
