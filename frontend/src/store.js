import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  username: '',
  firstName: '',
  lastName: '',
  userId: null,
};

// Define the user function to handle login and logout actions
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged  = true;
      state.username  = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName  = action.payload.lastName;
      state.userId    = action.payload.userId;
    },
    logout: (state) => {
      state.isLogged  = false;
      state.username  = '';
      state.firstName = '';
      state.lastName  = '';
      state.userId    = null;
    },
  },
});

// Export actions (login / logout)
export const { login, logout } = userSlice.actions;

// Export store
const store = configureStore({
  reducer: userSlice.reducer,
});
export default store;