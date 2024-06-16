// slices/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the user
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Define the initial state type
interface UsersState {
  users: User[];
  loading: boolean;
  value: number;
}

// API call
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/getAllUsers", async (_, thunkApi) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      return thunkApi.rejectWithValue("Failed to fetch users");
    }
    const data: User[] = await response.json();

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("Failed to fetch users");
  }
});

const initialState: UsersState = {
  users: [],
  loading: false,
  value: 10,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users.push(...action.payload);
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      });
  },
});

export const { increment } = userSlice.actions;
export default userSlice.reducer;
