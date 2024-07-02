import { contactsApi } from "@/hooks/contactsHook";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([contactsApi.middleware])
})

setupListeners(store.dispatch);