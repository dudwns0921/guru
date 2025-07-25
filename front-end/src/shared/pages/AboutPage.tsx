function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">소개</h1>
        <div className="prose prose-lg text-gray-600">
          <p className="mb-6">
            Guru는 개인화된 강의 추천 시스템을 제공하는 온라인 학습 플랫폼입니다.
          </p>
          <p className="mb-6">
            사용자의 학습 패턴, 관심사, 수강 이력을 분석하여 가장 적합한 강의를 추천해드립니다.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">주요 기능</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>개인화된 강의 추천</li>
            <li>스마트 검색 기능</li>
            <li>학습 진도 관리</li>
            <li>강의 리뷰 및 평가</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
