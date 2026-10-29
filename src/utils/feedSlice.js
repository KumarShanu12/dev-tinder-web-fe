import { createSlice } from "@reduxjs/toolkit";

const feed = createSlice({
    name:'feed',
    initialState:null,
    reducers : {
        addFeed : (state,action) => action.payload,
        removeFeed:(state,action)=> {
            const userFeed =  state.filter((val)=> val._id !== action.payload)
            return userFeed
        }
    }
})


export const {addFeed , removeFeed} = feed.actions;

export default feed.reducer;