import { Security_Person } from '@/components/actors/security/profile/security-profile';

export default async function Security_Profile({
  params,
}: {
  params: Promise<{ security_Id: string }>;
}) {
  const { security_Id } = await params;

  return <Security_Person security_Id={Number(security_Id)} />;
}
