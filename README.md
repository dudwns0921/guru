# Guru

AI 기반 맞춤형 온라인 교육 플랫폼

---

## 📚 프로젝트 배경 및 목표

AI 기술의 발전으로 맞춤형 온라인 교육 플랫폼에 대한 수요가 증가하고 있습니다. Guru 프로젝트는 학습자의 활동 데이터와 선호도를 기반으로 한 AI 개인화 추천 시스템을 갖춘 교육 플랫폼을 개발하는 것을 목표로 합니다.

---

## 🧑‍💻 기술 스택

| 구분        | 사용 기술                |
|-----------|----------------------|
| 프론트엔드   | React, TypeScript      |
| 백엔드      | NestJS, MongoDB        |
| AI 모듈     | Python, LangGraph, FastAPI |

---

## 🚀 설치 및 실행 방법 (Docker)

### 개발 환경 실행

```bash
docker-compose up --build
```

### 개발 환경 중지
```bash
docker-compose down
```

---

### 운영(배포) 환경 실행

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### 운영 환경 중지
```bash
docker-compose -f docker-compose.prod.yml down
```

---

##  🛠️ 주요 설정 파일 위치 안내

- **도커 컴포즈 파일**
  - 개발: `docker-compose.yml`
  - 운영: `docker-compose.prod.yml`