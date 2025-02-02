import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Drawer,
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Dialog,
  IconButton,
   
} from '@mui/material';
import { DataGrid,  } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import EditContainer from '../../components/common/EditContainer';
import EditUserModal from './EditUserForm';
import DialogBox from '../../components/common/DialogBox';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAUser, fetchSingleUser, fetchUserList } from '../../slices/userSlice';
import { Positions, ProjectTypes, UserTypeArray, userTypeObj } from '../../components/common/utils';
import MyAlert from '../../components/common/Alert';
import { showAlert } from '../../slices/alertSlice';
import { showPopup } from '../../slices/popoverSlice';
import DeletePopover from '../../components/common/DeletePopover';
import { CustomToolbar } from '../../components/common/CustomToolbar';
import {themeStyles} from '../../layout/theme';

const UserManagement = () => {

  const dispatch = useDispatch();
  const { userList, status,reloadList } = useSelector((state) => state.user);
  console.log("User List:", userList);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    country: '',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [drawerStyles, setDrawerStyles] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const dataGridRef = useRef();
  const [filterModel, setFilterModel] = useState({
    items: [{ field: 'status', operator: 'equals', value: 'Active' }]
  })

 

  // Fetch users from backend
  useEffect(() => {
    
    dispatch(fetchUserList());
  
  }, [users,reloadList]);

  useEffect(() => {
    if (isEditMode && currentUserId) {
      dispatch(fetchSingleUser({id: currentUserId}));
    }
  }, [isEditMode])

  // Calculate Drawer Position and Height
  useEffect(() => {
    if (dataGridRef.current) {
      const rect = dataGridRef.current.getBoundingClientRect();
      setDrawerStyles({
        top: rect.top,
        height: `calc(100vh - ${rect.top}px)`,
      });
    }
  }, [users, drawerOpen]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  }
  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  const handleDeleteClick = (event, row) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget); // Capture the button element as anchorEl
    dispatch(showPopup(row));
  }

  const handlePopoverClose = (event, reason) => {
    setAnchorEl(null); // Reset the anchorEl to close the popover 
  };

  const handleDelete = (id) => {
    dispatch(deleteAUser({id: id}));
    const alert = {
      open: true,
      message: "User deleted successfully",
      severity: "success"
    }
    dispatch(showAlert(alert));
    handlePopoverClose();
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRowClick = (row) => {
    // navigate("/reportDefinitions", { state: { row: row } })
    setDrawerOpen(true);
    setIsEditMode(true);
    setCurrentUserId(row.id);
  }

  const columns = [
   
    {
      field: 'userType',
      headerName: 'User Type',
      renderHeader: () => <strong>User Type</strong>,
      flex: 1,
      minWidth: 150 ,
      renderCell: (params) => ( 
        <div>
          {UserTypeArray[params.value].label} 
          </div>
      ),
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      renderHeader: () => <strong>First Name</strong>,
      flex: 1,
      minWidth: 150 
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      renderHeader: () => <strong>Last Name</strong>,
      flex: 1,
      minWidth: 150 
    },
    {
      field: 'userName',
      headerName: 'User Name',
      renderHeader: () => <strong>User Name</strong>,
      flex: 1,
      minWidth: 150 
    },
    {
      field: 'officeEmailId',
      headerName: 'Office Email Id',
      renderHeader: () => <strong>Office Email Id</strong>,
      flex: 1,
      minWidth: 150 
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      renderHeader: () => <strong>Mobile</strong>,
      flex: 1,
      minWidth: 150 
    },
    // {
    //   field: 'password',
    //   headerName: 'Password',
    //   renderHeader: () => <strong>Password</strong>,
    //   flex: 1,
    //   minWidth: 150 
    // },
    {
      field: 'customer',
      headerName: 'Customer',
      renderHeader: () => (
        <strong>Customer</strong>

      ),
      renderCell: (params) => {

        const customer = params.row.customer;
        return customer ? (
          <div>
            <p>{customer.customerName}</p>
            <p>{ProjectTypes[customer.projectType].label}</p>
          </div>
        ) : (
          <p>N/A</p>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'joiningDate',
      headerName: 'Joining Date',
      renderHeader: () => <strong>Joining Date</strong>,
      flex: 1,
      minWidth: 150 
    },
    {
      field: 'position',
      headerName: 'Position',
      renderHeader: () => <strong>Position</strong>,
      flex: 1,
      minWidth: 150 ,
      renderCell: (params) => (
        <div>
          {Positions[params.value].label}
        </div>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => <strong>Status</strong>,
      renderCell: (params) => (
        params.row.status ? (
          
        <div>
          <p>Active</p>
        </div>
          ) : (
            <p>Inactive</p>
          )
      ),
      flex: 1,
      minWidth: 150 
    },
    {
      field: 'actions',
      headerName: '',
       
      flex: 1,
      minWidth: 70,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            variant="contained"
            color="primary"
            style={{ cursor: 'pointer' }}
          // onClick={() => handleEditClick(params.row)}
          >
            {/* <Edit /> */}
          </IconButton>
          <IconButton
            size="small"
            variant="contained"
            color="secondary"
            style={{ cursor: 'pointer' }}
            onClick={(event) => handleDeleteClick(event, params.row)}
          >
            <Delete />
          </IconButton>
          <DeletePopover anchorEl={anchorEl} handleDelete={handleDelete} handleClose={handlePopoverClose} />
        </Box>
      ),
      cellClassName: 'stickyRightColumn', // Apply the sticky class
      headerClassName: 'stickyRightColumn', // Apply the sticky class to the header
    },
    
  ];

  const rows = users;
  const classes = themeStyles();
  const generateColumnsFromData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const actionField = {
      field: 'actions',
      headerName: '',
      renderHeader: () => (
        <strong></strong>
      ),
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            variant="contained"
            color="primary"
          // onClick={() => handleEditClick(params.row)}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            variant="contained"
            color="secondary"
            onClick={(event) => handleDeleteClick(event, params.row)}
          >
            <Delete />
          </IconButton>
          <DeletePopover anchorEl={anchorEl} handleDelete={handleDelete} handleClose={handlePopoverClose} />
        </Box>
      ),
    }
    const keys = Object.keys(data[0]).filter(key => key !== 'id');
    const gridColumns = keys.map(key => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header names
      renderHeader: () => <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>,
      editable: false,
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {

        if (params.row.userType === userTypeObj.CUSTOMER && key === "customer") {
          const customer = params.row[key];
          return customer ? (
            <div>
              <p>{customer.customerName}</p>
              <p>{customer.projectType}</p>
            </div>
          ) : (
            <p>N/A</p>
          );
        }
        return params.row[key];
      },
    }));
    const columns = [actionField, ...gridColumns];
    return columns;
  };

   
  
  //MUI DataGrid 
  return (
    <div ref={dataGridRef}>
      <Box padding={1}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2} width="100%">
          <MyAlert snackbar={snackbar} onClose={handleCloseSnackbar} />
        </Box>

        <Card>
          <CardContent>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">User Management</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDrawerOpen(true);
                }}
                disableRipple
              >
                Create User
              </Button>
            </Box>
            <Box width="100%" height="100%">
             
              <DataGrid
                rows={userList}
                columns={columns}
                onRowClick={(rows) => handleRowClick(rows.row)}
                disableColumnMenu
                disableRowSelectionOnClick
                hideFooterPagination
                getRowId={(row) => row.id}
                showCellVerticalBorder
                showColumnVerticalBorder
                
                disableColumnReorder
                sx={{
                  height: 'calc(100vh - 300px)',
                }}
                // filterModel={filterModel}
                // onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                slots={{ 
                  toolbar: CustomToolbar,
                }}
                initialState={{
                  sorting: {
                      sortModel: [{ field: 'ModifiedOn', sort: 'desc' }]
                  },
                  pagination: { paginationModel: { pageSize: 50 } },
              }}
              getCellClassName={(params) =>
                params.field === 'actions' ? classes.stickyRightColumn : ''
              }
              getColumnHeaderClassName={(params) =>
                params.field === 'actions' ? classes.stickyRightColumn : ''
              }
              />
            </Box>

          </CardContent>
        </Card>

        <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <EditUserModal 
            onClose={() => {
            setDrawerOpen(false)
            setIsEditMode(false)
            }} 
            // handleOpenDialog={handleOpenDialog} 
            isEditMode={isEditMode} 
          />
          {/* <DialogBox open={dialogOpen} handleCloseDialog={handleCloseDialog} /> */}
        </EditContainer>


      </Box>
    </div>
  );
};

export default UserManagement;
