# 오늘 뭐 입지?

<br />

## 서비스 링크

> https://younngg.github.io/WhatShouldIWear/

<br />

## 프로젝트 소개

#### 기온별 옷차림을 추천 받을 수 있고, 날씨와 그날 입은 옷을 기록할 수 있는 앱입니다.

1. 현재 위치와 날씨에 따른 옷차림 추천을 조회할 수 있습니다.
2. Google 로그인을 할 수 있고, 로그인 시 글 작성 및 삭제가 가능합니다.
3. 회원, 비회원 모두 작성글을 조회할 수 있습니다.
4. 날짜, 지역, 기온 별로 filter 된 글 목록을 조회할 수 있습니다.
5. 글 작성시 날짜, 현재 기온, 날씨가 자동 입력 되며, 해쉬태그 기능을 사용해 오늘 입은 옷을 작성할 수 있습니다.

<br />

## 구현 화면

![KakaoTalk_20221205_153343901](https://user-images.githubusercontent.com/98656282/205566194-be6ddb26-407e-409c-ab77-d12235384fad.gif)

<img width="100%"  src="https://user-images.githubusercontent.com/98656282/205566908-f06ee305-92ce-48f8-8ebd-ff9e87864171.png"/>

데스크탑

<img width="40%" src="https://user-images.githubusercontent.com/98656282/205566894-ad9e3a06-7abc-4b58-81f8-6b65715d3b06.png"/>

모바일

<br />

## :hammer_and_wrench: 기술 스택

- React
- TypeScript
- firebase OAuth
- firebase Realtime database
- React Bootstrap

## :runner: 로컬 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

   ```
   git clone <레포지토리 주소>
   ```

<br>

2. 클론한 디렉토리에서 아래 명령어를 통해 필요한 module 설치

   ```
   npm install
   ```

<br>

3. firebase, open weather API에서 필요한 `.env` 설정

- 아래 설명에 따라 환경변수 설정

  ```
  REACT_APP_FIREBASE_API_KEY=<firebase API 키>
  REACT_APP_FIREBASE_AUTH_DOMAIN=<firebase Auth domain>
  REACT_APP_FIREBASE_DB_URL=<firebase database url>
  REACT_APP_FIREBASE_PROJECT_ID=<firebase project id>
  REACT_APP_WEATHER_API_KEY=<open weather API 키>
  ```

4. 앱을 실행

   ```
   npm start
   ```
