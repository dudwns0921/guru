export const seedReviews = [
  {
    id: 1,
    rating: 5,
    comment: '정말 유익한 강의였습니다! 초보자에게 딱이에요.',
    createdAt: new Date('2025-08-01T10:00:00Z'),
    updatedAt: new Date('2025-08-01T10:00:00Z'),
    user: { id: 1 }, // '김유저'
    course: { id: 1 }, // 'JavaScript 기초 마스터'
  },
  {
    id: 2,
    rating: 4,
    comment: 'ES6 문법을 잘 설명해주셔서 이해하기 쉬웠습니다.',
    createdAt: new Date('2025-08-01T12:00:00Z'),
    updatedAt: new Date('2025-08-01T12:00:00Z'),
    user: { id: 2 }, // '박강사'
    course: { id: 2 }, // 'JavaScript ES6+ 심화'
  },
  {
    id: 3,
    rating: 5,
    comment: 'React를 처음 배우는 사람에게 강력 추천합니다!',
    createdAt: new Date('2025-08-01T14:00:00Z'),
    updatedAt: new Date('2025-08-01T14:00:00Z'),
    user: { id: 3 }, // '이관리자'
    course: { id: 3 }, // 'React 입문과 핵심'
  },
  {
    id: 4,
    rating: 4,
    comment: '고급 패턴을 배우기에 좋은 강의였습니다.',
    createdAt: new Date('2025-08-01T16:00:00Z'),
    updatedAt: new Date('2025-08-01T16:00:00Z'),
    user: { id: 4 }, // '최수강생'
    course: { id: 4 }, // 'React 고급 패턴과 성능 최적화'
  },
  {
    id: 5,
    rating: 5,
    comment: '실전 프로젝트를 통해 많은 것을 배웠습니다.',
    createdAt: new Date('2025-08-01T18:00:00Z'),
    updatedAt: new Date('2025-08-01T18:00:00Z'),
    user: { id: 5 }, // '정강사'
    course: { id: 5 }, // 'React 프로젝트 실전'
  },
  {
    id: 6,
    rating: 4,
    comment: '백엔드 개발을 시작하기에 좋은 강의입니다.',
    createdAt: new Date('2025-08-02T10:00:00Z'),
    updatedAt: new Date('2025-08-02T10:00:00Z'),
    user: { id: 1 }, // '김유저'
    course: { id: 6 }, // 'Node.js 백엔드 기초'
  },
  {
    id: 7,
    rating: 5,
    comment: 'Express를 활용한 서버 구축이 정말 쉬워졌습니다.',
    createdAt: new Date('2025-08-02T12:00:00Z'),
    updatedAt: new Date('2025-08-02T12:00:00Z'),
    user: { id: 2 }, // '박강사'
    course: { id: 7 }, // 'Express로 웹 서버 구축하기'
  },
  {
    id: 8,
    rating: 5,
    comment: 'API 설계와 구현에 대해 깊이 배울 수 있었습니다.',
    createdAt: new Date('2025-08-02T14:00:00Z'),
    updatedAt: new Date('2025-08-02T14:00:00Z'),
    user: { id: 3 }, // '이관리자'
    course: { id: 8 }, // 'RESTful API 마스터'
  },
  {
    id: 9,
    rating: 4,
    comment: '마이크로서비스 설계에 대한 좋은 가이드였습니다.',
    createdAt: new Date('2025-08-02T16:00:00Z'),
    updatedAt: new Date('2025-08-02T16:00:00Z'),
    user: { id: 4 }, // '최수강생'
    course: { id: 9 }, // 'Node.js 마이크로서비스 아키텍처'
  },
  {
    id: 10,
    rating: 5,
    comment: '모바일 앱 개발에 대한 새로운 시각을 얻었습니다.',
    createdAt: new Date('2025-08-02T18:00:00Z'),
    updatedAt: new Date('2025-08-02T18:00:00Z'),
    user: { id: 5 }, // '정강사'
    course: { id: 10 }, // 'React Native 모바일 앱'
  },
  {
    id: 11,
    rating: 5,
    comment: 'Spring Boot의 기본을 잘 다룬 강의입니다.',
    createdAt: new Date('2025-08-03T10:00:00Z'),
    updatedAt: new Date('2025-08-03T10:00:00Z'),
    user: { id: 1 },
    course: { id: 11 }, // 'Spring Boot 마스터'
  },
  {
    id: 12,
    rating: 4,
    comment: 'Flutter로 앱 개발을 시작하기에 좋은 강의입니다.',
    createdAt: new Date('2025-08-03T12:00:00Z'),
    updatedAt: new Date('2025-08-03T12:00:00Z'),
    user: { id: 2 },
    course: { id: 12 }, // 'Flutter 앱 개발'
  },
  {
    id: 13,
    rating: 5,
    comment: 'Redis를 활용한 캐싱 전략이 매우 유용했습니다.',
    createdAt: new Date('2025-08-03T14:00:00Z'),
    updatedAt: new Date('2025-08-03T14:00:00Z'),
    user: { id: 3 },
    course: { id: 13 }, // 'Redis 캐싱 전략'
  },
  {
    id: 14,
    rating: 4,
    comment: 'Elasticsearch를 활용한 검색 기능이 인상적이었습니다.',
    createdAt: new Date('2025-08-03T16:00:00Z'),
    updatedAt: new Date('2025-08-03T16:00:00Z'),
    user: { id: 4 },
    course: { id: 14 }, // 'Elasticsearch 검색엔진'
  },
  {
    id: 15,
    rating: 5,
    comment: 'Svelte의 기본을 잘 설명한 강의입니다.',
    createdAt: new Date('2025-08-03T18:00:00Z'),
    updatedAt: new Date('2025-08-03T18:00:00Z'),
    user: { id: 5 },
    course: { id: 15 }, // 'Svelte 프론트엔드'
  },
  {
    id: 16,
    rating: 5,
    comment: 'PostgreSQL의 고급 기능을 잘 다룬 강의입니다.',
    createdAt: new Date('2025-08-04T10:00:00Z'),
    updatedAt: new Date('2025-08-04T10:00:00Z'),
    user: { id: 1 },
    course: { id: 16 }, // 'PostgreSQL 데이터베이스'
  },
  {
    id: 17,
    rating: 4,
    comment: 'Nginx 설정과 최적화에 대해 잘 배웠습니다.',
    createdAt: new Date('2025-08-04T12:00:00Z'),
    updatedAt: new Date('2025-08-04T12:00:00Z'),
    user: { id: 2 },
    course: { id: 17 }, // 'Nginx 웹서버'
  },
  {
    id: 18,
    rating: 5,
    comment: 'Jenkins를 활용한 CI/CD 파이프라인 구축이 유익했습니다.',
    createdAt: new Date('2025-08-04T14:00:00Z'),
    updatedAt: new Date('2025-08-04T14:00:00Z'),
    user: { id: 3 },
    course: { id: 18 }, // 'Jenkins CI/CD'
  },
  {
    id: 19,
    rating: 4,
    comment: 'Golang으로 백엔드 개발을 시작하기에 좋은 강의입니다.',
    createdAt: new Date('2025-08-04T16:00:00Z'),
    updatedAt: new Date('2025-08-04T16:00:00Z'),
    user: { id: 4 },
    course: { id: 19 }, // 'Golang 백엔드 개발'
  },
  {
    id: 20,
    rating: 5,
    comment: 'Rust의 시스템 프로그래밍 개념을 잘 설명한 강의입니다.',
    createdAt: new Date('2025-08-04T18:00:00Z'),
    updatedAt: new Date('2025-08-04T18:00:00Z'),
    user: { id: 5 },
    course: { id: 20 }, // 'Rust 시스템 프로그래밍'
  },
  {
    id: 21,
    rating: 5,
    comment: 'Tailwind CSS로 빠르게 UI를 개발할 수 있었습니다.',
    createdAt: new Date('2025-08-05T10:00:00Z'),
    updatedAt: new Date('2025-08-05T10:00:00Z'),
    user: { id: 1 },
    course: { id: 21 }, // 'Tailwind CSS 디자인'
  },
  {
    id: 22,
    rating: 4,
    comment: 'WebAssembly를 활용한 고성능 웹 개발이 흥미로웠습니다.',
    createdAt: new Date('2025-08-05T12:00:00Z'),
    updatedAt: new Date('2025-08-05T12:00:00Z'),
    user: { id: 2 },
    course: { id: 22 }, // 'WebAssembly 고성능 웹'
  },
  {
    id: 23,
    rating: 5,
    comment: 'Three.js로 3D 그래픽스를 구현하는 방법을 배웠습니다.',
    createdAt: new Date('2025-08-05T14:00:00Z'),
    updatedAt: new Date('2025-08-05T14:00:00Z'),
    user: { id: 3 },
    course: { id: 23 }, // 'Three.js 3D 웹'
  },
  {
    id: 24,
    rating: 4,
    comment: 'D3.js로 데이터 시각화를 구현하는 데 많은 도움이 되었습니다.',
    createdAt: new Date('2025-08-05T16:00:00Z'),
    updatedAt: new Date('2025-08-05T16:00:00Z'),
    user: { id: 4 },
    course: { id: 24 }, // 'D3.js 데이터 시각화'
  },
  {
    id: 25,
    rating: 5,
    comment: 'Socket.io로 실시간 통신을 구현하는 방법을 배웠습니다.',
    createdAt: new Date('2025-08-05T18:00:00Z'),
    updatedAt: new Date('2025-08-05T18:00:00Z'),
    user: { id: 5 },
    course: { id: 25 }, // 'Socket.io 실시간 통신'
  },
  {
    id: 26,
    rating: 5,
    comment: 'Prisma ORM을 활용한 데이터베이스 액세스가 매우 유용했습니다.',
    createdAt: new Date('2025-08-06T10:00:00Z'),
    updatedAt: new Date('2025-08-06T10:00:00Z'),
    user: { id: 1 },
    course: { id: 26 }, // 'Prisma ORM'
  },
  {
    id: 27,
    rating: 4,
    comment: 'Stripe로 결제 시스템을 구현하는 방법을 배웠습니다.',
    createdAt: new Date('2025-08-06T12:00:00Z'),
    updatedAt: new Date('2025-08-06T12:00:00Z'),
    user: { id: 2 },
    course: { id: 27 }, // 'Stripe 결제 시스템'
  },
  {
    id: 28,
    rating: 5,
    comment: 'Firebase로 서버리스 백엔드를 구축하는 데 많은 도움이 되었습니다.',
    createdAt: new Date('2025-08-06T14:00:00Z'),
    updatedAt: new Date('2025-08-06T14:00:00Z'),
    user: { id: 3 },
    course: { id: 28 }, // 'Firebase 백엔드'
  },
  {
    id: 29,
    rating: 4,
    comment: 'Supabase를 활용한 백엔드 개발이 흥미로웠습니다.',
    createdAt: new Date('2025-08-06T16:00:00Z'),
    updatedAt: new Date('2025-08-06T16:00:00Z'),
    user: { id: 4 },
    course: { id: 29 }, // 'Supabase 개발'
  },
  {
    id: 30,
    rating: 5,
    comment: 'TensorFlow.js로 머신러닝 모델을 구현하는 방법을 배웠습니다.',
    createdAt: new Date('2025-08-06T18:00:00Z'),
    updatedAt: new Date('2025-08-06T18:00:00Z'),
    user: { id: 5 },
    course: { id: 30 }, // 'TensorFlow.js 머신러닝'
  },
]
