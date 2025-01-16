import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Divider, useTheme, Autocomplete, FormControlLabel, IconButton, Avatar, SpeedDial } from '@mui/material'
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
import { ConsultantTypes, ContactPersons, filterProjectByCustomer, Form, getPriorityIcon, Languages, LockStatus, Module, Positions, ProjectName, Status, TaskPriority, TaskStatus, Users, UserTypeArray, userTypeObj } from '../../components/common/utils';
import taskFormValidationSchema from './taskFormValidationSchema';
import { Add, Edit, Person } from '@mui/icons-material';
import PopperComponent from '../../components/common/popper';
import ContactForm from '../../components/common/ContactForm';
import { auto } from '@popperjs/core';
import { createTask } from '../../slices/taskSlice';
import { showAlert } from '../../slices/alertSlice';
import ChatDrawer from '../../components/common/ChatDrawer';
import ChatIcon from '@mui/icons-material/Chat';
import { buildTaskObjectDTO, taskDTO } from '../../dto/taskDTO';



const TaskForm = ({ show, handleClose, handleOpenDialog, onClose, isEditMode }) => {
  const dispatch = useDispatch();
  const  {projectList} = useSelector(state => state.project);  
  const { customerList } = useSelector(state => state.customer);
  const { contactList } = useSelector(state => state.contacts);  
  const { userList } = useSelector(state => state.user); 
  const { activity } = useSelector(state => state.activity);  
  console.log("User List", userList); 
  // const [editedUser, setEditedUser] = useState(user)
  // const [isEditMode, setIsEditMode] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({...taskDTO});
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);


  const theme = useTheme();

  const formik = useFormik({
    initialValues: formData,
    validationSchema: taskFormValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      const taskObj = buildTaskObjectDTO(values, activity);
      console.log("Task Object", taskObj);  
      dispatch(createTask(taskObj));
      const alert = {
        open: true,
        message: 'Task Created Successfully',
        severity: 'success',
      }
      dispatch(showAlert(alert));
      onClose();
    },
  });

  console.log("Formik errors", formik.errors);  

  const toggleDrawer = () => setChatDrawerOpen(!chatDrawerOpen);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Correctly sets the anchor element
    setOpen((prev) => !prev); // Toggles the Popper
    setIsEditContact(false);
  };

  const handleEditButtonClick = (event) => {
    setAnchorEl(event.currentTarget); // Correctly sets the anchor element
    setOpen((prev) => !prev); // Toggles the Popper
    setIsEditContact(true);
  };

  const handleClosePopper = () => {
    setOpen(false);
  };

  const customerColumn = ["Customer Name"];
  const projectColumns = ["Project Name", "Project Type"];
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



  return (
    <Box component="div">
      <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
        <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }} >
          <Typography variant="h6" gutterBottom>
            {isEditMode ? 'Edit Task' : 'Create New Task'}
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
              {isEditMode ? 'Save Changes' : 'Create Task'}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ background: 'black' }} />
      </Box>
      <Box sx={{ ...theme.formControl.formComponent }} component="form" onSubmit={formik.handleSubmit}>

        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="ticketNumber"
              name="ticketNumber"
              label="Ticket Number"
              value={formik.values.ticketNumber}
              onChange={formik.handleChange}
              error={formik.touched.ticketNumber && Boolean(formik.errors.ticketNumber)}
              helperText={formik.touched.ticketNumber && formik.errors.ticketNumber}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
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
                TaskStatus.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }
            </TextField>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
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
              id="module"
              name="module"
              label="Module"
              value={formik.values.module || ''}
              onChange={formik.handleChange}
              error={formik.touched.module && Boolean(formik.errors.module)}
              helperText={formik.touched.module && formik.errors.module}
            >
              {
                Module.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }

            </TextField>
          </Grid> */}
          
          {/* <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              select
              id="form"
              name="form"
              label="Form"
              value={formik.values.form || ''}
              onChange={formik.handleChange}
              error={formik.touched.form && Boolean(formik.errors.form)}
              helperText={formik.touched.form && formik.errors.form}
              disabled={!formik.values.customer}
            >
              {
                Form.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }
            </TextField>
          </Grid> */}
          <Grid item size={{ xs: 12, md: 6 }}>
            {/* <TextField
              fullWidth
              select
              id="projectName"
              name="projectName"
              label="Project Name"
              value={formik.values.projectName || ''}
              onChange={formik.handleChange}
              error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              helperText={formik.touched.projectName && formik.errors.projectName}
              disabled={!formik.values.customer}
            >
              {
                ProjectName.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }
            </TextField> */}
            <AutoCompleteDataGrid
              track="Project"
              label="Select Projects"
              columns={projectColumns}
              rows={projectList.length > 0 ? filterProjectByCustomer(projectList, formik.values.customer?.id) : []}  
              value={formik.values.project || ''}
              onChange={(event, value) => {
                formik.setFieldValue('project', value);
              }}
              getOptionLabel={(option) => option?.label || option?.projectName || ''}
              onBlur={() => formik.setFieldTouched('project', true)}
              error={formik.touched.project && Boolean(formik.errors.project)}
              helperText={formik.touched.project && formik.errors.project}
              disabled={!formik.values.customer}
            />

          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="taskName" 
              name="taskName"
              label="Task"
              value={formik.values.taskName}
              onChange={formik.handleChange}
              error={formik.touched.taskName && Boolean(formik.errors.taskName)}
              helperText={formik.touched.taskName && formik.errors.taskName}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="taskNameHebrew" 
              name="taskNameHebrew"
              label="Task Name In Hebrew"
              value={formik.values.taskNameHebrew}
              onChange={formik.handleChange}
              // error={formik.touched.taskNameHebrew && Boolean(formik.errors.taskNameHebrew)}
              // helperText={formik.touched.taskNameHebrew && formik.errors.taskNameHebrew}
            />
          </Grid>
          {/* <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="file"
              id="attachment"
              name="attachment"
              label="Attachment" // Add a proper label here
              InputLabelProps={{
                shrink: true, // Ensures the label behaves correctly for file input
              }}
              onChange={(event) => {
                // Use formik's setFieldValue to set the file
                formik.setFieldValue("attachment", event.currentTarget.files[0]);
              }}
            // error={formik.touched.attachment && Boolean(formik.errors.attachment)}
            // helperText={formik.touched.attachment && formik.errors.attachment}
            />
          </Grid> */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="priority"
              name="priority"
              label="Priority"
              select
              value={formik.values.priority || ''}
              onChange={formik.handleChange}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
              helperText={formik.touched.priority && formik.errors.priority}
            >
              {
                TaskPriority.map((option) => (
                  <MenuItem key={option} value={option}>
                    {getPriorityIcon(option)} 
                    {option}
                  </MenuItem>
                ))
              }
            </TextField>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="approvedHours"
              name="approvedHours"
              label="Approved Hours"
              value={formik.values.approvedHours}
              onChange={formik.handleChange}
              error={formik.touched.approvedHours && Boolean(formik.errors.approvedHours)}
              helperText={formik.touched.approvedHours && formik.errors.approvedHours}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="balanceHours"
              name="balanceHours"
              label="Balance Hours"
              // value={formik.values.balanceHours}
              defaultValue={10}
              onChange={formik.handleChange}
              // error={formik.touched.balanceHours && Boolean(formik.errors.balanceHours)}
              // helperText={formik.touched.balanceHours && formik.errors.balanceHours}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Autocomplete
              value={formik.values.user || null}
              onChange={(event, value) => {
                formik.setFieldValue('user', value);
              }}
              options={userList.length > 0 ? userList : []} 
              getOptionLabel={(option) =>
                option ? `${option.firstName} ${option.lastName}` : ''
              } 
              onBlur={() => formik.setFieldTouched('user', true)}
              renderOption={(props, option) => (
                <li {...props}>
                  <Avatar
                    src="" // Assuming 'avatar' is the property with the image URL
                    alt={`${option.firstName} ${option.lastName}`}
                    style={{
                      width: 30,
                      height: 30,
                      // borderRadius: '50%',
                      marginRight: 10,
                    }}
                  />
                   {`${option.firstName} ${option.lastName} (${option.userName})`}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User"
                  error={formik.touched.user && Boolean(formik.errors.user)}
                  helperText={formik.touched.user && formik.errors.user}
                />
              )}
            />
            <Button variant='text' color='primary' startIcon={<Person />}>
              Assign to me
            </Button>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <SpeedDial
              ariaLabel="SpeedDial example"
              sx={{ position: 'fixed', bottom: 16, right: 16 }}
              icon={<ChatIcon />}
              direction="up"
              open={false}
              onClick={toggleDrawer}
              onOpen={() => { }}
              onClose={() => { }}
              />
                <ChatDrawer open={chatDrawerOpen} toggleDrawer={toggleDrawer} />
          </Grid>
          <Grid item size={{ xs: 12, md: 12 }}>
            
            <Box component="div" sx={{ height: "auto" }} paddingY={2} mb={2}>
              <Typography variant="h6" gutterBottom>Detail Description</Typography>
              <ReactQuill theme='snow'
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue('description', value)}
                style={{ height: '90px', marginBottom: 16 }}
              />
            </Box>
          </Grid>

        </Grid>
        <PopperComponent open={open} anchorEl={anchorEl}>
          <ContactForm isEditContact={isEditContact} page={"popupScreen"} onClose={handleClosePopper} />
        </PopperComponent>

      </Box>
      <Box component="div" padding={4}></Box>
    </Box>
  )

}

export default TaskForm;
