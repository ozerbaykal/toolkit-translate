import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "../actions";
 
const initialState = {
    isLoading:false,
    error:null,
    languages:[],
 }
const languages = createSlice({
    name:"languages",
    initialState,

    extraReducers: (builder)=>{
        builder.addCase(getLanguages.pending,(state)=>{
            state.isLoading=true;
        });
        builder.addCase(getLanguages.rejected,(state,action)=>{
            state.error= action.error.message;
            state.isLoading=false;
        })
        builder.addCase(getLanguages.fulfilled,(state,action)=>{
            state.languages=action.payload;
            state.isLoading=false,
            state.error=null
        })
    },

})

export default languages.reducer;

