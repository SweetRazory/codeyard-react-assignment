import { LoadingOutlined } from "@ant-design/icons"
import { Col, Row, Spin } from "antd"
import { FC } from "react"
import "./LoadingOverlay.scss"

export const LoadingOverlay: FC<{ loading: boolean }> = ({ loading }) => (
  <Row className={`loading-overlay ${loading ? "loading" : ""}`}>
    <Col>
      <Spin
        indicator={
          <LoadingOutlined
            className="spinner"
            style={{ fontSize: 96 }}
            spin
          />
        }
      />
    </Col>
  </Row>
)
