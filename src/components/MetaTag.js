import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTag = () => {
  return (
    <Helmet>
      <meta property="og:title" content="Contap" />
      <meta
        property="og:description"
        content="Just Tap! Contap에서는 함께 성장할 수 있어요"
      />
      <meta property="og:image" content="%PUBLIC_URL%/logo.png" />
    </Helmet>
  );
};

export default MetaTag;
