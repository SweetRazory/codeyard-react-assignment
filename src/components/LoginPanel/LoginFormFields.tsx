import { Col, Row } from "antd"
import { Button } from "components/Button/Button"
import { Checkbox } from "components/Checkbox/Checkbox"
import { InputField } from "components/Input/Input"
import { FC } from "react"
import { TranslatedText } from "utils/localization/TranslatedText"
import { FormData } from "./LoginPanel"

interface Props {
  formData: FormData | undefined
  onEmailChange: (email: string) => void
  onPasswordChange: (password: string) => void
  onRememberChange: (checked: boolean) => void
  resetError: (input: string) => void
  passwordScore: number
  onSubmit: () => void
  loading: boolean
  error?: {
    email?: string
    password?: string
  }
}

export const LoginFormFields: FC<Props> = ({
  loading,
  formData,
  resetError,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  passwordScore,
  error,
}) => (
  <Col className="panel-content">
    <Row style={{ marginBottom: 16 }}>
      <Col>
        <h1 style={{ marginBottom: 18 }}>
          <TranslatedText code="signup.title" />
        </h1>
        <h6>
          <TranslatedText code="signup.subtitle" />
        </h6>
      </Col>
    </Row>

    <InputField
      type="text"
      onFocus={() => resetError("email")}
      name="email"
      label="Email"
      error={error?.email}
      onChange={onEmailChange}
      value={formData?.user?.email}
    />

    <InputField
      type="password"
      onFocus={() => resetError("password")}
      name="password"
      label="Password"
      error={error?.password}
      score={passwordScore}
      onChange={onPasswordChange}
      value={formData?.user?.password}
    />

    <Checkbox onChange={onRememberChange} label="Remember me." />

    <Row style={{ marginTop: 20 }} align="middle" justify="end">
      <Col>
        <Button
          text="Sign up"
          type="primary"
          loading={loading}
          onClick={onSubmit}
        />
      </Col>
    </Row>
  </Col>
)