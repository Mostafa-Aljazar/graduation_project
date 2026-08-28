import { Link as WouterLink, useLocation } from 'wouter';
import { type ReactNode } from 'react';

export const Image = ({
  src,
  alt,
  className,
  fill,
  width,
  height,
  objectFit,
  priority: _priority,
  ...props
}: any) => {
  const imgSrc = typeof src === 'string' ? src : src?.src;
  return (
    <img 
      src={imgSrc} 
      alt={alt || ''} 
      className={className} 
      width={width}
      height={height}
      style={
        fill
          ? { width: '100%', height: '100%', objectFit: objectFit || 'cover' }
          : objectFit
            ? { objectFit }
            : undefined
      }
      {...props} 
    />
  );
};

export const Link = ({ href, children, ...props }: any) => {
  return (
    <WouterLink href={href || ''} {...props}>
      {children}
    </WouterLink>
  );
};

export const useRouter = () => {
  const [location, setLocation] = useLocation();
  return { 
    push: (url: string) => setLocation(url), 
    replace: (url: string) => setLocation(url, { replace: true }), 
    pathname: location,
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => window.location.reload()
  };
};

export const usePathname = () => {
  const [location] = useLocation();
  return location;
};

export type StaticImageData = string;
