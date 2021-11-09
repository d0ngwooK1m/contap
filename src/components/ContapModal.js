import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';

const ContapModal = ({ show, onHide, userId, children }) => {
  console.log(userId);
  return (
    <div>
      <Modal open={show} onClose={onHide}>
        <Wrap>
          <Card>
            {children}
            <Text regular16>zz</Text>
            <Text regular16>zz</Text>
            <div>
              <Text regular16>기술스택</Text>
            </div>
            <div>
              <Text regular16>관심사</Text>
            </div>
          </Card>
        </Wrap>
      </Modal>
    </div>
  );
};

const Wrap = styled.div`
  width: 610px;
  display: block;
  float: right;
  background-color: red;
`;

const Card = styled.div`
  background-color: ${ColorStyle.BackGround100};
  width: 100%;
  height: 100vh;
  padding: 20px;
`;

ContapModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  children: PropTypes.any,
};

ContapModal.defaultProps = {
  children: false,
};

export default ContapModal;
