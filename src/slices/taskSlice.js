import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildTaskDTO, buildTaskListDTO, buildTaskListsDTO, taskDTO } from '../dto/taskDTO';
import { createNewTask, deleteTask, getSingleTask, getTaskList, updateTask } from '../components/common/apiCalls';
import { Api_Status } from '../components/common/utils'; 


// Initial State    
const initialState = {
    taskList: [],
    task: taskDTO,
    status: '',
    loading: false,
    error: null,
    reloadList: Api_Status.Idle,
};  

// Async Thunk for creating a new task  
export const createTask = createAsyncThunk('task/createTask', async (taskObj) => {
    console.log("Creating Task:", taskObj);
    const task = await createNewTask(taskObj);
    const response = await buildTaskListDTO(task);    
    console.log("Processed Task Response:", response);
    return response;
});

// Async Thunk for getting all tasks    
export const getAllTasks = createAsyncThunk('task/getAllTasks', async () => {
    const response = await getTaskList();   
    console.log("Processed Task Response:", response);
    return buildTaskListsDTO(response);     
});

// Async Thunk for getting a single task 
export const getATask = createAsyncThunk('task/getATask', async (obj) => {
    const response = await getSingleTask(obj);   
    console.log("Processed Task Response:", response);
    return buildTaskListDTO(response);     
}); 

// Async Thunk for updating a task  
export const updateExistingTask = createAsyncThunk('task/updateExistingTask', async (taskObj) => {
    console.log("Updating Task:", taskObj);
    const task = await updateTask(taskObj);
    const response = await buildTaskListDTO(task);    
    console.log("Processed Task Response:", response);
    return response;
});

// Async Thunk for deleting a task  
export const deleteATask = createAsyncThunk('task/deleteATask', async (taskObj) => {
    console.log("Deleting Task:", taskObj);
    const task = await deleteTask(taskObj);
    // const response = await buildTaskListDTO(task);    
    console.log("Processed Task Response:", response);
    return task;
}); 



// Slice
const taskSlice = createSlice({
    name: 'task',
    initialState: initialState, 
    reducers: {
        // deleteTask: (state, action) => {
        //     state.taskList = state.taskList.filter((task) => task.id !== action.payload);
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.status = Api_Status.Loading;
                state.loading = true;   
                state.error = null;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = Api_Status.Success;
                state.reloadList = Api_Status.Success;
                state.loading = false;  
                state.task = action.payload;
                console.log("Task Created:", state.task);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error.message || 'Failed to create task'; 
                state.loading = false;
                state.reloadList = Api_Status.Failed; 
            })
            .addCase(getAllTasks.pending, (state) => {
                state.status = Api_Status.Loading;
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.status = Api_Status.Success;
                state.taskList = action.payload;
                state.loading = false;
                console.log("Task List:", state.taskList);
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getATask.pending, (state) => {
                state.status = Api_Status.Loading;
                state.error = null;
                state.loading = true;   
            })
            .addCase(getATask.fulfilled, (state, action) => {
                state.status = Api_Status.Success;
                state.loading = false;
                state.task = action.payload;
                console.log("Task:", state.task);
            })
            .addCase(getATask.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(updateExistingTask.pending, (state) => {
                state.loading = true;
                state.status = Api_Status.Loading;
                state.error = null;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(updateExistingTask.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Success;
                state.reloadList = Api_Status.Success;
                state.task = action.payload;
                console.log("Updated Task:", state.task);   
            })
            .addCase(updateExistingTask.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error.message;
                state.loading = false;
                state.reloadList = Api_Status.Failed;
            })
            .addCase(deleteATask.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;;
            })
            .addCase(deleteATask.fulfilled, (state, action) => {
                state.loading = false;  
                state.status = Api_Status.Succeeded;
                state.reloadList = Api_Status.Succeeded;
                state.error = null;
            })
            .addCase(deleteATask.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error.message || 'Failed to delete task';
                state.loading = false;
                state.reloadList = Api_Status.Failed;
            }); 

           
    },
});

// export const { deleteTask } = taskSlice.actions;
export default taskSlice.reducer;