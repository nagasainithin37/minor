import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios  from "axios";
export const fetchUser=createAsyncThunk('users',async(dt,thunkApi)=>{
    try{
        // console.log("data")
        let response=await axios.post(dt.url,{},{headers:dt.headers})
        let data=response.data
        return data

    }
    catch(e){

        return thunkApi.rejectWithValue('unable to get data'+e.errorMessage)
    }
})



export const userSlice=createSlice(
    {
        name:"user",
        initialState:{"user":[], isPending: false,isSuccess:false ,isError:false, errorMessage:"" },
        reducers:{
            logout:(state,action)=>{
                state.user=[];
                state.isPending=false;
                state.isSuccess=false;
                state.isError=false;
                state.errorMessage=''
            },
            update:(state,action)=>{
                state.user=JSON.parse(action.payload)
            }


        },
        extraReducers:{
            [fetchUser.pending]:(state,action)=>{
                state.user=[];
                state.isPending=true;
                state.isError=false;
                state.isSuccess=false;
                state.errorMessage='';

            },
            [fetchUser.fulfilled]:(state,action)=>{

                state.user=action.payload;
                state.isPending=false;
                state.isError=false;
                state.isSuccess=true;
                state.errorMessage='';


            },
            [fetchUser.rejected]:(state,action)=>{
                state.user=[];
                state.isPending=false;
                state.isError=true;
                state.isSuccess=false;
                state.errorMessage=action.payload;
            }



        }
    }
)

export const {logout,update}=userSlice.actions;

export default userSlice.reducer