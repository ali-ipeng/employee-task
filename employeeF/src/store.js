import { configureStore } from '@reduxjs/toolkit'

import employeeDataSlice from './feature/employeeDataSlice'

export const store = configureStore({
  reducer: {
    EmployeeData : employeeDataSlice
  },
})