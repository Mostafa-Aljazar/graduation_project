'use client';
import { NAVBAR_LINKS } from '@/content/common/header';
import { LANDING_ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Header_Links() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const updateHash = () => {
      const newHash = window.location.hash;
      setCurrentHash(newHash);
    };

    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  useEffect(() => {
    if (pathname !== LANDING_ROUTES.HOME || !window.location.hash) {
      setCurrentHash('');
    }
  }, [pathname]);

  const isLinkActive = (link: string) => {
    const isAnchorLink = link.startsWith('/#');
    const linkHash = isAnchorLink ? link.slice(1) : '';

    if (isAnchorLink) {
      return pathname === LANDING_ROUTES.HOME && currentHash === linkHash;
    }

    // Check for exact match or if pathname starts with the link (for blog routes)
    return (
      pathname === link ||
      (link === '/blog' && pathname.startsWith('/blog') && !currentHash)
    );
  };

  const handleLinkClick = (link: string) => {
    if (link.startsWith('/#')) {
      const hash = link.slice(1);
      setCurrentHash(hash);
    } else {
      setCurrentHash('');
    }
  };

  return (
    <>
      {NAVBAR_LINKS.map((item, index) => (
        <Link
          href={item?.link || ''}
          key={index}
          onClick={() => handleLinkClick(item?.link || '')}
        >
          <Text
            fz={18}
            className={cn(
              '!text-primary font-medium',
              isLinkActive(item?.link || '') && '!font-bold'
            )}
          >
            {item?.label || ''}
          </Text>
        </Link>
      ))}
    </>
  );
}
