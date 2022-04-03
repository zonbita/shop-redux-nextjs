import { createSlice } from '@reduxjs/toolkit'

export default createSlice({ 
    name: 'product',
    initialState: {
        products: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
    },
    reducers: {
        addProduct: (state, action) => {
            state.products = action.payload
        },
        queryProduct: (state, action) => {
            state.products = action.payload
        }
    }
})