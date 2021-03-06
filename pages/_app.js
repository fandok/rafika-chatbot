import React from 'react';
import { elementType, object } from 'prop-types';
import globalStyles from '../styles/global';
import { useRouter } from 'next/router';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <CookiesProvider>
      <style jsx global>
        {globalStyles}
      </style>
      <Component {...pageProps} message={router.query?.message} />
    </CookiesProvider>
  );
}

MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: object.isRequired,
};

export default MyApp;
