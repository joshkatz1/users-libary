import { IUpsertUser, User ,UserState } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export const API_URL = "https://randomuser.me/api";

const getUsers = async () => {
    const response = await fetch(`${API_URL}/?results=10`);
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  }



const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
};

export const  fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await getUsers();
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    upsertUser(state, action: PayloadAction<IUpsertUser>) {
      const userIdx = state.users.findIndex((user) => {
        return user.login.uuid === action.payload.id;
      });
      const user = state.users[userIdx];

      const newUser: User = {
        name: {
          title: user?.name?.title || "",
          first: action.payload.firstName,
          last: action.payload.lastName,
        },
        location: {
          street: {
            number: action.payload.streetNumber,
            name: action.payload.streetName,
          },
          city: action.payload.city,
          country: action.payload.country,
        },
        email: action.payload.email,
        login: {
          uuid: action.payload.id,
        },
        picture: {
          medium: user?.picture?.medium ,
        },
      };

      if (user) {
        
        state.users[userIdx] = newUser;
      } else {
        
        state.users.push(newUser);
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users.splice(
        state.users.findIndex((user) => user.login.uuid === action.payload),
        1
      );
    },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { actions: userActions, reducer: usersReducer } = userSlice;

export { userActions, usersReducer };
