import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:'request',
    initialState:null,
    reducers :{
        request : (state,action)=>action.payload,
        removeRequest : (state,action) =>{
            let f = state.filter((val)=> val._id !== action.payload)

            return f
        }

    }
})

export const {request, removeRequest} = requestSlice.actions;

export default requestSlice.reducer;