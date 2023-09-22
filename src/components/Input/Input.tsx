import { Col, Row } from "antd"
import eyehidden from "images/eye-hidden.png"
import eyevisible from "images/eye-visible.png"
import { FC, useEffect, useState } from "react"
import "./Input.scss"

interface Props {
  onChange: (value: string) => void
  value?: string
  error?: string
  label: string
  score?: number
  name: string
  onFocus: () => void
  type: "text" | "password"
}

const PasswordDot: FC<{ size: "small" | "medium" | "large", active: boolean | undefined }> = ({ size, active }) => (
  <Col className={`password-dot ${size} ${active ? "active" : ""}`}>.</Col>
)

const PasswordVisibilityToggle: FC<{
  showPassword: boolean
  onClick: () => void
}> = ({ showPassword, onClick }) => (
  <Col
    className="password-visibility"
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
  >
    <img
      className="visibility-icon"
      src={!showPassword ? eyevisible : eyehidden}
      alt=""
    />
  </Col>
)

const ErrorMessage: FC<{ error: string }> = ({ error }) => (
  <Row className="error-message">
    <Col>{error}</Col>
  </Row>
)

export const InputField: FC<Props> = ({
  onChange,
  value = "",
  label,
  error,
  onFocus,
  name,
  type,
  score
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value, onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(newValue)
  }

  const isPasswordInput = type === "password"

  return (
    <Row className={`input-field ${error ? "error" : ""}`}>
      <Col xs={24}>
        <Row>
          <Col className="input-label">{label}</Col>
        </Row>
        <Row align="middle">
          <Col flex="auto">
            <input
              onFocus={onFocus}
              name={name}
              onChange={handleInputChange}
              value={inputValue}
              type={isPasswordInput && !showPassword ? "password" : "text"}
            />
          </Col>
          {isPasswordInput && (
            <>
              <PasswordVisibilityToggle
                showPassword={showPassword}
                onClick={() => {
                  setShowPassword((state) => !state)
                }}
              />
              <Col>
                <Row justify="center">
                  <PasswordDot active={score == 4} size="small" />
                </Row>
                <Row justify="center">
                  <PasswordDot active={score >= 3} size="small" />
                </Row>
                <Row justify="center">
                  <PasswordDot active={score >= 2} size="medium" />
                </Row>
                <Row justify="center">
                  <PasswordDot active={score >= 1} size="large" />
                </Row>
              </Col>
            </>
          )}
        </Row>
        <hr />
        {!!error && <ErrorMessage error={error} />}
      </Col>
    </Row>
  )
}
