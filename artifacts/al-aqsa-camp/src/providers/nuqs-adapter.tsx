import { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/react';

export default function Nuqs_Adapter({ children }: { children: ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
