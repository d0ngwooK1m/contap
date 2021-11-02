import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import TapForm from './TapForm';

import { Grid } from '../elements';

const ContapModal = ({ show, onHide, userId, children }) => {
  console.log(userId);
  return (
    <Grid>
      <Modal open={show} onClose={onHide}>
        <Wrap>
          <Card>
            {children}
            <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>
              zz
            </Typography>
            <Typography>zz</Typography>
            <div>
              <Typography>기술스택</Typography>
            </div>
            <div>
              <Typography>관심사</Typography>
              <TapForm userId={userId} />
            </div>
          </Card>
        </Wrap>
      </Modal>
    </Grid>
  );
};

const Wrap = styled.div`
  width: 610px;
  display: block;
  float: right;
  background-color: red;
`;

const Card = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100vh;
  padding: 20px;
`;

ContapModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  children: PropTypes.element,
};

ContapModal.defaultProps = {
  children: false,
};

export default ContapModal;
