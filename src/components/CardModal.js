import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';

import { Grid } from '../elements';
import Carousel from './Carousel';

const CardModal = ({ show, onHide }) => {
  return (
    <Grid>
      <Modal open={show} onClose={onHide}>
        <>
          <Carousel />
        </>
      </Modal>
    </Grid>
  );
};

CardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default CardModal;
