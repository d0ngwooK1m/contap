import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Text = ({
  regular14,
  regular16,
  regular20,
  bold20,
  bold24,
  bold32,
  children,
}) => {
  console.log(regular14);
  console.log(regular16);
  console.log(regular20);
  console.log(bold20);
  console.log(bold24);
  console.log(bold32);
  return <P>{children}</P>;
};

Text.propTypes = {
  children: PropTypes.string.isRequired,
  regular14: PropTypes.bool,
  regular16: PropTypes.bool,
  regular20: PropTypes.bool,
  bold20: PropTypes.bool,
  bold24: PropTypes.bool,
  bold32: PropTypes.bool,
};

Text.defaultProps = {
  regular14: false,
  regular16: false,
  regular20: false,
  bold20: false,
  bold24: false,
  bold32: false,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  ${(props) => (props.subject ? 'margin : 0px 0px 0px auto;' : '')};
`;

export default Text;
