/* eslint-disable */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import TapForm from './TapForm';

import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CardBack from './CardBack';
import { ColorStyle, Opacity } from '../utils/systemDesign';

SwiperCore.use([Pagination, Navigation]);

const Carousel = ({ userId, userName, profile, category }) => {
  const currentCard = useSelector((state) => state.cards.current);
  const [tapFormState, setTapFormState] = React.useState(false);
  const contapCheck = useSelector((state) => state.taps.allIds);
  console.log('카테고리', category);
  const setting = {
    slidesPerView: 1,
    spaceBetween: 16,
  };

  const SwRef = React.useRef('');
  console.log(SwRef);

  const handleTapForm = () => {
    setTapFormState(!tapFormState);
  };
  return (
    // <Wrap>
    //   <Slider {...settings}>
    //     {currentCard?.map((card) => {
    //       return <CardBack key={card.cardId} card={card} userId={userId} />;
    //     })}
    //   </Slider>
    // </Wrap>
    <SwiperWrap category={category}>
      <Swiper
        {...setting}
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        className="mySwiper"
      >
        {currentCard?.map((card) => {
          return (
            <SwiperSlide key={card.cardId}>
              <CardBack
                card={card}
                userId={userId}
                userName={userName}
                profile={profile}
                onTapForm={handleTapForm}
              ></CardBack>
              {tapFormState && <TapForm card={userId} category={category} />}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SwiperWrap>
  );
};

Carousel.propTypes = {
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  category: PropTypes.bool.isRequired,
};

const SwiperWrap = styled.div`
  width: 900px;
  margin: 7% auto;

  .mySwiper {
    .swiper-button-next::after {
      color: ${ColorStyle.Gray500};
      font-size: 20px;
      min-width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 30px;
      text-align: center;
      background-color: ${ColorStyle.Gray500 + Opacity[15]};
    }
    .swiper-button-prev::after {
      color: ${ColorStyle.Gray500};
      font-size: 20px;
      min-width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 30px;
      text-align: center;
      background-color: ${ColorStyle.Gray500 + Opacity[15]};
    }
    .swiper-pagination {
      background-color: ${ColorStyle.Gray500 + Opacity[30]};
      width: 81%;
      position: relative;
      top: 32px;
      left: 84px;

      .swiper-pagination-progressbar-fill {
        background-color: ${({ category }) =>
          category ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};
      }
    }
  }
`;

export default Carousel;
