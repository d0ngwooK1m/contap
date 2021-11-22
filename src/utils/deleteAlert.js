import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../style/scss/alert.css';
import { ReactComponent as Close } from '../svgs/CloseRound.svg';
import { ColorStyle } from './systemDesign';
import { Text } from '../elements';

const MySwal = withReactContent(Swal);

const DeleteAlert = MySwal.mixin({
  showCancelButton: true,
  confirmButtonText: (
    <Text bold24 color={ColorStyle.BackGround300}>
      삭제
    </Text>
  ),
  cancelButtonText: (
    <Text bold24 color={ColorStyle.PrimaryPurple}>
      아니요
    </Text>
  ),
  showCloseButton: true,
  closeButtonHtml: <Close stroke={ColorStyle.BackGround300} />,
  confirmButtonColor: '#FFF',
  cancelButtonColor: '#FFF',
  padding: '52px',
  customClass: {
    popup: 'swal-popup',
    title: 'swal-title',
    cancelButton: 'swal-cancel',
    confirmButton: 'swal-confirm',
  },
});

export default DeleteAlert;
