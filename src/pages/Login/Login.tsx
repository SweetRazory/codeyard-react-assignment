import { Col, Row } from "antd"
import { LoginPanel } from "components/LoginPanel/LoginPanel"
import { SignupPanel } from "components/SignupPanel/SignupPanel"
import { FC } from "react"

export const Login: FC = () => {
  return (
    <main>
      <Row justify="center">
        <Col flex={"610px"}>
          <LoginPanel />
        </Col>
        <Col flex={"610px"}>
          <SignupPanel />
        </Col>
      </Row>
    </main>
  )
}
