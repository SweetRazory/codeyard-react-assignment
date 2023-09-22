import { ReactElement } from "react"
import { i18n } from "./i18n"

interface Props {
  code: string
  params?: { [key: string]: string }
  props?: Record<string, unknown>
}

export const TranslatedText = ({ code, params, ...props }: Props): ReactElement<HTMLSpanElement> => {
  const translatedText = i18n(code, params)

  return <span {...props}>{translatedText}</span>
}