import { createSlice } from '@reduxjs/toolkit'
import { ModalController } from 'types/modalController'
import { Reducer } from 'types/reducer'

interface OpenModalPayload { title: string, content: string }

const openModalReducer = ({ action }: Reducer<ModalController>) => {
  const { title, content } = action.payload as OpenModalPayload

  return ({
    open: true,
    title: title,
    content: content
  })
}

const closeModalReducer = () => {
  return {
    open: false,
    title: undefined,
    content: undefined
  }
}

export const modalControllerSlice = createSlice({
  name: "modalController",
  initialState: {
    open: false,
    title: undefined,
    content: undefined
  } as ModalController,
  reducers: {
    openModal: (state, action) => openModalReducer({ state, action }),
    closeModal: closeModalReducer
  }
})

export const { openModal, closeModal } = modalControllerSlice.actions
export default modalControllerSlice.reducer