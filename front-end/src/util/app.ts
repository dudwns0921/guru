export const getServerUrl = (): string => {
  if(import.meta.env.DEV) {
    return 'http://localhost:3000/'
  } else {
    return 'https://elioground.com/guru-api/'
  }
}
