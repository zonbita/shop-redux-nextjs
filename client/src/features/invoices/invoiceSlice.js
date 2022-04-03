import { createSlice } from '@reduxjs/toolkit'

export default createSlice({ 
    name: 'invoice',
    initialState: {
        invoice: localStorage.getItem('invoice') 
                ? JSON.parse(localStorage.getItem('invoice'))
                : [],
    },
    reducers: {
        addInvoice: (state, action) => {
            state.products = action.payload
        },
        resetInvoice: (state, action) => {
            state.invoice = []
        }
    }
})