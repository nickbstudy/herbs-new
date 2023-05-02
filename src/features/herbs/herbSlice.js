import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import herbService from './herbService'

const initialState = {
    herbs: [],
    searchTerm: "",
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


// Add new herb
export const addHerb = createAsyncThunk('herbs/addNew', async (herbData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await herbService.addHerb(herbData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update amount (through slider)
export const changeAmount = createAsyncThunk('herbs/changeAmount', async (herbData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await herbService.changeAmount(herbData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete herb
export const deleteHerb = createAsyncThunk('herbs/deleteHerb', async (herbData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await herbService.deleteHerb(herbData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const herbSlice = createSlice({
    name: 'herb',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setSearchTerm: (state, action) => {
            if(action.payload === "" || action.payload === null) {
                state.searchTerm = ""
                return
            }
            state.searchTerm = action.payload
        }

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
        .addCase(deleteHerb.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteHerb.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.herbs = state.herbs.filter(obj => {
                return obj._id !== action.payload.id;
            })
        })
        .addCase(deleteHerb.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(addHerb.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addHerb.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.herbs.push(action.payload)
        })
        .addCase(addHerb.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // .addCase(changeAmount.pending, (state) => {
        //     state.isLoading = true
        // })
        // .addCase(changeAmount.fulfilled, (state, action) => {
        //     state.isLoading = false
        //     state.isSuccess = true
        //     state.herbs
        // })
        .addCase(changeAmount.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const searchTerm = (state) => state.herbs.searchTerm;

export const { reset, setSearchTerm } = herbSlice.actions
export default herbSlice.reducer