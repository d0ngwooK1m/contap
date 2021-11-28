import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MetaTag = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta property="og:title" content="Contap" data-react-helmet="true" />
        <meta
          property="og:description"
          content="Just Tap! Contap에서는 함께 성장할 수 있어요"
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content="%PUBLIC_URL%/logo.png"
          data-react-helmet="true"
        />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaTag;
