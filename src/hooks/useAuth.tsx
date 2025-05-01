'use client';
import { getSession } from '../utils/auth/getSession';
import { useEffect, useState } from 'react';
import { User } from '@/@types/auth/loginResponse.type';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isDelegate, setIsDelegate] = useState(false);
  const [isDisplaced, setIsDisplaced] = useState(false);
  const [isSecretary, setIsSecretary] = useState(false);
  const [isSecurityOfficer, setIsSecurityOfficer] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setIsAuthenticated(!!session.token);
      setIsManager(session.user.role === 'MANAGER');
      setIsDelegate(session.user.role === 'DELEGATE');
      setIsDisplaced(session.user.role === 'DISPLACED');
      setIsSecretary(session.user.role === 'SECRETARY');
      setIsSecurityOfficer(session.user.role === 'SECURITY_OFFICER');
      setUser(session.user);
    }
  }, []);

  return {
    isAuthenticated,
    isManager,
    isDelegate,
    isDisplaced,
    isSecretary,
    isSecurityOfficer,
    user,
  };
}
