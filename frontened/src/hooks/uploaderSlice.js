import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image: null,
  fileName: 'Upload Image',
  selectedFile: null,
};

export const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    setImage: {
      reducer: (state, action) => {
        state.image = action.payload;
      },
      prepare: (file) => {
        return { payload: file };
      },
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setSelectedFile: {
      reducer: (state, action) => {
        state.selectedFile = action.payload;
      },
      prepare: (file) => {
        return { payload: file }; 
      },
    },
    resetUpload: () => initialState,
  },
});

export const { setImage, setFileName, setSelectedFile, resetUpload } =
  uploaderSlice.actions;
export default uploaderSlice.reducer;
