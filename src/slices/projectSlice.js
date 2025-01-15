import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildProjectDTO, buildProjectListDTO, projectDTO } from '../dto/projectDTO';
import { createNewProject, deleteProject, getProjectList, getSingleProject, updateProject } from '../components/common/apiCalls';
import { Api_Status } from '../components/common/utils';

const initialState = {
    projectList: [],
    project: projectDTO,
    status: Api_Status.Idle,
    error: null,
    loading: false,
    reloadList: Api_Status.Idle,
};

// Async thunk for fetching the project list
export const fetchProjectList = createAsyncThunk('projects/fetchProjectList', async () => {
    const projects = await getProjectList();
    return buildProjectListDTO(projects);
}); 

// Async thunk for creating a new project
export const createProject = createAsyncThunk('projects/createProject', async (project) => {
    const newProject = await createNewProject(project);
    return buildProjectDTO(newProject);
});

//Async thunk for updating a project    
export const updateExistingProject = createAsyncThunk('projects/updateProject', async (project) => {
    const updatedProject = await updateProject(project);    
    return buildProjectListDTO(updatedProject); 
});

//Async thunk for fetching a project
export const fetchAProject = createAsyncThunk('projects/fetchProject', async (obj) => {
    const project = await getSingleProject(obj);
    return buildProjectListDTO(project);
});

//Async thunk for deleting a project        
export const deleteAProject = createAsyncThunk('projects/deleteProject', async (obj) => {
    const project = await deleteProject(obj);
    console.log("Project deleted:", project);   
    return project;

});

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        // deleteProject: (state, action) => {
        //     state.projectList = state.projectList.filter((project) => project.id !== action.payload);
        // }   
    },
    extraReducers: (builder) => {   
        builder
            .addCase(fetchProjectList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
            })
            .addCase(fetchProjectList.fulfilled, (state, action) => {
                state.loading = false;
                state.projectList = action.payload;
                state.status = Api_Status.Success;
            })
            .addCase(fetchProjectList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch project list';   
                state.status = Api_Status.Failed;
            })
            .addCase(createProject.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
                state.status = Api_Status.Success;
                state.reloadList = Api_Status.Success;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create project';   
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
            })
            .addCase(updateExistingProject.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(updateExistingProject.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
                state.status = Api_Status.Success;
                state.reloadList = Api_Status.Success;
            })
            .addCase(updateExistingProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update project';   
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
            })
            .addCase(fetchAProject.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
            })
            .addCase(fetchAProject.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
                state.status = Api_Status.Success;
            })
            .addCase(fetchAProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch project';   
                state.status = Api_Status.Failed;
            })
            .addCase(deleteAProject.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(deleteAProject.fulfilled, (state, action) => {
                state.loading = false;
                // state.project = action.payload;
                state.status = Api_Status.Success;
                state.reloadList = Api_Status.Success;
            })
            .addCase(deleteAProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete project';   
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
            })
    }
});

// export const { deleteProject } = projectSlice.actions;
export default projectSlice.reducer;