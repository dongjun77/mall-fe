# mall-fe

TodoList react 프로젝트입니다
로그인, 카카오로그인, TodoList, 상품 등록, 장바구니 담기

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React |
| 상태관리 | Recoil, React Query |
| 스타일 | TailwindCSS -> MUI (Material UI) |
| HTTP 통신 | Axios |
| 권한 인증인가 | JWT (with Cookies) |
| 소셜 로그인 | Kakao OAuth |
| 빌드 | Vite |

## React 구성 방식

- Pages / Component 구분
  - Pages: 페이지 단위
  - Components: 세부 기능별 UI
 
## 상태 관리

➡️ Recoil
로그인 정보(signinState)와 장바구니 상태(cartState) 관리
atom 단위로 글로벌 상태를 선언하고 쉽게 읽고 수정

➡️ React Query
서버 데이터 가져오기(GET)와 같은 비동기 데이터 관리 전담
서버데이터를 사용자 친화적으로 관리

## API 통신

➡️ Axios
/api/ 디렉토리에 API 모듈화
memberApi.jsx, kakaoApi.jsx, productApi.jsx 등
- jwtAxios에서 인증이 필요한 api에 한하여 header에 jwt 토큰을 넣는 작업

## 인증 처리

➡️ JWT 기반 로그인
서버로부터 받은 JWT 토큰을 쿠키에 저장 (cookieUtil)
이후 모든 인증은 쿠키에 저장된 토큰을 기반으로 처리
로그인 시 사용자 정보를 전역 상태(signinState)에 저장
➡️ 카카오 소셜 로그인
카카오 OAuth 서버 리다이렉트 방식 사용
카카오 인증 서버에서 인증 완료 후, 자체 서버로 토큰 발급받음

## 스타일

➡️ TailwindCSS
➡️ Material-UI (MUI)

## 라우팅

➡️ React Router 사용

## 배운점
- React를 기반으로 ReCoil과 React Query를 조합하여 클라이언트 상태와 서버 상태를 분리하여 관리
- 사용자 인증은 JWT와 쿠키를 이용

