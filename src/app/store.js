import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userDetailSlice'

const store = configureStore({
        reducer:{
        app:userSlice
    }
})
export default store;