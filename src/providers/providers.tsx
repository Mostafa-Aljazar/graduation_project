import { ReactNode } from 'react';
import Mantine_Provider from './mantine-provider';
import React_Query_Provider from './react-query-provider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <React_Query_Provider>
      <Mantine_Provider>
        <>{children}</>
      </Mantine_Provider>
    </React_Query_Provider>
  );
}
