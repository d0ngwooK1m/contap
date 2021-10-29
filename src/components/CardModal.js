import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useSelector, useDispatch } from 'react-redux';

import { onPopup } from '../features/cards/actions';
import { Grid } from '../elements';

const CardModal = () => {
  const dispatch = useDispatch();
  const back = useSelector((state) => state.cards.current);
  console.log('제목 값 확인====>', back);

  const handlePopup = useSelector((state) => state.cards.isPopup);

  const close = () => {
    dispatch(onPopup(false));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '960px',
    height: '510px',
    borderRadius: '16px',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid>
      <Modal
        open={handlePopup}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {back.map(() => {
            return (
              <Grid>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {back.title}
                </Typography>
                <Typography id="unstyled-modal-description">
                  {back.content}
                </Typography>
                <Typography id="unstyled-modal-description">
                  {back.hashTagsString}
                </Typography>
                <Typography id="unstyled-modal-description">
                  {back.hashTagsString}
                </Typography>
              </Grid>
            );
          })}
        </Box>
      </Modal>
    </Grid>
  );
};

export default CardModal;
