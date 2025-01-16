import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activity: null,
};

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        addActivity: (state, action) => {
            state.activity = action.payload;
        },      
    },
});

export const {addActivity } = activitySlice.actions;

export default activitySlice.reducer;