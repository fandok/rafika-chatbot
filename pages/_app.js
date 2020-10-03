import React from 'react';
import { elementType, object } from 'prop-types';
import globalStyles from '../styles/global';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {globalStyles}
      </style>
      <Component {...pageProps} />
    </>
  );
}

MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: object.isRequired,
};

export default MyApp;
