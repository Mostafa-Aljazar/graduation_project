// src/fonts/index.ts
import localFont from 'next/font/local';

// Define SF Pro Display font with all variants
const sfProDisplay = localFont({
  src: [
    {
      path: './SF-Pro-Display-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './SF-Pro-Display-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro-display' as const,
});

export default sfProDisplay;
