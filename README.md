# [**WorkForUsV2**](https://v2.workforus.site/)

## 👋 **목차**

 - [**프로젝트 소개**](#프로젝트-소개)
 - [**개발환경**](#개발-환경)
 - [**설치하기**](#설치하기)
 - [**기능소개**](#기능-소개)
 - [**API 스펙**](#api-스펙)
 - [**배포**](#배포)

---

## **프로젝트 소개**

- 소개
  - 이전에 진행한 [프로젝트(WorkForUs)](https://github.com/hong-yura/WorkForUs-Project)에서 아쉬웠던 부분을 보완하기 위해 진행한 프로젝트입니다.
  - 프론트엔드는 [Next.js](https://nextjs.org/), 백엔드는 [Spring Boot](https://spring.io/projects/spring-boot) 기반으로 제작 되었습니다.
  - 우선 **로그인 및 회원가입 기능**과 이전 프로젝트에서 맡았던 부분인 **일정관리 기능**만 구현되어있습니다.
  
- 보완점
  - 이전 프로젝트에선 View 부분을 JSP 기반으로 했었는데 이번 프로젝트에선 typescript 기반의 Next.js 프로젝트로 분리하였습니다.
  - 이전 프로젝트의 제가 맡았던 부분에서 react를 [Webjars](https://www.webjars.org/)를 이용해 es6의 module기능 없이 사용하여 IDE의 도움을 거의 받지 못하였는데
  이번 프로젝트에선 그 부분이 개선되어 생산성이 향상되었습니다.
  - redux, react-query를 사용하여 상태관리를 보다 효율적으로 하였습니다.
  - api에 접근하는데 jwt 토큰 기반 인증을 추가하여 보안성을 향상시켰습니다.
  
    <br>
    <br>

---

## **개발 환경**

- **개발 도구**

  ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?logo=intellij-idea&logoColor=white)
  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?logo=visual-studio-code&logoColor=white)

- **Front End**

  ![Next JS](https://img.shields.io/badge/Next-black?&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?&logo=react&logoColor=%2361DAFB)
  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?&logo=redux&logoColor=white)
  ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?logo=react%20query&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?&logo=typescript&logoColor=white)
  ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?&logo=mui&logoColor=white)
  ![ESLint](https://img.shields.io/badge/ESLint-4B3263?&logo=eslint&logoColor=white)

- **Back End**

  ![Spring Boot](https://img.shields.io/badge/spring%20boot-%236DB33F.svg?logo=spring&logoColor=white)
  ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?logo=java&logoColor=white)
  ![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?logo=Gradle&logoColor=white)

- **Database**

  ![MariaDB](https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=white)

- **Deployment**

  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?logo=amazon-aws&logoColor=white)
  ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?logo=githubactions&logoColor=white)
  ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?logo=vercel&logoColor=white)
  ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?logo=nginx&logoColor=white)
  ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)
  ![Vultr](https://img.shields.io/badge/Vultr-007BFC.svg?logo=vultr)
  ![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?logo=jenkins&logoColor=white)
  ![Oracle](https://img.shields.io/badge/OCI-F80000?logo=oracle&logoColor=white)
  ![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?logo=Raspberry-Pi)

- **VCS**

  ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

  <br>

---

## **설치하기**

- [Wiki 링크](https://github.com/modernToujours/workforus-v2-front/wiki/%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)

<br>
  
---

## **기능 소개**

- 추가 예정

<br>

---

## API 스펙

- [Swagger 링크](https://api.workforus.site/swagger-ui/index.html)

<br>

---

## **배포**
![ci-cd-image](https://forus-s3.s3.ap-northeast-2.amazonaws.com/cicd.png)

- [배포 주소](https://v2.workforus.site/)
- 프론트 부분은 [Vercel](https://vercel.com/)을 통해서 배포중 입니다.
- [가비아](https://domain.gabia.com/)에서 구입한 [workforus.site](https://www.workforus.site)의 서브도메인(v2,api,jenkins)을 [AWS Route53](https://aws.amazon.com/route53/)에서 호스팅 중 입니다.
- 백엔드의 SSL 인증서는 [Let's Encrypt](https://letsencrypt.org/)와 [Certbot](https://certbot.eff.org/)을 사용하여 발급받아 [AWS EC2](https://aws.amazon.com/ec2/)에 호스팅 중인 [NginX](https://www.nginx.com/)로 구성된 리버스 프록시 서버에 적용하였습니다.
- ~~백엔드 서버는 main branch에 push시 github action을 통해 테스트와 빌드를 거친후 docker image로 build되어 [Dockerhub](https://hub.docker.com/)로 push됩니다. ~~이후 [Vultr](https://my.vultr.com/)의 compute instance에서 dockerhub로 부터 이미지를 가져와 컨테이너를 통해 실행됩니다.~~(vultr 무료사용기간 만료로 변경하였습니다.)
- dockerhub repository update시 jenkins에 webhook을 통해 build를 유발하고, docker container를 실행할 2개의 oracle cloud compute instance와 ec2의 nignx를 통해 blue green 배포를 합니다.
- 젠킨스의 경우 라즈베리파이를 통해 홈서버를 구축하여, 포트포워딩을 통해 접근하고 작업하였습니다.
