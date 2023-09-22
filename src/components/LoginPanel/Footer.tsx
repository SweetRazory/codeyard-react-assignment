import { EllipsisOutlined } from "@ant-design/icons"
import { Col, Row } from "antd"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { openModal } from "store/modalSlice"
import { i18n } from "utils/localization/i18n"
import { TranslatedText } from "utils/localization/TranslatedText"

export const Footer: FC = () => {
  const dispatch = useDispatch()
  return (
    <Row align="middle" gutter={10} style={{ margin: "32px 0px" }}>
      <Col>
        <p>
          <TranslatedText code="general.trademark" />
        </p>
      </Col>
      <Col>
        <a
          onClick={() =>
            dispatch(
              openModal({
                title: i18n("terms.title"),
                content: i18n("terms.content"),
              })
            )
          }
        >
          <TranslatedText code="general.terms" />
        </a>
      </Col>
      <Col>
        <a
          onClick={() =>
            dispatch(
              openModal({
                title: i18n("privacy.title"),
                content: i18n("privacy.content"),
              })
            )
          }
        >
          <TranslatedText code="general.privacy" />
        </a>
      </Col>
      <Col>
        <EllipsisOutlined
          style={{
            fontSize: 32,
            height: 16,
            overflow: "hidden",
            color: "#A1A1A1",
          }}
        />
      </Col>
    </Row>
  )
}

