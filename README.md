# Contap FrontEnd

- [Contap Link](https://contap.co.kr)
- [FrontEnd Github](https://github.com/d0ngwooK1m/contap)
- [Contap Notion](https://frequent-packet-5ba.notion.site/ConTap-dda2c10905b7488fa31e7b0e5f3ee8e6)
- [YouTube](https://youtube.com)

## FrontEnd(Language,Library,Framework)

- **Javascript**
- **React**
- **Redux (redux-actions, immer)**
  - 데이터 전역 관리를 위한 리덕스 관리
- **connected-react-router, history**
  - 라우팅 및 페이지 이동을 위한 패키지
- **axios**
  - 서버 통신을 위한 패키지
- **swiper**
  - 슬라이더 구현 패키지
- **sockjs-client, stompjs**
  - 실시간 웹 소켓 통신을 위한 패키지
- **styled-components**
  - 컴포넌트 스타일 설정 패키지

## Project Introduce

디자이너와 개발자를 위한 커뮤니티 플랫폼 'Contap'

프로젝트로 나를 소개하고<br>
함께 일하고 싶은 디자이너와 개발자를 만날 수 있는 곳!

프로젝트를 한곳에 모아 아카이빙 할 수 있어요.

<img src = "https://media.vlpt.us/images/junseokoo/post/69d1eaed-69bb-43d9-a3e9-ba9d7cb85ae7/KakaoTalk_20211202_234232569.png">

## Project Intention

백엔드와 프론트엔드의 프로젝트나 협업은 생각보다 쉽지 않습니다. 디자이너와의 협업은 더더욱 쉽지 않구요.

그러기 힘든 이유로는 이제 막 개발을 배우기 시작한 주니어 개발자, 디자이너들은 아직 협업 경험도 별로 없기도 하고 서로의 정보들이 한 곳에 모여있지 않아서, 그 정보를 보고 이야기를 할 수 있는 공간 또한 많지 않기 때문 이라고 생각했습니다.

그래서 저희는 이 문제를 해결하고자 개발자와 디자이너가 서로의 프로젝트를 공유하고 더 나아가서는 프로젝트를 진행 할 사람을 만날 수 있는 사이트인 Contap을 만들게 되었습니다.

## Target

- Developer (FrontEnd/BackEnd)
- Designer

## Team Introduce

- FrontEnd `React` : 김동우,이아영,한우석
- BackEnd `Spring Boot` : 이승준,오준석,김혜림
- Designer `UX/UI` : 김민지

## Service Introduce

- 일반회원가입은 이메일 인증을 통해 가입할 수 있으며, 그 외에 카카오톡,깃허브로 로그인할 수 있습니다.
- 메인페이지에서 작성된 카드들을 확인할 수 있습니다.
- 마이페이지에서 카드의 앞면에 수정버튼을 누를 시 나오는 해쉬태그 목록에서 사용하는 기술 및 관심있는 항목을 선택할 수 있습니다.
- 카드의 뒷면에는 내가 진행했던 프로젝트를 설명하는 내용을 작성할 수 있습니다.
- 메인페이지에서 카드들을 확인한 뒤 마음에 드는 사람에게 간단한 쪽지내용과 함께 Tap요청을 보낼 수 있습니다.
- Tap요청을 받은 사람은 보낸 사람의 카드내용을 확인한 뒤에 수락 및 거절을 할 수 있습니다.
- Tap요청을 수락하면 나의 Grab항목에 추가되며 Grab된 사람과 실시간으로 1:1채팅을 할 수 있습니다.
- 채팅이 종료되거나 채팅시 불쾌한 내용이 오갈 시 그랩을 끊을 수 있습니다.

<img src = "https://media.vlpt.us/images/junseokoo/post/6fc90ee8-a5fb-45d7-a501-32c7ac734cef/KakaoTalk_20211202_230337351.png">

## ERD(Entity-Relationship Diagram)

<details>
<summary>ERD Image</summary>
<div markdown="1">
<img src = "https://media.vlpt.us/images/junseokoo/post/a9047c28-2396-4b39-adc7-190f749e1de7/%EC%BA%A1%EC%B2%98.PNG">
</div>
</details>

## Trouble Shooting

<details>
<summary>뷰데이터 관리 (이아영)</summary>
<div markdown="1">
- 문제 발생 : 프로젝트 추가하기를 클릭하고 작성완료를 누르면 추가하기 창이 새로고침을 해야 사라짐<br><br>
- 문제 발생 이유 : 클릭해서 추가하기 창이 나오고 작성 완료하면 없어지는 부분이 각각 다른 컴포넌트에 연결이 되있어서 처음에는 스테이트로 관리를 해서 부모 컴포넌트에 있는 데이터를 자식 컴포넌트에서 변경시키려고 했는데 계속 오류가 발생하고 데이터 전달이 잘 이루어지지 않았다.<br><br>
- 문제 해결  : 자식이 부모의 데이터를 관리하는 방법을 피하기 위해 뷰 데이터를 리덕스로 관리하게 해서 1차 해결이 됐었는데, 뷰데이터를 리덕스에 저장하는 부분 재고해야 한다는 피드백을 받았다. 리덕스에서는 최대한 비즈니스 로직에 관련한 엔티티들, 데이터들, 모델들을 저장해서 활용하면 좋을 것 같다고 하셔서 자식이 부모데이터를 바꾸도록 접근하는 것이 아닌 자식이 부모의 데이터를 바꿔라라는 이벤트를 나타낼 수 있도록 다시 접근을 했다.<br>

```jsx
//부모 컴포넌트
const CardAdd = () => {
  const [click, setClick] = React.useState(false);

  const closeClick = () => {
    setClick(false);
  };

  return (
    <Grid width="100%" height="100%" padding="0px 0px 7% 0px;">
      <TextDiv>
        <TitleText>
          나의 카드 <Count>{cardCount.length}</Count>
        </TitleText>
        <TextBtn
          onClick={() => {
            setClick(true);
          }}
        >
          + 카드 추가하기
        </TextBtn>
      </TextDiv>
      <Grid margin="0px 0px 48px 0px">
        // closeClick 함수를 onHide에 담아서 자식 컴포넌트에서 사용
        <CardBackWrite onHide={closeClick} />
      </Grid>
      {cardList.backCardIdx.map((cardId) => {
        return (
          <Grid key={cardId}>
            <CardPortfolio cardId={cardId} />
          </Grid>
        );
      })}
    </Grid>
  );
};
```

```jsx
//자식 컴포넌트
const CardBackWrite = ({ onHide }) => {
  const addCardBack = () => {
    //작성완료 버튼 누르면 작성화면 꺼지게 함. () 꼭 붙이기..!(함수 바로 실행한다는 의미)
    onHide();
    // dispatch(isSuccess(!handleClick));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <AddBtn onClick={addCardBack} disabled={disabled}>
        <Text
          bold20
          color={disabled ? ColorStyle.PrimaryPurple : ColorStyle.Gray300}
        >
          작성 완료
        </Text>
      </AddBtn>
      <div
        onClick={() => {
          // 작성 취소버튼을 누르면 작성화면 꺼지게 함
          onHide();
        }}
      >
        <CloseBtn cursor="pointer" />
      </div>
    </div>
  );
};
```

</div>
</details>

<details>
<summary>연관검색어, 무한스크롤 기능 작성 및 문제점 파악(김동우)</summary>
<div markdown="1">

### 연관 검색어

1. 스택 및 관심사 데이터를 한꺼번에 배열로 가져온다.
2. input에 글자를 검색할 때마다 배열에 있는 글자와 일치하는지 비교 후 같다면 연관 검색어 배열에 넣는다.
3. 연관 검색어 배열에 넣을 때 일치하는 문자의 순서를 비교하여 넣는다.
4. 완료된 배열은 리덕스에 저장한다(렌더링이 발생하기 때문에)
5. map을 이용하여 연관검색어 목록이 나오도록 한다.
6. 연관 검색어를 클릭했을 때 검색 API를 전송한다.

```jsx
// 0. 검색어 목록을 만든다
React.useEffect(async () => {
  try {
    const res = await axios.get(`${baseURL}/main/hashtag`);

    const { data } = res;

    const searchDataArr = [];
    data.forEach((val) => {
      searchDataArr.push(val.name);
    });
    dispatch(searchDataList(searchDataArr));
  } catch (error) {
    console.error(error);
  }
}, []);

//1. setState로 input에 들어가는 정보를 받아온다.
const [data, setData] = React.useState('');

//2. 연관검색어를 담는 searchArr과 이것을 렌더링 이후에도
// 가지고 있을 수 있게하는 searchList 설정
const searchArr = [];
const searchList = useSelector((state) => state.cards.searchArr);

//3. data가 바뀔 때마다 searchList가 갱신될 수 있도록 useEffect 사용
// data와 searchData를 filter로 비교 후 일치하는 value를 searchList로 채운다.

React.useEffect(() => {
  searchData.filter((val) => {
    if (data.toLocaleLowerCase() === '') {
      return null;
    }
    if (val.toLocaleLowerCase().indexOf(data.toLocaleLowerCase()) !== -1) {
      searchArr.push(val);
    }
    // console.log(val);
    console.log(searchArr);

    return searchArr;
  });
  if (searchArr !== []) {
    dispatch(searchArrList(searchArr));
  }
}, [data]);

//4. searchList를 해당 value로 검색할 수 있는 함수를 넣어 버튼으로 만든다.
const ArrayData = searchList.map((val) => {
  return (
    <ContentWrapper>
      <li>
        <ContentBtn
          type="button"
          onClick={async () => {
            setData(val);
            const searchInfo = {
              searchTags: [val],
              type: 0,
              page: 0,
              field: 3,
            };
            await dispatch(searchInfoDB(searchInfo));
            setTag(true);
            setClick(false);
          }}
        >
          <Text color="black" regular16>
            {val}
          </Text>
        </ContentBtn>
      </li>
    </ContentWrapper>
  );
});
```

### 무한스크롤

1. 검색 시 API에서, 현재 페이지를 함께 전송한다. 처음 보낼 때는 0페이지 이다.
2. scroll event로 스크롤 시 페이지가 마지막 페이지인지 확인한다.
3. 스크롤이 끝에 닿았다면, 현재 검색어에서 페이지가 1 증가한 API를 보낸다.
4. 다음 페이지에 해당하는 정보를 백엔드에서 전송한다.
5. 현재 카드들 아래에 붙혀준다.
6. 불려저오는 카드의 개수가 9개 이하라면 더 이상 무한 스크롤이 작동하지 않도록 한다.

현재 이 기능의 가장 큰 문제는 API와 컴포넌트가 얽혀있는 것이라고 생각한다.  
이렇게 얽힌 컴포넌트나 API는 다른 곳에 활용하기가 아주 힘들다는 것을 알 수 있었다.
앞으로는 기능 작성 시 각 기능을 분리해서 독립적으로 활용이 가능하게 해야겠다는 생각이 들었다.

</div>
</details>

<details>
<summary>실시간 알림 기능 구현 (한우석)</summary>
<div markdown="1">
로직

- 로그인 시 모든 유저를 공통된 room(PublicRoom)에 넣는다.
- 채팅을 하는 1:1 room에(ChatRoom) 입장해서 메시지 입력 시, 상대방이 ChatRoom에 들어와 있지 않고 PublicRoom에 들어와 있을 때 해당하는 유저를 찾은 후 알림 보낸다.
- 페이지 이동 시, 새로 고침 시에도 subscribe 상태를 유지해야 한다.+

해결 과정

- 과정 1
  - 로그인 시 root Page인 CardList 컴포넌트에 소켓에 연결되는 로직을 추가하고 첫 랜더링 시 한번만 실행되도록 하였다
- 결과
  - 모든 페이지에서 정상적으로 subscribe 상태 유지
- 문제점

  - CardList 컴포넌트에 useEffect 안에 들어가 있기 때문에 다른 페이지에서 새로고침을 하면 소켓 연결이 끊어짐 <br><br><br>

- 과정 2
  - Login 컴포넌트에서 로그인 버튼을 클릭 시 소켓에 연결 되는 로직 추가
- 결과
  - 모든 페이지에서 정상적으로 subscribe 상태 유지
- 문제점
  - Login 컴포넌트에 useEffect 안에 들어가 있기 때문에 다른 페이지에서 새로고침을 하면 소켓 연결이 끊어짐, 로직 작성 중간에 바로 다음 방법 시도<br><br><br>
- 과정 3
  - 어떤 페이지에서 사용자가 새로고침을 할 지 모르기 때문에 페이지를 이동 할 때마다 구독과 구독해제를 하는 로직 추가.
  - 전체적인 코드를 줄이기 위해서 소켓을 연결하는 로직을 커스텀훅으로 작성
- 결과
  - 모든 페이지에서 정상적으로 subscribe 상태 유지, 새로고침해도 끊어지지 않고 다시 연결
- 문제점
  - 기능은 정상적으로 동작하나 모든 페이지에서 소켓에 연결을 하는 로직을 추가해야 하기 때문에 코드가 쓸데없이 늘어난다는 느낌을 받음.<br><br><br>
- 과정 4
  - Header 는 사라지지 않기 때문에 Header 안에 소켓 연결하는 로직 추가
- 결과
  - 모든 페이지에서 정상적으로 subscribe 상태 유지, 새로고침해도 끊어지지 않고 다시 연결
- 문제점
  - 구독 해제가 되지 않고 원하는 대로 동작하지만 Header 안에 소켓을 넣는게 맞을까 라는 의문이 계속 들었다.
  - 기능적인 분리를 하지 못했다는 생각에 드는 찝찝함이라고 판단하여 다음 방법으로 넘어 갔다.<br><br><br>
- 과정 5

  - 소켓 연결을 위한 컴포넌트를 추가하여 다른 컴포넌트를 Children으로 받음

  ```java
  // WsNotiRoom.js
  import React from 'react';
  import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

  const WsNotiRoom = ({ children }) => {
    const [wsConnectSubscribe, token] = useSocketNotiRoom();

    React.useEffect(() => {
      if (!token) {
        return null;
      }
      wsConnectSubscribe();
      return null;
    }, []);
    return children;
  };

  export default WsNotiRoom;

  // App.js
  //WsNotiRoom 추가
  function App() {
    return (
      <WrapApp>
        <Wrap>
          <Reset />
          <PublicRoute restricted path="/login" component={Login} exact />
          <PublicRoute restricted path="/signup" component={Signup} exact />
          <>
            <WsNotiRoom>
              <Header />
              <Permit>
                <PublicRoute path="/" component={CardList} exact />
                <PrivatecRoute path="/settings" component={Settings} exact />
                <PrivatecRoute path="/contap" component={Contap} exact />
                <PrivatecRoute path="/mypage" component={Mypage} exact />
                <PrivatecRoute path="/edit" component={CardEdit} exact />
              </Permit>
            </WsNotiRoom>
          </>
        </Wrap>
      </WrapApp>
    );
  }
  ```

- 결과
  - 모든 페이지에서 정상적으로 subscribe 상태 유지, 새로고침해도 끊어지지 않고 다시 연결
  - 가장 깔끔하게 해결 되었다는 생각이 들어서 현재 이 방법을 선택 했습니다.
  ***
- 상세 과정

새로고침 시 로그인이 필요한 페이지 에서는 /auth 로 get요청을 보내서 user정보를 받아 오는데 받아오기 전에 소켓이 먼저 연결 되어서 userEmail이 들어오지 않음.

![](https://media.vlpt.us/images/wswj9608/post/eef54073-3f7a-408d-bfa5-ae7fd1efd9b6/%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%85%E1%85%A1%E1%86%B71.png)

**해결법**

그냥 단순하게 생각을 바꿔보니 wsConnectSubscribe 함수 안에서 /auth로 get요청을 하면 될 것 같아서 시도 해보니 정상적으로 동작 하였다.

```jsx
const wsConnectSubscribe = React.useCallback(async () => {
  if (!token) {
    return null;
  }
  try {
    //커넥트 하기 전 유저 데이터 받아옴
    const { data } = await T.GET('/auth');
    console.log(data);
    ws.connect({}, () => {
      ws.subscribe(
        `/user/sub/user`,
        (data) => {
          // const newMessage = JSON.parse(data.body);
          console.log('알람');
          if (!isNoti) {
            dispatch(setNoti(true));
          }
        },
        { token, userEmail: data.email },
      );
    });
  } catch (error) {
    console.log(error);
  }
}, []);
```

로그인 페이지에서 로그인 버튼을 누를 때 소켓에 연결이 된다는 생각으로 로직을 작성했다.

```jsx
// Login.js
const wsConnectSubscribe = (userEmail, token) => {
  console.log('토큰 있냐? ===> ', token);
  if (!token) {
    console.log('토큰 업쩡');
    return null;
  }

  try {
    ws.connect({}, () => {
      ws.subscribe(`/user/sub/user`, {}, { token, userEmail });
    });
  } catch (error) {
    console.log(error);
  }
};

// 로그인 버튼 클릭 시 실행
<form
  onSubmit={handleSubmit(async (loginInfo) => {
    console.log('로그인 인포 ===>', loginInfo);
    await dispatch(loginToServer(loginInfo));
    const token = getToken();
    console.log('커넥트 실행');
    wsConnectSubscribe(loginInfo.email, token);
    console.log('히스토리 푸시');
    // history.push('/');
  })}
>
  ...
</form>;
```

![](https://media.vlpt.us/images/wswj9608/post/232fc9f1-2432-48a1-9b91-1c54dd7dee6b/%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%85%E1%85%A1%E1%86%B72.png)

??????....

왜 소켓 연결이 안될까?

근데 로그인창에서 코드를 작성 하다가 든 생각인데 결국 유저가 메인페이지에서 새로고침을 하면 소켓에 재연결이 안될 것 같아 결국 메인페이지로 다시 돌아왔다..

어떤 페이지에서 사용자가 새로고침을 할 지 모르기 때문에 페이지를 이동 할 때마다 구독과 구독해제를 하도록 로직을 작성 했다.

```jsx
import StompJs from 'stompjs';
import SockJS from 'sockjs-client';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../utils/auth';
import T from '../api/tokenInstance';
import { setNoti } from '../features/notice/actions';

// 변수 및 함수 선언, useEffect
const isNoti = useSelector((state) => state.notice.isGlobalNoti);
const sock = new SockJS(`${baseURL}/ws-stomp`);
const ws = StompJs.over(sock);
const token = getToken();

const wsConnectSubscribe = React.useCallback(async () => {
  if (!token) {
    return null;
  }
  try {
    const { data } = await T.GET('/auth');
    console.log(data);
    ws.connect({}, () => {
      ws.subscribe(
        `/user/sub/user`,
        () => {
          if (!isNoti) {
            dispatch(setNoti(true));
          }
        },
        { token, userEmail: data.email },
      );
    });
  } catch (error) {
    console.log(error);
  }
  return null;
}, []);

const wsDisConnectUnsubscribe = React.useCallback(() => {
  try {
    ws.disconnect(
      () => {
        ws.unsubscribe('sub-0');
      },
      // { token }
    );
  } catch (error) {
    console.log(error);
  }
}, []);

React.useEffect(() => {
  if (!token) {
    return null;
  }
  wsConnectSubscribe();

  return () => {
    wsDisConnectUnsubscribe();
  };
}, []);
```

소켓에 연결하는 위의 로직을 모든 페이지에 추가하다가 문득 이런 상황에 커스텀 훅을 써야하지 않을까 싶어서 항상 생각만 하던 커스텀 훅을 직접 만들어 보았다.

```jsx
// useSocketNotiRoom.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StompJs from 'stompjs';
import SockJS from 'sockjs-client';
import { getToken } from '../utils/auth';
import T from '../api/tokenInstance';
import { setNoti } from '../features/notice/actions';

const baseURL = process.env.REACT_APP_SERVER_URI;

export default function useSocketNotiRoom() {
  const dispatch = useDispatch();
  const isNoti = useSelector((state) => state.notice.isGlobalNoti);

  const sock = new SockJS(`${baseURL}/ws-stomp`);
  const ws = StompJs.over(sock);
  const token = getToken();

  const wsConnectSubscribe = React.useCallback(async () => {
    if (!token) {
      return null;
    }
    try {
      const { data } = await T.GET('/auth');
      console.log(data);
      ws.connect({}, () => {
        ws.subscribe(
          `/user/sub/user`,
          () => {
            if (!isNoti) {
              dispatch(setNoti(true));
            }
          },
          { token, userEmail: data.email },
        );
      });
    } catch (error) {
      console.log(error);
    }
    return null;
  }, []);

  const wsDisConnectUnsubscribe = React.useCallback(() => {
    try {
      ws.disconnect(() => {
        ws.unsubscribe('sub-0');
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [wsConnectSubscribe, wsDisConnectUnsubscribe, token];
}
```

아래와 같이 쓰기만 하면 끝나서 정말 많은 코드가 줄어들었다 !

```jsx
import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

// 커스텀 훅 호출, useEffect
const [wsConnectSubscribe, wsDisConnectUnsubscribe, token] =
  useSocketNotiRoom();

React.useEffect(() => {
  if (!token) {
    return null;
  }
  wsConnectSubscribe();

  return () => {
    wsDisConnectUnsubscribe();
  };
}, []);
```

헤더에 소켓을 넣은게 계속 마음에 걸렸는데 왜 마음에 걸렸는지 알 것 같다.

헤더에 소켓을 넣는다는 것은 결국 모든 페이지에서 사용하기 위해 넣은 거지만 정작 헤더 컴포넌트의 기능과는 관련이 없는 상황이라 기능적인 분리를 하지 못한 것에 대한 찝찝함인 것 같다.

그래서 WsNotiRoom 컴포넌트를 분리해서 거기서 소켓을 쓴 다음에 App.js에서 다른 모든 컴포넌트를 감싸 주었다. 그렇기에 그 컴포넌트는 새로고침 전까지 절대 렌더링 되지 않는다

```jsx
// WsNotiRoom.js
import React from 'react';
import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

const WsNotiRoom = ({ children }) => {
  const [wsConnectSubscribe, token] = useSocketNotiRoom();

  React.useEffect(() => {
    if (!token) {
      return null;
    }
    wsConnectSubscribe();
    return null;
  }, []);
  return children;
};

export default WsNotiRoom;

// App.js
//WsNotiRoom 추가
function App() {
  return (
    <WrapApp>
      <Wrap>
        <Reset />
        <PublicRoute restricted path="/login" component={Login} exact />
        <PublicRoute restricted path="/signup" component={Signup} exact />
        <>
          <WsNotiRoom>
            <Header />
            <Permit>
              <PublicRoute path="/" component={CardList} exact />
              <PrivatecRoute path="/settings" component={Settings} exact />
              <PrivatecRoute path="/contap" component={Contap} exact />
              <PrivatecRoute path="/mypage" component={Mypage} exact />
              <PrivatecRoute path="/edit" component={CardEdit} exact />
            </Permit>
          </WsNotiRoom>
        </>
      </Wrap>
    </WrapApp>
  );
}
```

이렇게 하나로 쓰려니 커스텀훅을 굳이 쓸 필요가 없다고 생각 되었지만 그래도 처음 만들어본 훅이니까 그냥 쓰기로 했다..!

</div>
</details>

<details>
<summary>Render (한우석)</summary>
<div markdown="1">
사이드바의 카테고리를 클릭 할 때 마다 랜더링이 여러번 되는 현상이 있었다.

useCallback과 useMemo를 사용하기 위해 찾아 보았다.

![](https://media.vlpt.us/images/wswj9608/post/b4b68649-c384-4bc0-837d-234a5b586110/%EC%A0%84%EC%B2%B4%20%EB%A0%8C%EB%8D%94%EB%A7%81.png)

CardList 컴포넌트에서 카드 클릭 시 전체 카드 렌더링 됨.

이유가 뭔지 모르겠다.

CardList에서 CardFront를 불러오는데 모달을 CardFront의 State로 관리 하니 하나를 클릭 할 때 하나의 CardFront가 리렌더링 될 것이라고 생각 했지만 모든 CardFront가 랜더링이 되어서 `useCallback`이나 `useMemo`를 사용하려고 했지만 유의미한 효과를 얻지 못하였고 다른 방법을 더 찾아 보았다.

Props가 바뀌기 전까지 랜더링을 하지 않는 React.memo를 적용시켜 보았는데 일단 결과는 성공적이지만 아직 정확히 왜 모든 카드가 랜더링이 되었는지는 잘 모르겠다...

React.memo란?

UI 성능을 증가시키기 위해, React는 고차 컴퍼넌트(Higher Order Component, HOC) `React.memo()`를 제공한다. 렌더링 결과를 메모이징(Memoizing)함으로써, 불필요한 리렌더링을 건너뛴다.

```jsx
// 변경 전
export default CardFront;
// React.memo() 사용
export const MemoizedCardFront = React.memo(CardFront);
```

- 메모 사용 전
- 클릭 시 9개 카드 전부 렌더링

![](https://media.vlpt.us/images/wswj9608/post/9085302f-25c6-46d9-8643-f01bfbba22c6/%EC%A0%84%EC%B2%B4%20%EB%A0%8C%EB%8D%94%EB%A7%81%20%EC%A7%A4.gif)

- 메모 사용 후
- 클릭 시 1개 카드만 렌더링

![](https://media.vlpt.us/images/wswj9608/post/7a7fa48d-18f9-44dc-b78e-20ca0b39f5dc/%EB%A9%94%EB%AA%A8%20%EC%A0%81%EC%9A%A9%20%EB%A0%8C%EB%8D%94%EB%A7%81%20%EC%A7%A4.gif)

</div>
</details>

<details>
<summary>PathName 가져오기 (한우석)</summary>
<div markdown="1">
- 다른 사람이 채팅을 보냈을 때 채팅 미리보기 창의 메시지를 바꾸기 위해 알람을 감지 했을 때 `loadTalkRoomListToAxios()` 를 dispatch 했다.

```jsx
// chat 보냈을 때 채팅방에 둘다 있을 때 타입 0
// chat 보냈을 때 채팅방에 한명만 있고 상대방은 로그인 했을 때 타입 1
// chat 보냈을 때 상대방이 로그아웃 타입 2
// tap 요청 받았을 때 타입 3
// tap 요청 거절한게 타입 4
// tap 요청 수락한게 타입 5
if (newNoti.type === 1) {
  console.log('채팅알람!');
  console.log('디패 로드 톡룸');
  await dispatch(loadTalkRoomListToAxios());
  dispatch(setChatNoti(true));
}
```

- user A 가 메시지를 보내면

![](https://media.vlpt.us/images/wswj9608/post/b477f417-400b-403d-a47e-048a9fa01b8c/alarm1.png)

- user B 의 채팅방 목록에 미리보기로 표기 된다.

![](https://media.vlpt.us/images/wswj9608/post/45f7df92-5ed5-4b41-a518-0aefb3411484/alarm2.png)

user B가 /grabtalk 페이지에 있을 때만 dispatch를 하면 될 것 같아서 코드를 수정 했다.

```jsx
const pageCheck = window.location.pathname;

if (newNoti.type === 1) {
  if (pageCheck === '/grabtalk') {
    console.log('디패 로드 톡룸');
    await dispatch(loadTalkRoomListToAxios());
  }
  dispatch(setChatNoti(true));
}
```

- consol에 찍힌 값

![](https://media.vlpt.us/images/wswj9608/post/c5c5aac4-5bc3-4c0a-bd02-2fda6d4d6fb7/alarm3.png)

정상적으로 동작 하길래 이것저것 더 테스트를 해보던 중 메인페이지로 돌아갔다가 채팅페이지로 오게 되면 pathname이 날아가서 미리보기가 갱신 되지 않는 문제점을 발견 했다.

![](https://media.vlpt.us/images/wswj9608/post/10b3368d-7fc9-405f-ba4b-82d28095ea64/alarm4.png)

그래서 url을 가지고 오는 몇가지 방법을 더 시도해 보았다.

```jsx
import { useHistory, useLocation } from 'react-router-dom';

const history = useHistory();
const location = useLocation();

const pageCheck = window.location.href.split('/');
const nowPage = pageCheck[pageCheck.length - 1];
const nowPageE = window.location.pathname;

if (newNoti.type === 1) {
  console.log('nowPageE = window.location.pathname ===>', nowPageE);
  console.log('location ====>', location);
  console.log('history ====>', history);
  console.log('nowPage ====>', nowPage);
  console.log('pageCheck = window.location.href.split("/") ====>', pageCheck);
  if (nowPage === '/grabtalk') {
    console.log('디패 로드 톡룸');
    await dispatch(loadTalkRoomListToAxios());
  }
  dispatch(setChatNoti(true));
}
```

- 이렇게 해서 콘솔을 확인 해보니 **history.location.pathname** 빼고는 전부 root 경로로 바뀐 것을 확인 할 수 있었다.
- 명확한 이유를 아직 알지 못했다.... 차차 찾아봐야지...

![](https://media.vlpt.us/images/wswj9608/post/50ae6b38-82ba-4a4b-876c-5d12e5e2a01e/alarm5.png)

- 이제 해결이 된 줄 알고 다시 콘솔을 찍어 보았는데 동일한 증상이 발생 하였다..

```jsx
const nowPage = history.location.pathname;

if (newNoti.type === 1) {
  console.log('history.location.pathname ====>', nowPage);
  console.log('history ====>', history);
  if (nowPage === '/grabtalk') {
    console.log('디패 로드 톡룸');
    await dispatch(loadTalkRoomListToAxios());
  }
  dispatch(setChatNoti(true));
}
```

- 분명 history 안에는 들어있는데 nowPage라는 변수에 담은 history.location.pathname은 root경로를 출력했다.

![](https://media.vlpt.us/images/wswj9608/post/ad2f01e4-ddc9-4dca-98c6-0ee57cc48cb5/alarm6.png)

- 결국 최종적으로 해결 한 방법은 따로 변수에 담지 않고 바로 history를 가져오니 해결 되기 했는데 너무 찝찝하다.. 정확한 원인이 무었인지 어떻게 찾아야 할지 감이 오질 않는다....
- 그래도 일단 해결은 되어서 다행이다 ㅜㅜ 진짜 이거때문에 몇시간을 삽질 했는지.. 오늘은 진짜 다섯시에는 자려고 했는데 결국 7시가 다 되어버렸다.

```jsx
if (newNoti.type === 1) {
  if (history.location.pathname === '/grabtalk') {
    console.log('디패 로드 톡룸');
    await dispatch(loadTalkRoomListToAxios());
  }
  dispatch(setChatNoti(true));
}
```

![](https://media.vlpt.us/images/wswj9608/post/b1128f7c-e312-40f0-b840-29350e5fbe8b/alarm7.png)

</div>
</details>

<details>
<summary>채팅 말풍선 디테일 (한우석)</summary>
<div markdown="1">
- 같은 사람이 보낸 말풍선의 위,아래 마진은 16px
- 보낸 사람이 다르면 말풍선의 위,아래 마진은 32px
- 한사람이 여러개의 말풍선을 보냈을 때 한 세트처럼 보여질 수 있도록 구현

![](https://media.vlpt.us/images/wswj9608/post/78b57d7e-b2c7-4ecb-b944-9eff40d95f25/bubble1.png)

- 기존 코드

```jsx
return (
      <ChatMessageBox ref={scrollRef}>
        {messageList?.map((msg, i) => {
          return (
            <Speechbubble key={i} isMe={msg.writer === userInfo}>
                <Text regular16>{msg.message}</Text>
              </Speechbubble>
            )
        })}
      </ChatMessageBox>
  );
};

// css margin
// 본인의 말풍선인지 아닌지만 체크
  margin: ${({ isMe }) =>
  isMe ? '24px 0px 24px auto' : '24px auto 24px 48px'};

```

![](https://media.vlpt.us/images/wswj9608/post/120e28f2-26d7-4858-9224-15d0cf1ee39a/bubble2.png)

해당 사항들을 변경 하려고 하니 딱 떠오르는 로직이 없었다....

## 해결 과정

- 이전 메시지를 감지해야 하나 싶어서 아래의 코드를 추가 했다.

```jsx
const speechCheck = (idx) => {
	console.log(messageList[idx - 1])
  console.log(messageList[idx])
  if (messageList[idx - 1].writer === messageList[idx].writer) {
    return true
  } return false
}

return (
      <ChatMessageBox ref={scrollRef}>
        {messageList?.map((msg, i) => {
          return (
            <Speechbubble key={i} isMe={msg.writer === userInfo} speechCheck={speechCheck(i)}>
                <Text regular16>{msg.message}</Text>
              </Speechbubble>
            )
        })}
      </ChatMessageBox>
  );
};
```

- 사실 바로 될 줄 몰랐는데 일단 이렇게 하니 연속 된 메시지의 정보를 확인 할 수 있었다.

![](https://media.vlpt.us/images/wswj9608/post/dfe83332-dd09-446e-afbd-9d652b74cae5/bubble3.png)

- 다음으로 내가 필요한 조건
  - 메시지를 내가 보냈는가?
  - 같은 사람이 연달아서 보낸 메시지가 있는가?
- 메시지를 써보니 두개씩 뜬다.. 뭔가 단단히 잘못 되었다..

![](https://media.vlpt.us/images/wswj9608/post/da6911c1-d6dd-48dc-9c18-46e81550251b/bubble4.png)

일단 다시 코드를 원상태로 돌린 다음에 하나하나 해결을 먼저 해보기로 했다.

말풍선을 한 세트로 묶는거 보다 일단 글자 사이 간격 먼저!

```jsx
return (
	  <ChatMessageBox ref={scrollRef}>
	    {messageList?.map((msg, i) => {
	      return msg.writer === userInfo ? (
	        <MySpeechbubble key={i}>
	          <Text regular16>{msg.message}</Text>
	        </MySpeechbubble>
	      ) : (
	        <Speechbubble key={i}>
	          <Text regular16>{msg.message}</Text>
	        </Speechbubble>
	      );
	    })}
	  </ChatMessageBox>
  );
};
```

`isMe={msg.writer === userInfo}` 를 기준으로 나누었었는데 그냥 div 자체를 따로 주는게 작업하기 편할 것 같아서 일단은 둘이 나누어 보았다.

근데 나누고 보니 결국 똑같다는 생각이 든다..

나누고 어쩌고 해봐야 결국 둘을 구분할 수 없을 것 같아 다시 처음부터 생각을 해보았다.

- 아래 보이는 정보가 반복되어 div로 들어간다.
- 이 안에서 내가 말풍선을 구분할 수 있는 키값이 있나?

![](https://media.vlpt.us/images/wswj9608/post/f1901724-ddd8-468e-a13b-b11a267e675a/bubble5.png)

- 결국 map을 돌린다는 건 이런식으로 된다는 건데 여기서 어떻게 할까?
- 내가 너무 map 안에서만 해결을 하려고 하나?

```jsx

return (
	  <ChatMessageBox ref={scrollRef}>
        <Speechbubble isMe={msg.writer === userInfo}>
          <Text regular16>{msg.message}</Text>
        </Speechbubble>
        <Speechbubble isMe={msg.writer === userInfo}>
          <Text regular16>{msg.message}</Text>
        </Speechbubble>
        <Speechbubble isMe={msg.writer === userInfo}>
          <Text regular16>{msg.message}</Text>
        </Speechbubble>
        <Speechbubble isMe={msg.writer === userInfo}>
          <Text regular16>{msg.message}</Text>
        </Speechbubble>
        <Speechbubble isMe={msg.writer === userInfo}>
          <Text regular16>{msg.message}</Text>
        </Speechbubble>
        <Speechbubble isMe={msg.writer === userInfo}>
          <Text regular16>{msg.message}</Text>
        </Speechbubble>
        <Speechbubble isMe={msg.writer === userInfo}>
          <Text regular16>{msg.message}</Text>
        </Speechbubble>
	  </ChatMessageBox>
  );
};
```

- 백엔드에게 요청해서 해결 할 수 있는 방법은?

  - 메시지를 보내는 사람이 바뀌었을 때 체크를 할 수 있는 값을 받을 수 있다면 그 부분이 체크 되었을 떈 마진 높게?
  - 그런식으로 해서 된다면 지금도 체크할 수 있는 값만 만들면 되나?
  - 그래서 스테이트로 관리를 할 수 있을까 싶어 작성 했다가 길이 보이지 않아서 일단 다시 돌아왔다 ㅎ..

  ```jsx
  // 마지막으로 받은 메시지의 writer를 가져온다.
    const [writer, changeWriter] = React.useState(messageList[0].writer)

  return (
  	  <ChatMessageBox ref={scrollRef}>
  	    {messageList?.map((msg, i) => {
            // writer이 메시지를 보낸 유저와 다를 때
            if (writer !== msg.writer) {
              // writer을 메시지를 보낸 유저로 바꾼다.
              changeWriter(msg.writer)
            }
            return (
              <Speechbubble key={i} isMe={msg.writer === userInfo}>
                  <Text regular16>{msg.message}</Text>
                </Speechbubble>
              )
          })}
  	  </ChatMessageBox>
    );
  };

  ```

- 다음으로 했던 방법은 다시 함수를 하나 만들었다

```jsx
const test = () => {
  //state를 copy
  const copy = messageList.slice();
  //messageList가 하나일 땐 굳이 나눌 필요가 없으니 return
  if (messageList.length === 1) {
    return copy;
  }

  // 다음 메시지와 writer를 비교해서 isMargin 이라는 key,value를 주었다.
  for (let i = 0; i < messageList.length - 1; i++) {
    const previousMessage = copy[i];
    const nextMessage = copy[i + 1];
    if (!nextMessage) {
      break;
    }

    if (previousMessage.writer !== nextMessage.writer) {
      copy[i].isMargin = true;
    } else {
      copy[i + 1].isMargin = false;
    }
    copy[i].isMargin = false;
  }
  return copy;
};

const etest = test();

console.log(etest);
```

- 실행 결과
- 객체를 확장할 수 없다는 에러메시지가 나왔고 처음부터 반신반의 하며 만들었던 코드라서 굳이 더 찾아보지 않고 다른 방법을 찾아보았다.

![](https://media.vlpt.us/images/wswj9608/post/b6dbb524-ee35-4de3-99f9-3202e5c18f42/bubble6.png)

- 다음으로는 map함수를 조금 더 찾아 보았다.
- callback의 인수가 더 있을 것 같아서 찾아 보았는데 역시 array 라는 파라미터가 있었다.

![](https://media.vlpt.us/images/wswj9608/post/5ac81f35-a890-4917-a58f-132b5d326e5b/bubble7.png)

이 array를 이용해서 다시 이전 메시지를 체크할 수 있는 조건문을 작성 했다.

```jsx
return (
	  <ChatMessageBox ref={scrollRef}>
	    {messageList?.map((msg, i, arr) => {
	      const prevMessage = arr[i];
	      const nextMessage = arr[i + 1];
	      const isMargin =
					// isMargin은 message가 하나거나, 첫번째 message거나, 작성자가 같다면 false
					// 아니면 true
	        arr.length === 1 ||
	        i === arr.length - 1 ||
	        prevMessage.writer === nextMessage.writer
	          ? false
	          : true;
	      return (
	        <SpeechBubble key={i} isMe={msg.writer === userInfo} isMargin={isMargin}>
	          <Text regular16>{msg.message}</Text>
	        </SpeechBubble>
	      );
	    })}
	  </ChatMessageBox>
  );
};
```

- 조금 더 방법을 다듬어 볼 수 있을 것 같은데 일단 동작은 정상적으로 되었다.

![](https://media.vlpt.us/images/wswj9608/post/7bacd6ff-a566-4f75-bed3-3bb8254287f1/bubble8.png)

---

- 다음은 이 부분을 해결 해야한다...
- 한사람이 여러개의 말풍선을 보냈을 때 한 세트처럼 보여질 수 있도록 구현

![](https://media.vlpt.us/images/wswj9608/post/085612fb-20af-4d4d-852a-e81469ef7ba5/bubble9.png)

위에 마진과 비슷하게 구현을 하긴 했는데... 이게 맞나 싶은데... 어쩔 수 없이 일단은 그대로 두기로 했다.

```jsx

return (
	  <ChatMessageBox ref={scrollRef}>
	    {messageList?.map((msg, i, arr) => {
	      const isMargin =
				  arr.length === 1 ||
				  i === arr.length - 1 ||
				  arr[i].writer === arr[i + 1].writer
				    ? false
				    : true;

				const orderCheck = () => {
				  if (arr.length === 1) {
				    return;
				  }
				  if (arr[i].writer !== arr[i - 1]?.writer) {
				    if (isMe) {
				      return 'meFirst';
				    }
				    return 'first';
				  }
				  if (arr[i].writer !== arr[i + 1]?.writer) {
				    if (isMe) {
				      return 'meLast';
				    }
				    return 'last';
				  }
				  if (isMe) {
				    return 'meMiddle';
				  }
				  return 'middle';
				};

	      return (
	        <SpeechBubble key={i} isMe={msg.writer === userInfo} isMargin={isMargin}>
	          <Text regular16>{msg.message}</Text>
	        </SpeechBubble>
	      );
	    })}
	  </ChatMessageBox>
  );
};

// css border-radius
// ...... 목으로 라도 돌려야지...
border-radius: ${({ orderCheck }) =>
  orderCheck === 'meFirst'
    ? '30px 30px 5px 30px'
    : orderCheck === 'meLast'
    ? '30px 5px 30px 30px'
    : orderCheck === 'first'
    ? '30px 30px 30px 5px'
    : orderCheck === 'last'
    ? '5px 30px 30px 30px'
    : orderCheck === 'middle'
    ? '5px 30px 30px 5px'
    : '30px 5px 5px 30px'};
```

---

## 구현 완료

![](https://media.vlpt.us/images/wswj9608/post/25516571-be9c-4cce-bc6b-69589ae36aaf/bubble10.png)

</div>
</details>

## User FeedBack

- FeedBack 통계
  <img src = "https://media.vlpt.us/images/junseokoo/post/5e97d7ed-817e-4d86-b1c6-f263b72b0210/image.png">

---

- FeedBack - 카드작성시 뭘 해야할지 잘 모르겠습니다, 카드형식으로 프로젝트를 보여주기 때문에 제약이 많았습니다.<br><br>
- Solution - 기획단계부터 Closed Community형식으로 가기위해 뒷면카드를 작성하지 않으면 다른사람의 카드를 열람하시 못하게 하였으나 그렇게하니 카드 작성을 어떤식으로 해야할지 모르겠다는 피드백이 많았는데 이때 떠오른 해결방법은 두가지 였습니다.<br>
  1. ClosedCommunity를 유지하고 온보딩 형식으로 카드작성 가이드를 보여준다.
  2. 뒷면카드 열람권한을 로그인만 하면 가능하게 하여 사용자가 직접 카드를 탐색하여 작성할 수 있게 한다.<br><br>
     전자의 방법은 너무 강제성이 강할 것 같았고 아무래도 하나하나 설명하는 사이트가 좋은 사이트처럼 보이지는 않아서 PlaceHolder로 최대한 상세하게 알려주는 것을 전제로 해결방안으로 후자를 선택하게 되었습니다.
     <img src = "https://media.vlpt.us/images/junseokoo/post/55f3fcf7-e6c8-4e56-a9e9-40125e20d4a3/Untitled.png"><br><br>
- FeedBack - 백엔드,프론트엔드의 색이 구분이 되었으면 좋겠다.<br><br>
- Solution - 핵심 기능이 개발자와 디자이너의 매칭이기 때문에 개발자 끼리의 색 구분은 크게 의미가 없다고 생각 했었으나 생각보다 많은 피드백 요청이 와서 많은 고민을 했었습니다.색을 추가만하면되는 간단한 작업이었지만 이 부분 또한 사이트의 메인컬러라고 생각할 수 있기 때문에 정말 신중하게 색상을 선택하여 적용했습니다.<br><br>
  <img src = "https://media.vlpt.us/images/junseokoo/post/e0a140be-71a4-4229-8004-aca093799e01/%E1%84%8F%E1%85%A1%E1%84%83%E1%85%B3%20%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%87%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC.gif">

## Marketing

<img src = "https://media.vlpt.us/images/junseokoo/post/41924e47-f8fc-4c10-8659-1db5529b6e0a/Untitled.png">
