import { configureStore } from '@reduxjs/toolkit'

import userSlice from './users/userSlice'
import productSlice from './products/productSlice'
import cartSlice from './carts/cartSlice'
import invoiceSlice from './invoices/invoiceSlice'

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        products: productSlice.reducer,
        carts: cartSlice.reducer,
        invoices: invoiceSlice.reducer
    }
})