import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import { Grid } from '../elements';
import Carousel from './Carousel';

const CardModal = ({ show, onHide, userId, userName, profile, category }) => {
  return (
    <Grid>
      <Modal open={show} onClose={onHide}>
        <>
          <Carousel
            userId={userId}
            userName={userName}
            profile={profile}
            category={category}
          />
        </>
      </Modal>
    </Grid>
  );
};

CardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  profile: PropTypes.string,
  category: PropTypes.bool.isRequired,
};

CardModal.defaultProps = {
  profile: null,
};

export default CardModal;
