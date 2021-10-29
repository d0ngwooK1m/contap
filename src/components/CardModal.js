import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TapForm from './TapForm';
import { Grid } from '../elements';

const CardModal = ({ show, onHide, card }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '960px',
    height: '510px',
    borderRadius: '16px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 0,
  };

  return (
    <Grid>
      <Modal
        open={show}
        onClose={onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {card[0]?.title}
            </Typography>
            <Typography id="unstyled-modal-description">
              {card[0]?.content}
            </Typography>
          </Grid>
          <TapForm />
        </Box>
      </Modal>
    </Grid>
  );
};

CardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  card: PropTypes.array.isRequired,
};

export default CardModal;
