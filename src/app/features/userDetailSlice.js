import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

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

export const showUsers = createAsyncThunk(
    "users/showUsers",
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
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//get a single user info from api
export const getUser = createAsyncThunk(
    "users/getUser",
    async (id,thunkAPI)=>{
        try {
            const response = await fetch(`https://6a229e9e5c610353286a152c.mockapi.io/users/${id}`);
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

//edit user
export const editUser = createAsyncThunk(
    "users/editUser",
    async (user,thunkAPI)=>{
        try{
            const response = await fetch (`https://6a229e9e5c610353286a152c.mockapi.io/users/${user.id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(user)
            });
            if(!response.ok){
                throw new Error('Failed to update user!');
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    } 
)



//slice

const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        users:[],
        loading:false,
        error:null,
        user:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createUser.fulfilled,
                (state,action)=>{
                    state.users.push(action.payload);
                }
            )
            .addCase(showUsers.fulfilled,
                (state,action)=>{
                    state.users=action.payload;
                }
            )
            .addCase(deleteUser.fulfilled,
                (state,action)=>{
                    state.users=state.users.filter((user)=>user.id!==action.payload);
                }
            )
            .addCase(getUser.fulfilled,
                (state,action)=>{
                    state.user=action.payload;
                }
            )
            .addCase(editUser.fulfilled,
                (state,action)=>{
                    state.users=state.users.map((user)=>user.id===action.payload.id? action.payload:user);
                    state.user=action.payload;
                }
            )

            .addMatcher(
                isPending(createUser,showUsers,deleteUser,getUser,editUser),
                (state)=>{
                    state.loading=true;
                    state.error=null;
                }
            )
            .addMatcher(
                isRejected(createUser,showUsers,deleteUser,getUser,editUser),
                (state,action)=>{
                    state.loading=false;
                    state.error=action.payload;
                }
            )
            .addMatcher(
                isFulfilled(createUser,showUsers,deleteUser,getUser,editUser),
                 (state)=>{
                    state.loading=false;
                }
            )
    }
})
export default userSlice.reducer;