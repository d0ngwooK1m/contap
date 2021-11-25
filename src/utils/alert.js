import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../style/scss/alert.css';
import { ReactComponent as Close } from '../svgs/CloseRound.svg';
import { ColorStyle } from './systemDesign';
import { Text } from '../elements';

const MySwal = withReactContent(Swal);

export const BasicAlert = MySwal.mixin({
  showCancelButton: true,
  confirmButtonText: (
    <Text bold24 color={ColorStyle.Gray500}>
      끊기
    </Text>
  ),
  cancelButtonText: (
    <Text bold24 color={ColorStyle.PrimaryPurple}>
      아니요
    </Text>
  ),

  showCloseButton: true,
  closeButtonHtml: <Close stroke={ColorStyle.BackGround300} />,
  confirmButtonColor: '#1d1d22',
  cancelButtonColor: '#1d1d22',
  background: '#1d1d22',
  position: 'relative',
  padding: '52px',
  customClass: {
    popup: 'swal-popup',
    title: 'swal-title',
    cancelButton: 'swal-cancel',
    confirmButton: 'swal-confirm',
  },
});

export const BasicAlert2 = MySwal.mixin({
  showCancelButton: true,
  confirmButtonText: (
    <Text bold24 color={ColorStyle.Gray500}>
      예
    </Text>
  ),
  cancelButtonText: (
    <Text bold24 color={ColorStyle.PrimaryPurple}>
      아니요
    </Text>
  ),

  showCloseButton: true,
  closeButtonHtml: <Close stroke={ColorStyle.BackGround300} />,
  confirmButtonColor: '#1d1d22',
  cancelButtonColor: '#1d1d22',
  background: '#1d1d22',
  position: 'relative',
  padding: '52px',
  customClass: {
    popup: 'swal-popup',
    title: 'swal-title',
    cancelButton: 'swal-cancel',
    confirmButton: 'swal-confirm',
  },
});

export const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  background: '#1d1d22',
  // timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  customClass: {
    popup: 'swal-toast-popup',
    title: 'swal-toast-title',
  },
});
