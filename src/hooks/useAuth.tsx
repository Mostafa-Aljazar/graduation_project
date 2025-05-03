'use client';
import { getSession } from '../utils/auth/getSession';
import { useEffect, useState } from 'react';
import { User } from '@/@types/auth/loginResponse.type';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isDelegate, setIsDelegate] = useState(false);
  const [isDisplaced, setIsDisplaced] = useState(false);
  const [isSecurity, setIsSecurity] = useState(false);
  const [isSecurityOfficer, setIsSecurityOfficer] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setIsAuthenticated(!!session.token);
      setIsManager(session.user.role === 'MANAGER');
      setIsDelegate(session.user.role === 'DELEGATE');
      setIsDisplaced(session.user.role === 'DISPLACED');
      setIsSecurity(session.user.role === 'SECURITY');
      setIsSecurityOfficer(session.user.role === 'SECURITY_OFFICER');
      setUser(session.user);
    }
  }, []);

  return {
    isAuthenticated,
    isManager,
    isDelegate,
    isDisplaced,
    isSecurity,
    isSecurityOfficer,
    user,
  };
}

{
  /* {navLinks.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={index} passHref>
              <Button
                variant='transparent'
                size='xs'
                w={'100%'}
                h={45}
                px={5}
                ta={'start'}
                className={cn(
                  // Using cn here
                  '!flex !justify-start !border-0 !border-gray-300 !border-b-1 !rounded-none !overflow-hidden',
                  {
                    '!bg-gradient-to-l !from-primary !to-white': isActive, // Gradient when active
                    '!bg-white': !isActive, // White when inactive
                  }
                )}
              >
                <ThemeIcon variant='transparent' className='!text-primary'>
                  <item.icon size={20} className='!text-dark' />
                </ThemeIcon>

                <Text fw={600} fz={18} c={'dark'} ps={10}>
                  {item.label}
                </Text>
              </Button>
            </Link>
          );
        })} */
}
