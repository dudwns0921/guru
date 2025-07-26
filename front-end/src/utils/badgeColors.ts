// 다크모드/라이트모드에서 모두 잘 보이는 배지 색상들
const badgeColors = [
  // Blue tones
  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  // Green tones
  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  // Purple tones
  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  // Pink tones
  'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  // Orange tones
  'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  // Indigo tones
  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  // Teal tones
  'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  // Red tones
  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
]

// 문자열을 기반으로 일관된 색상을 반환하는 함수
export function getBadgeColor(text: string): string {
  // 문자열의 해시 값을 계산
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // 32비트 정수로 변환
  }

  // 해시를 이용해 색상 인덱스 선택
  const colorIndex = Math.abs(hash) % badgeColors.length
  return badgeColors[colorIndex]
}

// 완전히 랜덤한 색상을 원할 경우 사용
export function getRandomBadgeColor(): string {
  const randomIndex = Math.floor(Math.random() * badgeColors.length)
  return badgeColors[randomIndex]
}
