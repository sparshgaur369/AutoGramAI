import { duplicateValidation } from "@/lib/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type IntialStateTriggerProps = {
    trigger?: {
        type?: "COMMENT" | "DM"
        keyword?: string
        types?: string[]
        keywords?: string[]
    }
}

const IntialState: IntialStateTriggerProps = {
    trigger: {
        type: undefined,
        keyword: undefined,
        types: [],
        keywords: [],
    },
}

export const AUTOMATION = createSlice({
    name: "automation",
    initialState: IntialState,
    reducers: {
        TRIGGER: (state, action: PayloadAction<IntialStateTriggerProps>) => {
            state.trigger!.types = duplicateValidation(
                state.trigger?.types!,
                action.payload.trigger?.type!,
            )
            return state
        },
    },
})

export const { TRIGGER } = AUTOMATION.actions
export default AUTOMATION.reducer
