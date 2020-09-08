import React from 'react';
import '../styles/globals.css';
import { node, object } from 'prop-types';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: node.isRequired,
  pageProps: object.isRequired
};

export default MyApp;
