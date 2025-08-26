import Security_Profile_Form from '@/components/actors/security/profile/security-profile-form';

export default async function Security_Profile({
  params,
}: {
  params: Promise<{ security_id: string }>;
}) {
  const { security_id } = await params;

  return <Security_Profile_Form security_Id={Number(security_id)} />;
}
