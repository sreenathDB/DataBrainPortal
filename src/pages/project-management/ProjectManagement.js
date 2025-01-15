import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Drawer,
    TextField,
    Typography,
    Box,
    Card,
    CardContent,
    Dialog,
    IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import EditContainer from '../../components/common/EditContainer';
import ContactForm from '../customer-master/contact-details/ContactForm';
import DialogBox from '../../components/common/DialogBox';
import ProjectForm from './ProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import MyAlert from '../../components/common/Alert';
import { deleteAProject, fetchAProject, fetchProjectList } from '../../slices/projectSlice';
import { showAlert } from '../../slices/alertSlice';
import { showPopup } from '../../slices/popoverSlice';
import DeletePopover from '../../components/common/DeletePopover';
import { ProjectTypes } from '../../components/common/utils';
import { fetchCustomerList } from '../../slices/customerSlice';



const ProjectManagement = () => {

    const { reloadList, projectList } = useSelector(state => state.project);
    const dispatch = useDispatch();

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
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [drawerStyles, setDrawerStyles] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [anchorEl, setAnchorEl] = useState(null); 
    const dataGridRef = useRef();

    // Fetch users from backend
    useEffect(() => {
        dispatch(fetchProjectList());
        dispatch(fetchCustomerList());  
    }, [reloadList]);

    useEffect(() => {   
        if (isEditMode && currentProjectId) {      
            dispatch(fetchAProject({id: currentProjectId}));  
        }
    }, [isEditMode, currentProjectId]);    

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
        dispatch(deleteAProject({id: id}));
        const alert ={
            open: true,
            message: "Project deleted successfully",
            severity: "success",
        };
        dispatch(showAlert(alert)); 
        handlePopoverClose();   
    };

    const handleRowClick = (row) => {   
        setIsEditMode(true);
        setCurrentProjectId(row.id);
        setDrawerOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const columns = [
        {
            field: 'actions',
            headerName: '',
            renderHeader: () => (
                <strong></strong>

            ),
            flex: 1,
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
                    <DeletePopover anchorEl={anchorEl} handleClose={handlePopoverClose} handleDelete={handleDelete} />
                </Box>
            ),
            minWidth: 150,
        },
        {
            field: 'projectType',
            headerName: 'Project Type',
            renderHeader: () => (
                <strong>Project Type</strong>

            ),
            renderCell: (params) => {
                return ProjectTypes[params.row.projectType].label;
            },
            flex: 1,
            minWidth: 150
        },
        {
            field: 'fromDate',
            headerName: 'From Date',

            renderHeader: () => (
                <strong>From Date</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'status',
            headerName: 'Status',
            renderHeader: () => (
                <strong>Status</strong>

            ),
            renderCell: (params) => {
                return params.row.status === 1 ? 'Active' : 'Inactive';
            },
            flex: 1,
            minWidth: 150
        },
        {
            field: 'toDate',
            headerName: 'To Date',
            renderHeader: () => (
                <strong>To Date</strong>

            ),
            flex: 1,
            minWidth: 150
        },
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
            field: 'additionalHours',
            headerName: 'Additional Hours',
            renderHeader: () => (
                <strong>Additional Hours</strong>

            ),
            renderCell: (params) => {
                return params.row.additionalHours ? params.row.additionalHours : 'N/A';
            },
            flex: 1,
            minWidth: 150
        },
        {
            field: 'projectName',
            headerName: 'Project Name',
            renderHeader: () => (
                <strong>Project Name</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'projectNameHebrew', 
            headerName: 'Project Name In Hebrew',
            renderHeader: () => (
                <strong>Project Name In English</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'projectMethod',
            headerName: 'Project Method',
            renderHeader: () => (
                <strong>Project Method</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'budget',
            headerName: 'Budget',
            renderHeader: () => (
                <strong>Budget</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'consumedHours',
            headerName: 'Consumed Hours',
            renderHeader: () => (
                <strong>Consumed Hours</strong>

            ),
            renderCell: (params) => {
                return params.row.consumedHours ? params.row.consumedHours : 'N/A';
            },
            flex: 1,
            minWidth: 150
        },
        {
            field: 'balanceHours',
            headerName: 'Balance Hours',
            renderHeader: () => (
                <strong>Balance Hours</strong>

            ),
            renderCell: (params) => {
                return params.row.balanceHours ? params.row.balanceHours : 'N/A';
            },
            flex: 1,
            minWidth: 150
        },

    ];

    const rows = projectList;

    return (

        <Box padding={1}>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2} width="100%">
                <MyAlert />
            </Box>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Project Master </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setDrawerOpen(true);
                            }}
                            disableRipple
                        >
                            Create New Project
                        </Button>
                    </Box>

                    <DataGrid
                        rows={rows}
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


                </CardContent>
            </Card>

            <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <ProjectForm 
                  onClose={() => {
                    setDrawerOpen(false)
                    setIsEditMode(false)    
                    setCurrentProjectId(null)  
                  }}
                  isEditMode={isEditMode}   
                  />
                <DialogBox open={dialogOpen} handleCloseDialog={handleCloseDialog} />
            </EditContainer>


        </Box>
    );
};

export default ProjectManagement;
