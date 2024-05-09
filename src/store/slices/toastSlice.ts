import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface InitialState {
    toast: {
        msg: string,
        type: "SUCCESS" | "ERROR"
    } | null
}

const initialState: InitialState = {
    toast: null
}


const toastSlice = createSlice({
    name:'toast',
    initialState,
    reducers: {
        setToast: (state, action: PayloadAction<typeof initialState.toast>) => {
            if(action.payload){
                state.toast = {
                    msg: action.payload.msg,
                    type: action.payload.type
                }
            }else{
                state.toast = null
            }
        }
    }
})


export const {setToast} = toastSlice.actions

export default toastSlice.reducer