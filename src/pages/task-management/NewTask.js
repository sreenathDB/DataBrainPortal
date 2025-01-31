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
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { userTypeObj } from '../../components/common/utils';
import EditContainer from '../../components/common/EditContainer';
import TaskForm from './TaskForm';    
import MyAlert from '../../components/common/Alert';
import { deleteATask, getAllTasks, getATask } from '../../slices/taskSlice';
import { showAlert } from '../../slices/alertSlice';
import { showPopup } from '../../slices/popoverSlice';
import DeletePopover from '../../components/common/DeletePopover';
import { fetchProjectList } from '../../slices/projectSlice';
import { fetchContacts } from '../../slices/contactSlice';
import { fetchCustomerList } from '../../slices/customerSlice';
import { fetchUserList } from '../../slices/userSlice';
const NewTask = () => {

  const dispatch = useDispatch();
  const { taskList, reloadList } = useSelector((state) => state.task);
  const { projectList } = useSelector((state) => state.project);  
  const { customerList } = useSelector((state) => state.customer);
  const { contactList } = useSelector((state) => state.contacts);
  const { userList } = useSelector((state) => state.user);

  console.log("Task List:", taskList);
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
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [drawerStyles, setDrawerStyles] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const dataGridRef = useRef();

  //fetch all tasks
  useEffect(() => { 
    dispatch(getAllTasks());
    dispatch(fetchProjectList())
    dispatch(fetchCustomerList()) 
    dispatch(fetchContacts()) 
    dispatch(fetchUserList()) 
  }, [reloadList]);

  useEffect(() => { 
    if (isEditMode && currentTaskId) {
      dispatch(getATask({ id: currentTaskId }));  
    }
  }, [isEditMode, currentTaskId]);

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
    dispatch(deleteATask({id: id}));
    const alert ={
      open: true,
      message: "Task deleted successfully",
      severity: "success",
    };
    dispatch(showAlert(alert));
    handlePopoverClose(); 
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRowClick = (row) => { 
    setIsEditMode(true);
    setCurrentTaskId(row.id);
    setDrawerOpen(true);
  };

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      renderHeader: () => ( 
        <strong>Actions</strong>
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
          // onClick={() => handleDelete(params.row.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
    { 
      field: 'ticketNumber',   
      headerName: 'Ticket Number', 
      renderHeader: () => ( 
        <strong>Ticket Number</strong>
      ),
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'taskName',   
      headerName: 'Task Name', 
      renderHeader: () => ( 
        <strong>Task Name</strong>
      ),
      renderCell: (params) => {
        const taskName = params.row.taskName;
        const taskNameHebrew = params.row.taskNameHebrew;
        return taskName ? (
          <div>
            <p>{taskName} ({taskNameHebrew})</p>
          </div>
        ) : (
          <p>No task name</p>
        );
      },
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'customer', 
      headerName: 'Customer', 
      renderHeader: () => ( 
        <strong>Customer</strong>
      ),
      renderCell: (params) => {
        const customerId = params.row?.customer?.id;
        const customer = customerList.find(customer => customer.id === customerId);  
        return customer ? (
          <div>
            <p>{customer?.customerName}</p>
          </div>
        ) : (
          <p>No customer name</p>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    { 
      field: 'projectName', 
      headerName: 'Project Name', 
      renderHeader: () => ( 
        <strong>Project Name</strong>
      ),
      renderCell: (params) => {
        const projectId = params.row.projectId;
        const project = projectList.find(project => project.id === projectId);  
        return project ? (
          <div>
            <p>{project.projectName}</p>
          </div>
        ) : (
          <p>No project name</p>
        );
      },
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'contactName', 
      headerName: 'Contact Name', 
      renderHeader: () => ( 
        <strong>Contact Name</strong>
      ),
      renderCell: (params) => {
        const contactId = params.row?.customer?.contactId;
        const contact = contactList.find(contact => contact.id === contactId);  
        return contact ? (
          <div>
            <p>{contact.contactName}</p>
          </div>
        ) : (
          <p>No contact name</p>
        );
      },
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'assignToUser', 
      headerName: 'Assigned User', 
      renderHeader: () => ( 
        <strong>Assigned User</strong>
      ),
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'approvedHours',  
      headerName: 'Approved Hours', 
      renderHeader: () => ( 
        <strong>Approved Hours</strong>
      ),
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'balanceHours',  
      headerName: 'Balance Hours', 
      renderHeader: () => ( 
        <strong>Balance Hours</strong>
      ),
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'createdAt',  
      headerName: 'Created On', 
      renderHeader: () => ( 
        <strong>Created On</strong>
      ),
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'modifiedAt',  
      headerName: 'Modified On', 
      renderHeader: () => ( 
        <strong>Modified On</strong>
      ),
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'createdBy',  
      headerName: 'Created By', 
      renderHeader: () => ( 
        <strong>Created By</strong>
      ),
      flex: 1,
      minWidth: 150, 
    },
    { 
      field: 'modifiedBy',  
      headerName: 'Modified By', 
      renderHeader: () => ( 
        <strong>Modified By</strong>
      ),
      flex: 1,
      minWidth: 150, 
    },
    

  ];

  const rows = users;

  const generateColumnsFromData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const firstColumn = {
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
            onClick={(event) => handleDeleteClick(event,params.row)}
          >
            <Delete />
          </IconButton>
          <DeletePopover anchorEl={anchorEl} handleClose={handlePopoverClose} handleDelete={handleDelete} />
        </Box>
      ),
    }
  
    const keys = Object.keys(data[0]).filter(key => key !== 'id');
    const dataColumn = keys.map(key => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header names
      renderHeader: () => <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>,
      renderCell: (params) => {
        const value = params.row[key];
        if (value === null || value === undefined) {
          return <p>No {key} info</p>;
        }

        if (typeof value === 'object') {
          return Object.keys(value).filter(value => value !== 'id' ).map((k) => (
            <div key={k}>
              <p>{value[k]}</p>
            </div>
          ));   
        // return value ? (
        //   <div>
        //     <p>{value}</p>
        //   </div>
        // ) : (
        //   <p>No {key} info</p>
        // );
        }
        return (
          <div>
            <p>{value}</p>
          </div>
        );
      },
      editable: false,
      flex: 1,
      minWidth: 200,
      
    }));

    const columns = [firstColumn, ...dataColumn];
    return columns;
  };

  // const columns = [
  //   {
  //     field: 'actions',
  //     headerName: '',
  //     renderHeader: () => ( 
  //       <strong></strong>
  //     ),
  //     flex: 1,
  //     minWidth: 150,
  //     renderCell: (params) => (
  //       <Box>
  //         {/* <IconButton
  //           size="small"
  //           variant="contained"
  //           color="primary"
  //         // onClick={() => handleEditClick(params.row)}
  //         >
  //           <Edit />
  //         </IconButton> */}
  //         <IconButton
  //           size="small"
  //           variant="contained"
  //           color="secondary"
  //           onClick={() => handleDelete(params.row.id)}
  //         >
  //           <Delete />
  //         </IconButton>
  //       </Box>
  //     ),
  //   },
  //   { 
  //     field: 'ticketNumber',   
  //     headerName: 'Ticket Number', 
  //     renderHeader: () => ( 
  //       <strong>Ticket Number</strong>
  //     ),
  //     flex: 1,
  //     minWidth: 150, 
  //   },
  //   { 
  //     field: 'taskName',   
  //     headerName: 'Task Name', 
  //     renderHeader: () => ( 
  //       <strong>Task Name</strong>
  //     ),
  //     renderCell: (params) => {
  //       const taskName = params.row.taskName;
  //       const taskNameHebrew = params.row.taskNameHebrew;
  //       return taskName ? (
  //         <div>
  //           <p>{taskName} ({taskNameHebrew})</p>
  //         </div>
  //       ) : (
  //         <p>No task name</p>
  //       );
  //     },
  //     flex: 1,
  //     minWidth: 150, 
  //   },
  //   { 
  //     field: 'customer', 
  //     headerName: 'Customer', 
  //     renderHeader: () => ( 
  //       <strong>Customer</strong>
  //     ),
  //     renderCell: (params) => {
  //       const customer = params.row.customer;
  //       return customer ? (
  //         <div>
  //           <p>{customer.customerName}</p>
  //           <p>{customer.projectType}</p> 
  //         </div>
  //       ) : (
  //         <p>N/A</p>
  //       );
  //     },
  //     flex: 1,
  //     minWidth: 150,
  //   },
  //   { 
  //     field: 'contactName', 
  //     headerName: 'Contact Name', 
  //     renderHeader: () => ( 
  //       <strong>Contact Name</strong>
  //     ),
  //     renderCell: (params) => {
  //       const contactName = params.row.contactName;
  //       return contactName ? (  
  //         <div>
  //           <p>{contactName.contactName}</p>
  //         </div>
  //       ) : ( 
  //         <p>No contact name</p>
  //       );
  //     },
  //     flex: 1,
  //     minWidth: 150, 
  //   },
    
  // ]
  

  
  return (
    <div ref={dataGridRef}>
      <Box padding={1}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} width="100%">
          <MyAlert />
        </Box>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">New Task </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDrawerOpen(true);
                }}
                disableRipple
              >
                Create New Task
              </Button>
            </Box>
            <Box width="100%" height="100%">
              <DataGrid
                rows={taskList}
                // columns={taskList.length > 0 ? generateColumnsFromData(taskList) : columns} 
                columns={columns}
                onRowClick={(rows) => handleRowClick(rows.row)} 
                disableColumnMenu
                disableRowSelectionOnClick
                hideFooterPagination
                getRowId={(row) => row.id}
                showCellVerticalBorder
                showColumnVerticalBorder
                sx={{
                  height: 'calc(100vh - 300px)',  
                }}
              />
            </Box>

          </CardContent>
        </Card>

        <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <TaskForm 
            onClose={() => {
              setDrawerOpen(false)
              setIsEditMode(false); 
              setCurrentTaskId(null);
            }} 
            handleOpenDialog={handleOpenDialog} 
            isEditMode={isEditMode}
          />
        </EditContainer>


      </Box>
    </div>
  );
};

export default NewTask;
