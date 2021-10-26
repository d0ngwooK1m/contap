/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const { shape, src, size, _onClick } = props;

  const styles = {
    src,
    size,
  };

  if (shape === 'circle') {
    return <ImageCircle {...styles} />;
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles} />
      </AspectOutter>
    );
  }

  if (shape === 'logo') {
    return <ImageLogo {...styles} onClick={_onClick} />;
  }

  if (shape === 'square') {
    return <ImageNotice {...styles} />;
  }

  return <></>;
};

Image.defaultProps = {
  shape: 'circle',
  src: 'https://media.vlpt.us/images/wswj9608/profile/4d70b800-84e2-4ced-ad7d-f71413a6f5a7/KakaoTalk_20210918_153459873.jpg?w=240',
  size: 40,
  _onClick: () => {},
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const NoticeOutter = styled.div`
  width: 40%;
  min-width: 20px;
`;

const NoticeInner = styled.div`
  position: relative;
  padding: 40%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url('${(props) => props.src}');
  background-size: cover;
  margin: 4px;
`;

const ImageLogo = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);

  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
  margin: 8px auto 8px 16px;
`;

const ImageNotice = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);

  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
  margin: 8px auto 8px 16px;
`;

export default Image;
