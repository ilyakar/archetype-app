import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DailyReflectionData {
  score: number
  summary: string
  flag?: string
}

export interface UserState {
  personalValues: string
  dailyReflectionResponse1: string
  dailyReflectionResponse2: string
  dailyReflectionSubmittedDate?: Date
  dailyReflectionData?: DailyReflectionData
}

const initialState: UserState = {
  personalValues: '',
  dailyReflectionResponse1: '',
  dailyReflectionResponse2: '',
  dailyReflectionSubmittedDate: undefined,
  dailyReflectionData: undefined
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateUser: (state, { payload }: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...payload
      }
    },
    resetUser: () => {
      return initialState
    }
  }
})

const { actions, reducer } = userSlice
const { updateUser, resetUser } = actions

export { updateUser, resetUser }
export default reducer
