/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GrapTalkAddProfile from './GrapTalkAddProfile';
import { IconButton } from '@mui/material';
import { Text } from '../elements';
import { ReactComponent as Close } from '../svgs/CloseRound.svg';

import {
  closeNoneTalkRoomList
} from '../features/chat/actions';
const GrabTalkAdd = ({ noneTalkList }) => {
  const dispatch = useDispatch()
  console.log(noneTalkList)
  return (
    <div>
       <Header className="header">
              <Text bold32>여긴 검색창이 들어갈 거에요</Text>
              <IconButton
                onClick={() => {
                  dispatch(closeNoneTalkRoomList());
                }}
              >
                <Close />
              </IconButton>
            </Header>
      {noneTalkList.map((id) => {
        return <GrapTalkAddProfile key={id} userId={ id}/>
      })}
    </div>
  );
};

const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 700px;
  min-height: 80px;
  max-height: 80px;
  z-index: 1;

  button {
    position: absolute;
    right: 0px;
  }
`;

export default GrabTalkAdd;
