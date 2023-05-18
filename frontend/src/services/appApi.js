import{createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
//IT21013300
//craete the api

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8070" }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),

     

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
               
            }),
        }),

}),

});

export const {
    useSignupMutation,
    useLoginMutation,
} = appApi;

export default appApi;