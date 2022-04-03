import { createSlice } from '@reduxjs/toolkit'

export default createSlice({ 
    name: 'cart',
    initialState: {
        cart: localStorage.getItem('cart') 
                ? JSON.parse(localStorage.getItem('cart'))
                : [],
        total: 0
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart = action.payload
        },
        removeCart: (state, action) => {
            state.cart = action.payload
        },
        totalProduct: (state, action) => {
            state.total = action.payload
        },
        resetCart: (state, action) => {
            state.cart = []
            // state.total = 0
        }
    }
})