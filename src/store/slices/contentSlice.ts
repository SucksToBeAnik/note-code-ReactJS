import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecordModel } from "pocketbase";


export type CodeLanguage = "javascript" | "python" | "typescript"

interface InitialState {
  contentToView: {
    contentType: "CODE" | "NOTE";
    content: RecordModel | null;
  };
  currentContent: {
    title: string | null;
    body: string | null;
    language?: CodeLanguage
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
        language: action.payload.content?.language,
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
        language: undefined
      };
    },
    updateCurrentContentTitle: (state, action: PayloadAction<string>) => {
      state.currentContent.title = action.payload;
    },
    updateCurrentContentBody: (state, action: PayloadAction<string>) => {
      state.currentContent.body = action.payload;
    },
    updateCurrentContentLanguage: (state, action: PayloadAction<CodeLanguage>)=>{
      state.currentContent.language = action.payload
    }
  },
});

export const {
  setContent,
  resetContent,
  updateCurrentContentTitle,
  updateCurrentContentBody,
  updateCurrentContentLanguage
} = contentSlice.actions;

export default contentSlice.reducer;
