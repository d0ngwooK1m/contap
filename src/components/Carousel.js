/* eslint-disable */
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import CardBack from './CardBack';

const Carousel = () => {
  const currentCard = useSelector((state) => state.cards.current);
  console.log(currentCard);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrap>
      <Slider {...settings}>
        {currentCard.map((card) => {
          return <CardBack key={card.cardId} card={card} />;
        })}
      </Slider>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 1000px;
  position: relative;
  top: 25vh;
  left: 0px;
  margin: auto;
`;

export default Carousel;
