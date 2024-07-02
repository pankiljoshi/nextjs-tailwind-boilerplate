import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";


export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API}/contacts/`,
        prepareHeaders: (headers, { getState }) => {
            const cookies = document.cookie.split(";");
            const token = Cookies.get("token")
            let jwtCookie = null;

            cookies.map((cookie) => {
                if (cookie.includes("authToken=")) {
                    jwtCookie = "Bearer " + cookie.split("token=")[1];
                }
                return null;
            });
            if (token) {
                headers.set("authorization", "Bearer " + token);
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: (query) => ({
                url: `/contacts?${query}`,
                method: "GET"
            })
        }),
        getContactsById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET"
            })
        }),
        addContact: builder.mutation({
            query: (body) => ({
                url: `add-contact`,
                method: "POST",
                body: body
            })
        })
    }),
});

export const {
    useGetAllContactsQuery,
    useAddContactMutation,
    useGetContactsByIdQuery
} = contactsApi;
