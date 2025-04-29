import { ReactNode } from 'react';
import Mantine_Provider from './mantine-provider';
import React_Query_Provider from './react-query-provider';
import Nuqs_Adapter from './Nuqs_Adapter';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Nuqs_Adapter>
      <React_Query_Provider>
        <Mantine_Provider>
          <>{children}</>
        </Mantine_Provider>
      </React_Query_Provider>
    </Nuqs_Adapter>
  );
}
