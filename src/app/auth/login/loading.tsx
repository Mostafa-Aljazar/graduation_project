import { Loader } from '@mantine/core';
import React from 'react';

type Props = {};

const PageLoader = (props: Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Loader />
    </div>
  );
};

export default PageLoader;
