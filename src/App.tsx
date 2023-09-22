import { BulbOutlined, CloudOutlined, CloudSyncOutlined, FileOutlined, FileProtectOutlined, SettingOutlined } from "@ant-design/icons"
import { FloatButton, Modal, Tooltip, message } from "antd"
import { Login } from "pages/Login/Login"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { closeModal } from "store/modalSlice"
import { toggleFormCheck, toggleLoading } from "store/settingsSlice"
import { RootState } from "store/store"
import { ModalController } from "types/modalController"
import { User } from "types/user"
import { i18n } from "utils/localization/i18n"


const App = () => {
  const user = useSelector<RootState>((state) => state.user) as User
  const settings = useSelector<RootState>((state) => state.settings) as Record<string, boolean>
  const modalController = useSelector<RootState>((state) => state.modalController) as ModalController
  const [dark, setDark] = useState(false)
  const dispatch = useDispatch()

  const ToggleButton = ({ title, isTrue, TrueIcon, FalseIcon, onClick }) => {
    return (
      <Tooltip color={dark ? "blue" : "black"} placement="left" title={title}>
        <FloatButton onClick={onClick} icon={!isTrue ? FalseIcon : TrueIcon} />
      </Tooltip>
    )
  }

  useEffect(() => {
    if (user) {
      message.success(i18n("notification.login", { name: user.name }))
    }
  }, [user])

  const toggleBackground = () => {
    document.querySelector("body").style.setProperty("--background-color", dark ? "#FFF" : "#000")

    setDark(state => !state)
  }

  return (
    <BrowserRouter>
      {/*Esetleg ide egy rendes modal controllert csinalhatnek, es akkor pl renderModal["terms"] kent meghivhatnam a dolgot stbstb*/}
      <Modal
        centered
        width={500}
        onOk={() => dispatch(closeModal())}
        onCancel={() => dispatch(closeModal())}
        open={modalController.open}
        title={modalController.title}
      >
        {modalController.content}
      </Modal>

      <FloatButton.Group type="primary" trigger="hover" icon={<SettingOutlined />}>
        <ToggleButton
          title="Toggle background color"
          isTrue={dark}
          TrueIcon={<BulbOutlined />}
          FalseIcon={<CloudOutlined />}
          onClick={toggleBackground}
        />
        <ToggleButton
          title="Toggle loading state"
          isTrue={settings.loading}
          TrueIcon={<CloudSyncOutlined />}
          FalseIcon={<CloudOutlined />}
          onClick={() => dispatch(toggleLoading(!settings.loading))}
        />
        <ToggleButton
          title="Toggle form data check"
          isTrue={settings.formCheck}
          TrueIcon={<FileProtectOutlined />}
          FalseIcon={<FileOutlined />}
          onClick={() => dispatch(toggleFormCheck())}
        />
      </FloatButton.Group>

      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
