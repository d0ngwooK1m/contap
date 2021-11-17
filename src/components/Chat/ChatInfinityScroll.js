/* eslint-disable */
import React, { useCallback, useEffect } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';

const ChatInfinityScroll = ({
  children,
  callNext,
  isNext,
  loading,
  scrollTo,
  prevHeight,
  setPrevHeight,
}) => {
  const handleScroll = lodash.throttle(() => {
    // 로딩중이면 callNext()를 안부르도록
    if (loading) {
      return;
    }

    if (scrollTo.current.scrollTop === 0) {
      setPrevHeight(scrollTo.current.scrollHeight);
      console.log(scrollTo.current.scrollHeight);
      callNext();
    }
  }, 500);

  const handleInfinityScroll = useCallback(handleScroll, [
    loading,
    handleScroll,
  ]);

  React.useEffect(() => {
    // 자료를 받아오는 loading 중에는 이벤트 발생하지 않도록
    // 꼭 잘 막아주기!
    // if (loading) {
    //   return;
    // }

    if (isNext) {
      scrollTo.current.addEventListener('scroll', handleInfinityScroll);
    } else {
      scrollTo.current?.removeEventListener('scroll', handleInfinityScroll);
    }
    return () => {
      scrollTo.current?.removeEventListener('scroll', handleInfinityScroll);
    };
  }, [isNext, loading, handleInfinityScroll, scrollTo]);

  return <>{children}</>;
};

ChatInfinityScroll.propTypes = {
  children: PropTypes.any,
  callNext: PropTypes.func,
  isNext: PropTypes.bool,
  loading: PropTypes.bool,
  scrollTo: PropTypes.any.isRequired,
  setPrevHeight: PropTypes.func.isRequired,
};

ChatInfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false,
};

export default ChatInfinityScroll;
