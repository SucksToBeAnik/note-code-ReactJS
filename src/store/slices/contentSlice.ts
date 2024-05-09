import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecordModel } from "pocketbase";

interface InitialState {
  contentToView: {
    contentType: "CODE" | "NOTE";
    content: RecordModel | null;
  };
  currentContent: {
    title: string | null;
    body: string | null;
  };
}

const initialState: InitialState = {
  contentToView: {
    contentType: "NOTE",
    content: null,
  },
  currentContent: {
    title: null,
    body: null,
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
        contentType: action.payload.contentType,
        content: action.payload.content,
      };

      state.currentContent = {
        title: action.payload.content?.title,
        body: action.payload.content?.body,
      };
    },
    resetContent: (state) => {
      state.contentToView = {
        contentType: state.contentToView.contentType,
        content: null,
      };

      state.currentContent = {
        title: null,
        body: null,
      };
    },
    updateCurrentContentTitle: (state, action: PayloadAction<string>) => {
      state.currentContent.title = action.payload;
    },
    updateCurrentContentBody: (state, action: PayloadAction<string>) => {
      state.currentContent.body = action.payload;
    },
  },
});

export const {
  setContent,
  resetContent,
  updateCurrentContentTitle,
  updateCurrentContentBody,
} = contentSlice.actions;

export default contentSlice.reducer;
