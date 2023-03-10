import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setArtisans: (state, action) => {
            if (state.user) {
                state.user.artisans = action.payload.artisans
            } else {
                console.error('Cet artisan n\'existe pas :(')
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post
                return post
            })
        },
    },
})

export const {setMode, setLogin, setLogout, setArtisans, setPosts, setPost} = authSlice.actions
export default authSlice.reducer