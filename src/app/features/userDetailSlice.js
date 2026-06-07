import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
    "users/createUser",
    async (user,thunkAPI)=>{
        try{
            const response = await fetch ('https://6a229e9e5c610353286a152c.mockapi.io/users',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(user)
            });
            if(!response.ok){
                throw new Error('Failed to create user!');
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    } 
)

export const showUser = createAsyncThunk(
    "users/showUser",
    async (_,thunkAPI)=>{
        try {
            const response = await fetch('https://6a229e9e5c610353286a152c.mockapi.io/users');
            if(!response.ok){
                throw new Error('Failed to fetch the data');
            }
            const data = await response.json();
            return data;
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id,thunkAPI)=>{
        try {
            const response = await fetch(`https://6a229e9e5c610353286a152c.mockapi.io/users/${id}`,
            {method:'DELETE'}
            );
            if(!response.ok){
                throw new Error('Failed to delete the data');
            }
            return String(id);
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);


//slice

const userDetail=createSlice({
    name:'userDetail',
    initialState:{
        users:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createUser.fulfilled,
                (state,action)=>{
                    state.loading=false;
                    state.users.push(action.payload);
                }
            )
            .addCase(createUser.pending,
                (state)=>{
                    state.loading=true;
                    state.error=null;
                }
            )
            .addCase(createUser.rejected,
                (state,action)=>{
                    state.loading=false;
                    state.error=action.payload;
                }
            )
            .addCase(showUser.fulfilled,
                (state,action)=>{
                    state.loading=false;
                    state.users=action.payload;
                }
            )
            .addCase(showUser.pending,
                (state)=>{
                    state.loading=true;
                    state.error=null;
                }
            )
            .addCase(showUser.rejected,
                (state,action)=>{
                    state.loading=false;
                    state.error=action.payload;
                }
            )
            .addCase(deleteUser.fulfilled,
                (state,action)=>{
                    state.loading=false;
                    state.users=state.users.filter((user)=>user.id!==action.payload);
                }
            )
            .addCase(deleteUser.pending,
                (state)=>{
                    state.loading=true;
                    state.error=null;
                }
            )
            .addCase(deleteUser.rejected,
                (state,action)=>{
                    state.loading=false;
                    state.error=action.payload;
                }
            )
    }
})
export default userDetail.reducer;