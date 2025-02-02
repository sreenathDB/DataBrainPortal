import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Divider, useTheme, Switch, FormControlLabel } from '@mui/material'
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
import userValidationSchema from './userValidationSchema';
import Grid from '@mui/material/Grid2';
import AutoCompleteDataGrid from '../../components/common/AutoCompleteDataGrid';
import { createUser, updateExistingUser } from '../../slices/userSlice';
import { buildUserDTO, userDTO } from '../../dto/userDTO';
import { ConsultantTypes, Languages, LockStatus, Positions, Status, UserTypeArray, userTypeObj } from '../../components/common/utils';
import { showAlert } from '../../slices/alertSlice';


const EditUserModal = ({ onClose, isEditMode, }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log("User:", user);
  // const [editedUser, setEditedUser] = useState(user)
  // const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...userDTO });

  const theme = useTheme();

  const formik = useFormik({
    initialValues: formData,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      const userObj = buildUserDTO(values);
      
      if (isEditMode  && user && user.length > 0) {
        userObj.id = user[0].id;
        console.log("UserObj:", userObj);
        dispatch(updateExistingUser(userObj));
        const alert = {
          open: true,
          message: 'User Updated Successfully!',
          severity: 'success',
        }
        dispatch(showAlert(alert));
        onClose();
      } else {
        console.log(values);
        dispatch(createUser(userObj));
        // handleOpenDialog()
        const alert = {
          open: true,
          message: 'User Created Successfully!',
          severity: 'success',
        }
        dispatch(showAlert(alert));
        onClose();
      }

    },
  });

  console.log("formik", formik.errors);
  console.log("formik", formik.values);

  useEffect(() => {
    if (isEditMode && user && user.length > 0) {
      const userObj = user[0];
      console.log("UserObj:", userObj);

      // Ensure the field value is set only when formik is ready
      if (formik.values.userType !== userObj.userType) {
        formik.setFieldValue('userType', userObj.userType || '');
        formik.setFieldValue('firstName', userObj.firstName || '');
        formik.setFieldValue('lastName', userObj.lastName || '');
        formik.setFieldValue('userName', userObj.userName || '');
        formik.setFieldValue('officeEmailId', userObj.officeEmailId || '');
        formik.setFieldValue('mobile', userObj.mobile || '');
        formik.setFieldValue('password', userObj.password || '');
        formik.setFieldValue('confirmPassword', userObj.password || '');
        formik.setFieldValue('joiningDate', userObj.joiningDate || '');
        formik.setFieldValue('consultantType', userObj.consultantType || '');
        formik.setFieldValue('position', userObj.position || '');
        formik.setFieldValue('dateOfBirth', userObj.dateOfBirth || '');
        formik.setFieldValue('status', userObj.status ? 0 : 1 || 1);
        formik.setFieldValue('language', userObj.language || 0);
        formik.setFieldValue('customer', userObj.customer || '');
        formik.setFieldValue('customerId', userObj.customerId || null);
        formik.setFieldValue('locked', userObj.locked ? 1 : 0 || 0);

      }
    }
  }, [isEditMode, user]);




  const autoCompleteDataGridColumns = ["Customer Name", "Project Type"];
  const autoCompleteDataGridRows = [
    { id: 1, customerName: 'John Doe', projectType: 'Web Development' },
    { id: 2, customerName: 'Jane Smith', projectType: 'Mobile App' },
    { id: 3, customerName: 'Sam Brown', projectType: 'Data Analysis' },
    { id: 4, customerName: 'Alice Johnson', projectType: 'SEO Optimization' },
    { id: 5, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
  ];


  return (
    <Box component="div">
      <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
        <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }} >
          <Typography variant="h6" gutterBottom>
            {isEditMode ? 'Edit User' : 'Create New User'}
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
              {isEditMode ? 'Save Changes' : 'Create User'}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ background: 'black' }} />
      </Box>
      <Box sx={{ ...theme.formControl.formComponent }} component="form" onSubmit={formik.handleSubmit}>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} >
            <TextField
              select
              fullWidth
              label="User Type"
              name="userType"
              value={formik.values.userType || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userType && Boolean(formik.errors.userType)} //grid v2
              helperText={formik.touched.userType && formik.errors.userType}
            >
              {UserTypeArray.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="User Name"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Office Email ID"
              name="officeEmailId"
              value={formik.values.officeEmailId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.officeEmailId && Boolean(formik.errors.officeEmailId)}
              helperText={formik.touched.officeEmailId && formik.errors.officeEmailId}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>
          {
            formik.values.userType === userTypeObj.ADMIN ||
              formik.values.userType === '' ||
              formik.values.userType === null ||
              formik.values.userType === userTypeObj.CONSULTANT ||
              formik.values.userType === userTypeObj.NONE ? (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Joining Date"
                    name="joiningDate"
                    type="date"
                    value={formik.values.joiningDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.joiningDate && Boolean(formik.errors.joiningDate)}
                    helperText={formik.touched.joiningDate && formik.errors.joiningDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Consultant Type"
                    name="consultantType"
                    value={formik.values.consultantType || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.consultantType && Boolean(formik.errors.consultantType)}
                    helperText={formik.touched.consultantType && formik.errors.consultantType}
                  >
                    {ConsultantTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Position"
                    name="position"
                    value={formik.values.position || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.position && Boolean(formik.errors.position)}
                    helperText={formik.touched.position && formik.errors.position}
                  >
                    {Positions.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel control={<Switch checked={formik.values.status }  onChange={(e)=>{formik.setFieldValue("status",e.target.checked)}} 
                    onBlur={formik.handleBlur} />} label="Active" name="status" /> 
                     <FormControlLabel control={<Switch checked={formik.values.locked } onChange={(e)=>{formik.setFieldValue("locked",e.target.checked)}}
                    onBlur={formik.handleBlur}  />} label="Locked" name="locked" /> 
                
                  {/* <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={formik.values.status || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                  >
                    {Status.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField> */}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Language"
                    name="language"
                    value={formik.values.language || 0}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.language && Boolean(formik.errors.language)}
                    helperText={formik.touched.language && formik.errors.language}
                  >
                    {Languages.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
               
                  {/* <TextField
                    select
                    fullWidth
                    label="Locked"
                    name="locked"
                    value={formik.values.locked || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.locked && Boolean(formik.errors.locked)}
                    helperText={formik.touched.locked && formik.errors.locked}
                  >
                    {LockStatus.map((obj) => (
                      <MenuItem key={obj.id} value={obj.id}>
                        {obj.label}
                      </MenuItem>
                    ))}
                  </TextField> */}
                </Grid>
              </>
            ) : (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel control={<Switch checked={formik.values.status }  onChange={(e)=>{formik.setFieldValue("status",e.target.checked)}} 
                    onBlur={formik.handleBlur} />} label="Active" name="status" /> 
                     <FormControlLabel control={<Switch checked={formik.values.locked } onChange={(e)=>{formik.setFieldValue("locked",e.target.checked)}}
                    onBlur={formik.handleBlur}  />} label="Locked" name="locked" /> 
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AutoCompleteDataGrid
                    label="Select Customer"
                    columns={autoCompleteDataGridColumns}
                    rows={autoCompleteDataGridRows}
                    value={formik.values.customer || ''}
                    onChange={(event, value) => {
                      console.log("Value:", value);
                      formik.setFieldValue('customer', value);
                    }}
                    onBlur={() => formik.setFieldTouched('customer', true)}
                    error={formik.touched.customer && Boolean(formik.errors.customer)}
                    helperText={formik.touched.customer && formik.errors.customer}
                  />

                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
               
                  
                </Grid>

              </>
            )
          }

        </Grid>

      </Box>
      <Box component="div" padding={4}></Box>
    </Box>
  )

}

export default EditUserModal
