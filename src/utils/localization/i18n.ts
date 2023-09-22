import { translations as translationFiles } from "./translations"

const getUserLanguage = () => {
  const userLanguage = navigator.language || navigator.language
  return userLanguage.split('-')[0]
}

const loadLanguage = () => {
  const savedLanguage = localStorage.getItem('language')
  return savedLanguage || getUserLanguage() || process.env.DEFAULT_LANGUAGE
}

export const setLanguage = (language: string) => {
  localStorage.setItem('language', language)
}

export const i18n = (code: string, params = {}) => {
  const language = loadLanguage()
  const translations = translationFiles[language]

  const codeParts = code.split('.')
  let text = translations

  for (const part of codeParts) {
    if (text[part]) {
      text = text[part]
    } else {
      return code
    }
  }

  const interpolate = (text: string, params: { [key: string]: string }) => {
    return text.replace(/{(.*?)}/g, (match, key) => params[key.trim()] || match)
  }

  return interpolate(text, params)
}
