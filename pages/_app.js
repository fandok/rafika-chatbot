import React from 'react';
import { elementType, object } from 'prop-types';
import globalStyles from '../styles/global';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <style jsx global>
        {globalStyles}
      </style>
      <Component {...pageProps} message={router.query?.message} />
    </>
  );
}

MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: object.isRequired,
};

export default MyApp;
