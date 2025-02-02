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
import EditContainer from '../../../components/common/EditContainer';
import EditUserModal from '../../user-management/EditUserForm';
import DialogBox from '../../../components/common/DialogBox';
import AutoCompleteDataGrid from '../../../components/common/AutoCompleteDataGrid';
// import ContactForm from './ContactForm';
import ContactForm from '../../../components/common/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { deleteAContact, fetchContacts, fetchSingleContact } from '../../../slices/contactSlice';
import MyAlert from '../../../components/common/Alert';
import { showAlert } from '../../../slices/alertSlice';
import { showPopup } from '../../../slices/popoverSlice';
import DeletePopover from '../../../components/common/DeletePopover';


const ContactMainScreen = () => {
    const dispatch = useDispatch();
    const { contactList, reloadList } = useSelector((state) => state.contacts);
    console.log("contactList: ", contactList);  
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
        message: '',
        severity: 'success',
    });
    const [anchorEl, setAnchorEl] = useState(null);     
    const dataGridRef = useRef();

    // Fetch users from backend
    useEffect(() => {
        dispatch(fetchContacts());
    }, [reloadList]);


    useEffect(() => {
        if (isEditMode && currentUserId) {  
            dispatch(fetchSingleContact({id: currentUserId}));
        }
    }, [isEditMode, currentUserId]);



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
        dispatch(deleteAContact({id: id})); 
        const alert = {
            open: true,
            message: "Contact deleted successfully",
            severity: "success",
        };
        dispatch(showAlert(alert));
        handlePopoverClose();   
    }

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }

    const formik = useFormik({
        initialValues: {
            customer: null,
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleRowClick = (row) => {   
        setDrawerOpen(true);
        setIsEditMode(true);
        setCurrentUserId(row.id);
    }


    const columns = [
        {
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
                    <DeletePopover  anchorEl={anchorEl} handleClose={handlePopoverClose} handleDelete={handleDelete} />
                </Box>
            ),
        },
        {
            field: 'contactName',
            headerName: 'Contact Name',
            renderHeader: () => (
                <strong>Contact Name</strong>
            ),
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            renderHeader: () => (
                <strong>Email</strong>
            ),
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            renderHeader: () => (
                <strong>Phone</strong>
            ),
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'extension',
            headerName: 'Extension',
            renderHeader: () => (
                <strong>Extension</strong>
            ),
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'cellular',
            headerName: 'Cellular',
            renderHeader: () => (
                <strong>Cellular</strong>
            ),
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'position',
            headerName: 'Position',
            renderHeader: () => (
                <strong>Position</strong>
            ),
            flex: 1,
            minWidth: 150,
        },

    ]

    const rows = contactList;

    const autoCompleteDataGridColumns = ["Customer Name", "Project Type"];
    const autoCompleteDataGridRows = [
        { id: 1, customerName: 'John Doe', projectType: 'Web Development' },
        { id: 2, customerName: 'Jane Smith', projectType: 'Mobile App' },
        { id: 3, customerName: 'Sam Brown', projectType: 'Data Analysis' },
        { id: 4, customerName: 'Alice Johnson', projectType: 'SEO Optimization' },
        { id: 5, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
        { id: 6, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
        { id: 7, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
    ];

    return (

        <Box padding={1}>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2} width="100%">
                <MyAlert snackbar={snackbar} onClose={handleCloseSnackbar} />
            </Box>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Contact Person</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setDrawerOpen(true);
                            }}
                            disableRipple
                        >
                            Add New Contact
                        </Button>
                    </Box>
                    <Box component="div" sx={{ width: "100%", maxWidth: "300px", mb: 2 }}>

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
                            height: 'calc(100vh - 380px)',
                        }}
                    />

                </CardContent>
            </Card>

            <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {/* <ContactForm onClose={() => setDrawerOpen(false)} /> */}
                <ContactForm 
                  onClose={() => {
                    setDrawerOpen(false)
                    setIsEditMode(false)
                 }} 
                  isEditMode={isEditMode} 
                />  
                <DialogBox open={dialogOpen} handleCloseDialog={handleCloseDialog} />
            </EditContainer>


        </Box>
    );
};

export default ContactMainScreen;
