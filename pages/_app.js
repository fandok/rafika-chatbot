import React from "react";
import {elementType, object} from "prop-types";

function MyApp ({Component, pageProps}) {
	return <Component {...pageProps} />;
}

MyApp.propTypes = {
	"Component": elementType.isRequired,
	"pageProps": object.isRequired
};

export default MyApp;
