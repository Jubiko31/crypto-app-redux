import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

const store = configureStore({
    reducer: {
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer,  
        [cryptoApi.reducerPath] : cryptoApi.reducer,
        
    },
});

export default store;