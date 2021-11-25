import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../style/scss/loginAlert.css';
import { ColorStyle } from './systemDesign';
import { Text } from '../elements';

const MySwal = withReactContent(Swal);

const LoginAlert = MySwal.mixin({
  showCancelButton: true,
  confirmButtonText: (
    <Text bold20 color={ColorStyle.Gray500}>
      로그인
    </Text>
  ),
  cancelButtonText: (
    <Text bold20 color={ColorStyle.Gray500}>
      회원가입
    </Text>
  ),
  reverseButtons: true,
  stopKeydownPropagation: true,
  confirmButtonColor: '#8C4DFF',
  cancelButtonColor: '#1d1d22',
  background: '#1d1d22',
  position: 'relative',
  padding: '40px',
  customClass: {
    popup: 'swal-popup',
    title: 'swal-title',
    cancelButton: 'login-cancel',
    confirmButton: 'login-confirm',
  },
});

export default LoginAlert;
