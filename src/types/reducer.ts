import { WritableDraft } from "immer/dist/internal"

type State<T> = WritableDraft<T>
type Action = {
  payload: object | string
  type: string
}

export interface Reducer<T> {
  state: State<T>
  action: Action
}