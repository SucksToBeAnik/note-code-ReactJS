import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  contentToView: {
    id: string | null;
    type: "CODE" | "NOTE";
  };
  
}

const initialState: InitialState = {
  contentToView: {
    id: null,
    type: "NOTE",
  },
  
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (
      state,
      action: PayloadAction<typeof initialState.contentToView>
    ) => {
      state.contentToView = {
        id: action.payload.id,
        type: action.payload.type,
      };
    },
   
  },
});

export const { setContent } = contentSlice.actions;

export default contentSlice.reducer;
