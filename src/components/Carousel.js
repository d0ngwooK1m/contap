/* eslint-disable */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, { Pagination, Navigation, Keyboard } from 'swiper';
import TapForm from './TapForm';

import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CardBack from './CardBack';
import { ColorStyle, Opacity, professionColor } from '../utils/systemDesign';

SwiperCore.use([Pagination, Navigation, Keyboard]);

const Carousel = ({ userId, userName, profile, category }) => {
  const currentCard = useSelector((state) => state.cards.current);
  const [tapFormState, setTapFormState] = React.useState(false);
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

  const color = professionColor(category)

  return (
    <SwiperWrap color={color}>
      <Swiper
        {...setting}
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        className="mySwiper"
        allowTouchMove={false}
        keyboard={true}
      >
        {currentCard?.map((card) => {
          return (
            <SwiperSlide key={card.cardId}>
              <CardBack
                card={card}
                userId={userId}
                userName={userName}
                profile={profile}
                show={tapFormState}
                onTapForm={handleTapForm}
              ></CardBack>
              {tapFormState && (
                <TapForm userId={card.userId} category={category} />
              )}
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
  category: PropTypes.string.isRequired,
  profile: PropTypes.string,
};

Carousel.defaultProps = {
  profile: null,
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
        background-color: ${({ color }) => color};
      }
    }
  }
`;

export default Carousel;
