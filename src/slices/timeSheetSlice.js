import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildTimeSheetObjDTO, buildTimeSheetObjDTOList, timeSheetObjDTO } from '../dto/timesDTO';
import { createNewTimeSheet, deleteTimeSheet, getSingleTimeSheet, getTimeSheetList, updateTimeSheet } from '../components/common/apiCalls';
import { Api_Status } from '../components/common/utils';


const initialState = {
    timeSheetList: [],
    timeSheet: timeSheetObjDTO,
    status: Api_Status.Idle,
    error: null,
    loading: false,
    reloadList: Api_Status.Idle,
};

// Async thunk for creating a time sheet
export const createTimeSheet = createAsyncThunk(
    'timeSheet/createTimeSheet',
    async (timeSheetObj, { rejectWithValue }) => {
        try {
            const timeSheet = await createNewTimeSheet(timeSheetObj);
            const response = buildTimeSheetObjDTO(timeSheet);   
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }           
);

// Async thunk for fetching the time sheet list
export const fetchTimeSheetList = createAsyncThunk(
    'timeSheet/fetchTimeSheetList',
    async (_, { rejectWithValue }) => {
        try {
            const timeSheetList = await getTimeSheetList();
            const response = buildTimeSheetObjDTOList(timeSheetList);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Async thunk for fetching a single time sheet  
export const fetchATimeSheet = createAsyncThunk(
    'timeSheet/fetchATimeSheet',
    async (timeSheetId, { rejectWithValue }) => {
        try {
            const timeSheet = await getSingleTimeSheet(timeSheetId);    
            const response = buildTimeSheetObjDTOList(timeSheet);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);  

//Async thunk for updating a time sheet 
export const updateExistingTimeSheet = createAsyncThunk(
    'timeSheet/updateExistingTimeSheet',
    async (timeSheetObj, { rejectWithValue }) => {
        try {
            const timeSheet = await updateTimeSheet(timeSheetObj);
            const response = buildTimeSheetObjDTOList(timeSheet);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Async thunk for deleting a time sheet     
export const deleteATimeSheet = createAsyncThunk(
    'timeSheet/deleteATimeSheet',
    async (timeSheetId, { rejectWithValue }) => {
        try {
            const timeSheet = await deleteTimeSheet(timeSheetId);
            return timeSheet;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const timeSheetSlice = createSlice({
    name: 'timeSheet',
    initialState: initialState,
    reducers: {
        // deleteTimeSheet: (state, action) => {
        //     state.timeSheetList = state.timeSheetList.filter((timeSheet) => timeSheet.id !== action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimeSheetList.pending, (state) => {   
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
            })
            .addCase(fetchTimeSheetList.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSheetList = action.payload;
                state.status = Api_Status.Success;
            })
            .addCase(fetchTimeSheetList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch time sheet list';   
                state.status = Api_Status.Failed;
            })
            .addCase(createTimeSheet.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(createTimeSheet.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSheet = action.payload;
                state.status = Api_Status.Success;
                state.reloadList = Api_Status.Success;
            })
            .addCase(createTimeSheet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create time sheet';   
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
            })
            .addCase(fetchATimeSheet.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
            })
            .addCase(fetchATimeSheet.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSheet = action.payload;
                state.status = Api_Status.Success;
            })
            .addCase(fetchATimeSheet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch time sheet';   
                state.status = Api_Status.Failed;
            })
            .addCase(updateExistingTimeSheet.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(updateExistingTimeSheet.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSheet = action.payload;
                state.status = Api_Status.Success;
                state.reloadList = Api_Status.Success;
            })
            .addCase(updateExistingTimeSheet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update time sheet';   
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
            })
            .addCase(deleteATimeSheet.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(deleteATimeSheet.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Success;
                state.reloadList = Api_Status.Success;
            })
            .addCase(deleteATimeSheet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete time sheet';   
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
            });

    },
});

// export const { deleteTimeSheet } = timeSheetSlice.actions;  
export default timeSheetSlice.reducer;