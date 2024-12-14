import React, { useState } from "react";
import { Box, Paper, TextField, Typography, Button, MenuItem, Grid2 } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createConnection } from "../../slices/connectionSlice";
import { ConnectionTypes, VPNTypes } from "../../components/common/utils";




const ConnectionForm = ({ onSave, onCancel }) => {
  const dispatch = useDispatch()
;  const [connectionData, setConnectionData] = useState({
    connectionType: 'VPN',
    vpnType: '',
    address: '',
    user: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConnectionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(connectionData);
    onCancel();
  };

  const formik = useFormik({
    initialValues: connectionData,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createConnection(values));
      onCancel();
    },
  });

  const renderingFields = (connectionType) => {
    switch (connectionType) {
      case 'VPN':
        return (
          <>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="VPN Type"
                name="vpnType"
                margin="normal"
                value={formik.values.vpnType}
                onChange={formik.handleChange}
                select
              >
                {VPNTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                margin="normal"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="User"
                name="user"
                margin="normal"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid2>
          </>
        );
      case 'Remote Desktop':
        return (
          <>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                margin="normal"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="User"
                name="user"
                margin="normal"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid2>
          </>
        );
      case 'SAP':
        return (
          <>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="User"
                name="user"
                margin="normal"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                value={formik.values.password}  
                onChange={formik.handleChange}
              />
            </Grid2>
          </>
        );
      case 'SQL':
        return (
          <>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="User"
                name="user"
                margin="normal"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid2>
          </>
        );
      default:
        return null;
    }
  }

    return (
      <Paper elevation={3} style={{ padding: '16px', maxWidth: '500px' }}>
        <Typography variant="h6">Add Connection</Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Connection Type"
                name="connectionType"
                margin="normal"
                value={formik.values.connectionType}
                // defaultValue={formik.values.connectionType === '' ? 'VPN' : formik.values.connectionType} 
                onChange={formik.handleChange}
                select
              >
                {ConnectionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            
              {renderingFields(formik.values.connectionType)}
            
          </Grid2>
        </Box>
       
        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          <Button variant="text" style={{ backgroundColor: '#757575', color: 'white' }} onClick={onCancel}>Cancel</Button>
          <Button type="submit" onClick={formik.handleSubmit} variant="contained" color="primary">Save</Button>
        </Box>
      </Paper>
    );
  };

  export default ConnectionForm;
