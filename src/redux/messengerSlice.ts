import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define API URL as a constant
const API_URL = 'https://gorest.co.in/public/v1/users';

// Define types for state
interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

interface MessengerState {
    messages: User[];
    page: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state
const initialState: MessengerState = {
    messages: [],
    page: 1,
    status: 'idle',
    error: null,
};

// Async thunk to fetch users/messages
export const fetchMessages = createAsyncThunk('messenger/fetchMessages', async (page: number = 1) => {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch messages');
    }
    const json = await response.json();
    return json.data;
});

// Create slice
const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        incrementPage: (state) => {
            state.page += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = [...action.payload, ...state.messages];
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch messages';
            });
    },
});

// Export actions and reducer
export const { addMessage, incrementPage } = messengerSlice.actions;
export default messengerSlice.reducer;
