import { createSlice } from '@reduxjs/toolkit'

export default createSlice({ 
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) 
                ? JSON.parse(localStorage.getItem('user')) : null ,
        token: JSON.parse(localStorage.getItem('token')) 
                ? JSON.parse(localStorage.getItem('token')) : null ,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.info
            state.token = action.payload.accessToken
        },
        logout: (state, action) => {
            state.user = null
            state.token = null
        }
    }
})