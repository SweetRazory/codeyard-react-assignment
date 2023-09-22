import { Col, Row } from "antd"
import { Button } from "components/Button/Button"
import acme from "images/acme.png"
import { FC, useState } from "react"
import { TranslatedText } from "utils/localization/TranslatedText"

export const SignupPanel: FC = () => {
  const [loading] = useState<boolean>(false)

  return (
    <Col flex={"570px"} className="login-panel login">
      <Row
        style={{
          height: "100%",
          width: "100%",
          backdropFilter: "blur(10px)",
          padding: "42px 90px 64px 90px",
        }}
        align={"middle"}
        justify={"center"}
      >
        <Col xs={24} style={{ height: "100%" }}>
          <Row style={{ marginBottom: 30 }}>
            <Col>
              <img style={{ width: 90 }} src={acme} alt="" />
            </Col>
          </Row>

          <Row style={{ marginBottom: 8 }}>
            <Col>
              <h2>
                <TranslatedText code="login.title" />
              </h2>
              <h4 style={{ marginBottom: 14, width: 300 }}>
                <TranslatedText code="login.subtitle" />
              </h4>
            </Col>
          </Row>

          <Row>
            <Button
              text="Log in"
              type="secondary"
              loading={loading}
              onClick={() => {
                throw new Error("Needs implemetation")
              }}
            />
          </Row>
        </Col>
      </Row>
    </Col>
  )
}
