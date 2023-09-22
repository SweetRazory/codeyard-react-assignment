import axios from "axios"

export const post = function <T>(path: string, body: object | string, headers?: { [key: string]: string }): Promise<T> {
  return new Promise((resolve, reject) => {
    axios.post(
      process.env.API_URL + path, body, {
      ...headers,
    }
    ).then((result: { data: unknown }) => {
      resolve(result.data as T)
    }).catch((error: unknown) => {
      console.error(error)

      reject(error)
    })
  })
}