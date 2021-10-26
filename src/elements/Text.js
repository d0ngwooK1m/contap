/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { bold, color, size, children, subject } = props;

  const styles = { bold, color, size, subject };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  subject: false,
  color: '#222831',
  size: '14px',
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  ${(props) => (props.subject ? 'margin : 0px 0px 0px auto;' : '')};
`;

export default Text;
