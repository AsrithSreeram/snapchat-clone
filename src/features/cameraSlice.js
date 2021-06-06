import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.


export const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
      cameraImage: null
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload
    },
    resetCameraImage: (state) => {
        state.cameraImage = null;
      }
  },


});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCamera = (state) => state.camera.cameraImage;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default cameraSlice.reducer;
