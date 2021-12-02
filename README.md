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
내용
</div>
</details>

<details>
<summary>Render (한우석)</summary>
<div markdown="1">
내용
</div>
</details>

<details>
<summary>PathName 가져오기 (한우석)</summary>
<div markdown="1">
내용
</div>
</details>

<details>
<summary>채팅 말풍선 디테일 (한우석)</summary>
<div markdown="1">
내용
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
```
