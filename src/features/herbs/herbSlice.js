import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import herbService from './herbService'

const initialState = {
    herbs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get user herbs
export const getHerbs = createAsyncThunk('herbs/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await herbService.getHerbs(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const herbSlice = createSlice({
    name: 'herb',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHerbs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHerbs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.herbs = action.payload
            })
            .addCase(getHerbs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export const { reset } = herbSlice.actions
export default herbSlice.reducer