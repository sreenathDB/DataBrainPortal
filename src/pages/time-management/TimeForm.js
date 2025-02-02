import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Divider, useTheme, Autocomplete, FormControlLabel, IconButton, Checkbox, Stack, Switch } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormLabel,
    CFormInput
} from '@coreui/react'
import Grid from '@mui/material/Grid2';
import AutoCompleteDataGrid from '../../components/common/AutoCompleteDataGrid';
import { createUser } from '../../slices/userSlice';
import { userDTO } from '../../dto/userDTO';
import { ConsultantTypes, ContactPersons, Form, Languages, LockStatus, Module, Positions, ProjectName, Status, TaskPriority, TaskStatus, Users, UserTypeArray, userTypeObj } from '../../components/common/utils';
import { Add, Edit } from '@mui/icons-material';

import { auto } from '@popperjs/core';
import timeFormValidationSchema from './timeFormValidationSchema';
import { createTimeSheet } from '../../slices/timeSheetSlice';
import MyAlert from '../../components/common/Alert';
import { showAlert } from '../../slices/alertSlice';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { buildTimeSheetObjDTO, timeSheetObjDTO } from '../../dto/timesDTO';


const TimeForm = ({ isEditMode, onClose }) => {
    const dispatch = useDispatch();
    const { customerList } = useSelector((state) => state.customer);
    const { contactList } = useSelector((state) => state.contacts);
    const { taskList } = useSelector((state) => state.task);
    const { timeSheet } = useSelector((state) => state.timeSheet);
    // const [editedUser, setEditedUser] = useState(user)
    // const [isEditMode, setIsEditMode] = useState(false);
    const [isEditContact, setIsEditContact] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ ...timeSheetObjDTO });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const theme = useTheme();

    const formik = useFormik({
        initialValues: formData,
        validationSchema: timeFormValidationSchema,
        onSubmit: (values) => {
            console.log(values);
            const timeSheetObj = buildTimeSheetObjDTO(values);
            console.log("timeSheetObj", timeSheetObj);
            if (isEditMode && timeSheet.length > 0) {
                timeSheetObj.id = timeSheet[0].id;
                // dispatch(updateExistingTimeSheet(timeSheetObj));
                const alert = {
                    open: true,
                    message: "Time sheet updated successfully",
                    severity: "success",
                };
                dispatch(showAlert(alert));
                onClose();
            }else{
                dispatch(createTimeSheet(timeSheetObj));
                const alert = {
                    open: true,
                    message: "Time sheet created successfully",
                    severity: "success",
                };
                dispatch(showAlert(alert));
                onClose();
            }
        }
        });

    console.log("Fomik errors", formik.errors);

    useEffect(() => {
        const { startTime, endTime } = formik.values;

        if (startTime && endTime) {
            // Calculate difference in hours
            const diffInHours = endTime.diff(startTime, 'hour', true); // Diff in fractional hours
            if (diffInHours > 0) {
                formik.setFieldValue('totalTime', diffInHours.toFixed(2)); // Set total time
            } else {
                formik.setFieldValue('totalTime', ''); // Clear total time if invalid
            }
        }
    }, [formik.values.startTime, formik.values.endTime]);



    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };
    const handleClosePopper = () => {
        setOpen(false);
    };

    const customerColumn = ["Customer Name"];
    const autoCompleteDataGridRows = [
        { id: 1, customerName: 'John Doe', projectType: 'Web Development' },
        { id: 2, customerName: 'Jane Smith', projectType: 'Mobile App' },
        { id: 3, customerName: 'Sam Brown', projectType: 'Data Analysis' },
        { id: 4, customerName: 'Alice Johnson', projectType: 'SEO Optimization' },
        { id: 5, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
    ];

    const contactColumns = ["Contact Name"]; // Corrected typo
    const contactRows = [
        { id: 1, contactName: 'John Doe' },
        { id: 2, contactName: 'Jane Smith' },
        { id: 3, contactName: 'Sam Brown' },
        { id: 4, contactName: 'Alice Johnson' },
        { id: 5, contactName: 'Michael Lee' },

    ];

    const userColumns = ["User Name"]; // Corrected typo
    const userRows = [
        { id: 1, contactName: 'John Doe' },
        { id: 2, contactName: 'Jane Smith' },
        { id: 3, contactName: 'Sam Brown' },
        { id: 4, contactName: 'Alice Johnson' },
        { id: 5, contactName: 'Michael Lee' },

    ];

    const taskColumns = ["Task Name"]; // Corrected typo
    const taskRows = [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
        { id: 3, taskName: 'Task 3' },
        { id: 4, taskName: 'Task 4' },
        { id: 5, taskName: 'Task 5' },
    ]



    return (
        <Box component="div">

            <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
                <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }} >
                    <Typography variant="h6" gutterBottom>
                        {isEditMode ? 'Edit Time Sheet' : 'Create New Time Sheet'}
                    </Typography>
                    <Box sx={{ ...theme.formControl.formHeaderButtonContainer }}>
                        <Button
                            onClick={onClose}
                            variant="contained"
                            style={{ marginRight: 8, backgroundColor: '#757575', color: 'white' }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit} >
                            {isEditMode ? 'Save Changes' : 'Create Time Sheet'}
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ background: 'black' }} />
            </Box>
            <Box sx={{ ...theme.formControl.formComponent }} component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        {/* <AutoCompleteDataGrid
                            label="Select Customer"
                            columns={autoCompleteDataGridColumns}
                            rows={autoCompleteDataGridRows}
                            value={formik.values.customer || ''}
                            onChange={(event, value) => {
                                formik.setFieldValue('customer', value);
                            }}
                            onBlur={() => formik.setFieldTouched('customer', true)}
                            error={formik.touched.customer && Boolean(formik.errors.customer)}
                            helperText={formik.touched.customer && formik.errors.customer}
                        /> */}
                        <AutoCompleteDataGrid
                            label="Select Customer"
                            columns={customerColumn}
                            rows={customerList.length > 0 ? customerList : []}
                            value={formik.values.customer || null}
                            onChange={(event, value) => {
                                formik.setFieldValue('customer', value);
                            }}
                            getOptionLabel={(option) => option.label || option.customerName || ''}
                            onBlur={() => formik.setFieldTouched('customer', true)}
                            error={formik.touched.customer && Boolean(formik.errors.customer)}
                            helperText={formik.touched.customer && formik.errors.customer}
                        />
                    </Grid>
                    {/* <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            select
                            id="status"
                            name="status"
                            label="Status"
                            value={formik.values.status || ''}
                            onChange={formik.handleChange}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}
                        >
                            {
                                Status.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))
                            }
                        </TextField>

                    </Grid> */}
                    {/* <Grid item size={{ xs: 12, md: 6 }}>
                        <AutoCompleteDataGrid
                            label="Select Contact Person"
                            columns={contactColumns}
                            rows={contactRows}
                            value={formik.values.contactPerson || ''}
                            onChange={(event, value) => {
                                console.log("value", value);
                                formik.setFieldValue('contactPerson', value);
                            }}
                            onBlur={() => formik.setFieldTouched('contactPerson', true)}
                            error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                            helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                            disabled={false}
                        />
                        <AutoCompleteDataGrid
                            label="Select Contact Person"
                            columns={contactColumns}
                            rows={contactList.length > 0 ? contactList : []}
                            value={formik.values.contactPerson || ''}
                            onChange={(event, value) => {
                                console.log("value", value);
                                formik.setFieldValue('contactPerson', value);
                            }}
                            getOptionLabel={(option) => option.label || option.contactName || ''}
                            onBlur={() => formik.setFieldTouched('contactPerson', true)}
                            error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                            helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                        />
                    </Grid> */}
                    {/* <Grid item size={{ xs: 12, md: 6 }}>
                        <AutoCompleteDataGrid
                            label="Select User"
                            columns={userColumns}
                            rows={userRows}
                            value={formik.values.user || ''}
                            onChange={(event, value) => {
                                console.log("value", value);
                                formik.setFieldValue('user', value);
                            }}
                            onBlur={() => formik.setFieldTouched('user', true)}
                            error={formik.touched.user && Boolean(formik.errors.user)}
                            helperText={formik.touched.user && formik.errors.user}
                            disabled={false}
                        />
                    </Grid> */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <AutoCompleteDataGrid
                            label="Select Task"
                            columns={taskColumns}
                            rows={taskList.length > 0 ? taskList : []}
                            value={formik.values.task || ''}
                            onChange={(event, value) => {
                                console.log("value", value);
                                formik.setFieldValue('task', value);
                            }}
                            getOptionLabel={(option) => option.label || option.taskName || ''}
                            onBlur={() => formik.setFieldTouched('task', true)}
                            error={formik.touched.task && Boolean(formik.errors.task)}
                            helperText={formik.touched.task && formik.errors.task}
                            disabled={false}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="date"
                            id="taskDate"
                            name="taskDate"
                            label="Task Date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.taskDate || ''}
                            onChange={formik.handleChange}
                            error={formik.touched.taskDate && Boolean(formik.errors.taskDate)}
                            helperText={formik.touched.taskDate && formik.errors.taskDate}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }} gap={2}>
                        <Grid container spacing={1}>
                            <Grid item size={{ xs: 12, md: 6 }}>
                                {/* <TextField
                                    fullWidth
                                    id="startTime"
                                    name="startTime"
                                    label="Start Time"
                                    value={formik.values.startTime}
                                    onChange={formik.handleChange}
                                    error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                    helperText={formik.touched.startTime && formik.errors.startTime}
                                /> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Start Time"
                                        name='startTime'
                                        value={formik.values.startTime}
                                        onChange={(newValue) => formik.setFieldValue('startTime', newValue)}
                                    >
                                        {({ inputRef, inputProps, InputProps }) => (
                                            <TextField
                                                fullWidth
                                                inputRef={inputRef}
                                                InputProps={InputProps}
                                                {...inputProps}
                                                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                                helperText={formik.touched.startTime && formik.errors.startTime}
                                            />
                                        )}
                                    </TimePicker>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item size={{ xs: 12, md: 6 }}>
                                {/* <TextField
                                    fullWidth
                                    id="endTime"
                                    name="endTime"
                                    label="End Time"
                                    value={formik.values.endTime}
                                    onChange={formik.handleChange}
                                    error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                    helperText={formik.touched.endTime && formik.errors.endTime}
                                /> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="End Time"
                                        name='endTime'
                                        value={formik.values.endTime}
                                        onChange={(newValue) => formik.setFieldValue('endTime', newValue)}
                                    >
                                        {({ inputRef, inputProps, InputProps }) => (
                                            <TextField
                                                fullWidth
                                                inputRef={inputRef}
                                                InputProps={InputProps}
                                                {...inputProps}
                                                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                                helperText={formik.touched.endTime && formik.errors.endTime}
                                            />
                                        )}
                                    </TimePicker>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }} gap={2}>
                        <Grid container spacing={1}>
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    id="approvedHours"
                                    name="approvedHours"
                                    label="Approved Hours"
                                    value={formik.values.approvedHours}
                                    onChange={formik.handleChange}
                                // error={formik.touched.approvedHours && Boolean(formik.errors.approvedHours)}
                                // helperText={formik.touched.approvedHours && formik.errors.approvedHours}
                                />
                            </Grid>
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    id="remainingHours"
                                    name="remainingHours"
                                    label="Remaining Hours"
                                    value={formik.values.remainingHours}
                                    onChange={formik.handleChange}
                                // error={formik.touched.remainingHours && Boolean(formik.errors.remainingHours)}
                                // helperText={formik.touched.remainingHours && formik.errors.remainingHours}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            id="totalTime"
                            name="totalTime"
                            label="Total Time (Hours)"
                            value={formik.values.totalTime || ''}
                            onChange={formik.handleChange}
                            error={formik.touched.totalTime && Boolean(formik.errors.totalTime)}
                            helperText={formik.touched.totalTime && formik.errors.totalTime}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                    </Grid>
                    {/*<Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            id="totalWorkingTime"
                            name="totalWorkingTime"
                            label="Total Working Time"
                            value={formik.values.totalWorkingTime}
                            onChange={formik.handleChange}
                            error={formik.touched.totalWorkingTime && Boolean(formik.errors.totalWorkingTime)}
                            helperText={formik.touched.totalWorkingTime && formik.errors.totalWorkingTime}
                        />
                    </Grid>*/}
                    {/* <Grid item size={{ xs: 12, md: 6 }}></Grid> */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            id="description"
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            id="internalNotes"
                            name="internalNotes"
                            label="Internal Notes"
                            value={formik.values.internalNotes}
                            onChange={formik.handleChange}
                            error={formik.touched.internalNotes && Boolean(formik.errors.internalNotes)}
                            helperText={formik.touched.internalNotes && formik.errors.internalNotes}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={1}>
                            {/* <Grid item size={{ xs: 12, md: 6 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="allUsers"
                                            name="allUsers"
                                            checked={formik.values.allUsers}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="All Users"
                                />
                            </Grid> */}
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    <Typography>Inactive</Typography>
                                    <Switch
                                        id="status"
                                        name="status"
                                        checked={formik.values.status}
                                        onChange={formik.handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Typography>Active</Typography>
                                </Stack>
                            </Grid>


                            {/* // <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                //     <Typography>Inactive</Typography>
                                //     <Switch
                                //         id="status"
                                //         name="status"
                                //         checked={formik.values.status}
                                //         onChange={formik.handleChange}
                                //         inputProps={{ 'aria-label': 'controlled' }}
                                //     />
                                //     <Typography>Active</Typography>
                                // </Stack> */}
                        </Grid>
                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    id="allUsers"
                                    name="allUsers"
                                    checked={formik.values.allUsers}
                                    onChange={formik.handleChange}
                                />
                            }
                            label="All Users"
                        /> */}
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>

                        <FormControlLabel

                            control={
                                <Checkbox
                                    checked={formik.values.isBillable}
                                    onChange={formik.handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label="Billable"
                        />
                    </Grid>
                    {/* <Grid item size={{ xs: 12, md: 6 }}>
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <Typography>Inactive</Typography>
                            <Switch
                                id="status"
                                name="status"
                                checked={formik.values.status}
                                onChange={formik.handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography>Active</Typography>
                        </Stack>
                    </Grid> */}


                </Grid>

            </Box>
            <Box component="div" padding={4}></Box>
        </Box>
    )

}

export default TimeForm;
