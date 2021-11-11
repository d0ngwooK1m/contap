/* eslint-disable */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
// import { ColorStyle } from '../utils/systemDesign';
import styled from 'styled-components';

const ChatList = () => {
    const dispatch = useDispatch();

    const allGrabList = useSelector((state)=>state.taps)
    console.log(allGrabList)

    // React.useEffect(() => {
    //     console.log('디스패치');
    //     dispatch(loadGrabToAxios());
    //   }, []);
    
  return (
    <div>
      <div>채팅리스트</div>
    </div>
  );
};

export default ChatList;