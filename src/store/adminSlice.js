import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios  from "axios";
export const fetchAllUsers=createAsyncThunk('details',async(dt,thunkApi)=>{
    try{
        console.log("data")
        console.log(dt.url)
        let response=await axios.post(dt.url,{},{headers:dt.headers})
        let data=response.data
        console.log(data)
        return data.data

    }
    catch(e){

        return thunkApi.rejectWithValue('unable to get data '+e.errorMessage)
    }
})



export const adminSlice=createSlice(
    {
        name:"details",
        initialState:{"details":[], isPending: false,isSuccess:false ,isError:false, errorMessage:"" },
        reducers:{
            adminlogout:(state,action)=>{
                state.details=[];
                state.isPending=false;
                state.isSuccess=false;
                state.isError=false;
                state.errorMessage=''
            },
            update:(state,action)=>{
                state.user=JSON.parse(action.payload)
            },
            addBatch:(state,action)=>{
                state.details.push(action.payload)
            },
            delBatch:(state,action)=>{
                let idx=0
                while(state.details[idx].name!==action.payload){
                console.log(idx)
                    console.log(state.details[idx])
                    idx+=1
                }
                

                state.details.splice(idx,1)
            }


        },
        extraReducers:{
            [fetchAllUsers.pending]:(state,action)=>{
                state.details=[];
                state.isPending=true;
                state.isError=false;
                state.isSuccess=false;
                state.errorMessage='';

            },
            [fetchAllUsers.fulfilled]:(state,action)=>{

                state.details=action.payload;
                state.isPending=false;
                state.isError=false;
                state.isSuccess=true;
                state.errorMessage='';


            },
            [fetchAllUsers.rejected]:(state,action)=>{
                state.details=[];
                state.isPending=false;
                state.isError=true;
                state.isSuccess=false;
                state.errorMessage=action.payload;
            }



        }
    }
)

export const {adminlogout,update,addBatch,delBatch}=adminSlice.actions;

export default adminSlice.reducer