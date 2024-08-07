export interface Forecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

export type Message = {
  sender: string, content: string, sentTime: Date
}