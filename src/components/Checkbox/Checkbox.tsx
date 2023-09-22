import { Col, Row } from "antd"
import { FC, useCallback, useState } from "react"
import "./Checkbox.scss"

interface Props {
  label: string
  onChange: (value: boolean) => void
}

export const Checkbox: FC<Props> = ({ onChange, label }) => {
  const [checked, setChecked] = useState<boolean>(false)

  const handleCheckboxChange = useCallback(() => {
    const newChecked = !checked
    setChecked(newChecked)
    onChange(newChecked)
  }, [checked, onChange])

  return (
    <Row className="checkbox-row" onClick={handleCheckboxChange} align="middle">
      <Col className={`checkbox ${checked ? "checked" : ""}`}></Col>
      <Col>
        <span>{label}</span>
      </Col>
    </Row>
  )
}
