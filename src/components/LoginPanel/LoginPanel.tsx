import { Col, Row, notification } from "antd"
import { LoadingOverlay } from "components/LoadingOverlay/LoadingOverlay"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleLoading } from "store/settingsSlice"
import { RootState } from "store/store"
import { setUser } from "store/userSlice"
import { i18n } from "utils/localization/i18n"
import { passwordChecker } from "utils/passwordChecker"
import { post } from "utils/request"
import { Footer } from "./Footer"
import { LoginFormFields } from "./LoginFormFields"
import "./LoginPanel.scss"

export interface FormData {
  user: {
    email: string
    password: string
  }
  remember: boolean
}

export const LoginPanel: FC = () => {
  const [formData, setFormData] = useState<FormData | undefined>(undefined)
  const { loading, formCheck } = useSelector<RootState>(state => state.settings) as Record<string, boolean>
  const [error, setError] = useState<{ email?: string; password?: string }>({})
  const [passwordScore, setPasswordScore] = useState(0)
  const dispatch = useDispatch()
  const setLoading = (state: boolean) => dispatch(toggleLoading(state))

  const handleEmailChange = (email: string) => {
    setFormData((prevData) => ({
      ...prevData,
      user: { ...prevData?.user, email },
    }))
  }

  const handlePasswordChange = (password: string) => {
    if (password) {
      const score = passwordChecker(password)

      setPasswordScore(score)
    } else {
      setPasswordScore(0)
    }

    setFormData((prevData) => ({
      ...prevData,
      user: { ...prevData?.user, password },
    }))
  }

  const handleRememberChange = (checked: boolean) => {
    setFormData((prevData) => ({ ...prevData, remember: checked }))
  }

  interface Response {
    result: {
      id: number
      email: string
      name: string
      address: string
    }
  }

  interface ResponseError {
    result: {
      error: string
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkFormData = () => {
    if (!formData || !formData.user || typeof formData.user !== 'object') {
      setError({
        email: i18n("signup.error.emptyEmail"),
        password: i18n("signup.error.emptyPassword"),
      })
      return false
    }

    const keys = ["email", "password"]
    const missingKeys = []

    for (const key of keys) {
      if (!(key in formData.user) || formData.user[key] === "") {
        missingKeys.push(key)
      }
    }

    if (missingKeys.length > 0) {
      setError({
        ...missingKeys.reduce((errors, key) => {
          errors[key] = i18n(`signup.error.empty${key.charAt(0).toUpperCase() + key.slice(1)}`)
          return errors
        }, {}),
      })
      return false
    }

    return true
  }




  const handleSubmit = async () => {
    setLoading(true)
    try {
      /**
       * Az API response/feltetel amire az adott response megjelenik nem fuggnek ossze,
       * pl ha nem adok meg jelszot, akkor invalid passwordot kapok vissza, ami egyben igaz
       * mert nem jo jelszot adtam meg, de egyben nem is igaz,
       * elvegre meg se adtam a jelszot, es pl missing passwordot kellene visszaadni
       * 
       * Eppen ezert csinaltam egy kis ellenorzo functiont, ami api keres elott leellenorzi hogy
       * valami hianyzik e a request bodybol
       * */

      if (formCheck && !checkFormData()) {
        setLoading(false)
        return
      }

      const response = await post<Response | ResponseError>("/authenticate", {
        data: {
          email: formData.user.email,
          password: formData.user.password,
        },
      })

      if ("error" in response.result) {
        const errorResponse = response as ResponseError
        const { error: errorMessage } = errorResponse.result

        {
          /*A forditasos util miatt backendrol altalaban error codekat szoktam visszakuldeni, pl error.invalidPassword, vagy error.invalidEmail, es a tobbi helyhez hasonloan i18n(...) modon tennem be az error uzenetet*/
        }
        if (errorMessage.includes("Invalid password"))
          setError({ password: i18n("signup.error.password") })

        if (errorMessage.includes("Unknown user"))
          notification.error({ message: i18n("signup.error.user") })

        if (errorMessage.includes("Invalid e-mail"))
          setError({ email: i18n("signup.error.email") })
      } else {
        const responseData = response as Response
        dispatch(
          setUser({ user: responseData.result, remember: formData.remember })
        )
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <Col className="login-panel">
      <LoadingOverlay loading={loading} />

      <Row style={{ height: "100%" }} justify="center" align="bottom">
        <Col>
          <Row align="middle" justify="center">
            <LoginFormFields
              resetError={(inputField) => setError({ ...error, [inputField]: undefined })}
              loading={loading}
              onSubmit={handleSubmit}
              formData={formData}
              error={error}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onRememberChange={handleRememberChange}
              passwordScore={passwordScore}
            />
          </Row>

          <Footer />
        </Col>
      </Row>
    </Col>
  )
}
