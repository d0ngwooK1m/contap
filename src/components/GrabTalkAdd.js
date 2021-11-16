/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GrapTalkAddProfile from './GrapTalkAddProfile';


const GrabTalkAdd = ({ noneTalkList }) => {
  const dispatch = useDispatch()
  console.log(noneTalkList)
  return (
    <div>
      {noneTalkList.map((id) => {
        return <GrapTalkAddProfile key={id} userId={ id}/>
      })}
    </div>
  );
};

export default GrabTalkAdd;
