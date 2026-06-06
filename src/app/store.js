import { configureStore } from '@reduxjs/toolkit'
import userDetail from './features/userDetailSlice'

const store = configureStore({
        reducer:{
        app:userDetail
    }
})
export default store;