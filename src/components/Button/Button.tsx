import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { FC } from "react"
import "./Button.scss"

interface Props {
  text: string
  loading?: boolean
  onClick: () => void
  type: "primary" | "secondary"
}

export const Button: FC<Props> = ({ text, loading, type, onClick }) => (
  <button
    onClick={onClick}
    className={`custom-button ${type} ${loading ? "loading" : ""}`}
  >
    {loading ? (
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
        }
      />
    ) : (
      text
    )}
  </button>
)
