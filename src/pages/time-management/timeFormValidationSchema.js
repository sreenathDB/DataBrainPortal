import * as yup from 'yup';

const timeFormValidationSchema = yup.object().shape({
    customer: yup.object().required('Customer is required'),
    taskDate: yup.date().required('Task date is required'),
    task: yup.object().required('Task is required'),
    // startTime: yup.string().required('Start time is required'),
    description: yup.string().required('Description is required'),
    // endTime: yup.string().required('End time is required'),
    startTime: yup.string().required('Start time is required'),
    endTime: yup.string()
        .required('End time is required')
        .test('is-after', 'End time must be after start time', function (value) {
          const { startTime } = this.parent;
          if (startTime && value) {
            const start = new Date(`1970-01-01T${startTime}`);
            const end = new Date(`1970-01-01T${value}`);
            return end > start;
          }
          return true;
        }),
    // approvedHours: yup.number().required('Approved hours are required'),
    // remainingHours: yup.number().required('Remaining hours are required'),
    totalTime: yup.number().required('Total time is required'),
    totalWorkingTime: yup.number().required('Total working time is required'),
    contactPerson: yup.object().required('Contact person is required'),
    user: yup.object().required('User is required'),
    internalNotes: yup.string().nullable(),
    status: yup.boolean().required('Status is required'),
    allUsers: yup.boolean().required('All users flag is required'),
});

export default timeFormValidationSchema;