import axios from 'axios';


export let baseUrl = '';

await fetch('connection.json')
    .then(response => response.json())
    .then(data => {
        baseUrl = data.apiUrl;  // Update the exported baseUrl directly
        console.log(baseUrl);   // Verify the value
    })
    .catch(err => console.log(err));



// export const getCustomerLists = async () => {
//     return await axios({
//         method: "GET",
//         url: `${baseUrl}/Customer/List`,
//     })

// }
export const ApiQueryParams = {
    filter: null,
    orderby: null,
    pagesize: null,
    page: null,
    select: null
}
const apiName = {
    GetUsers: "GetUsers",
    InsertUser: "InsertUser",
    UpdateUser: "UpdateUser",
    DeleteUser: "DeleteUser",
    GetCustomers: "GetCustomers",
    InsertCustomer: "InsertCustomer",
    UpdateCustomer: "UpdateCustomer",
    DeleteCustomer: "DeleteCustomer",
    GetContacts: "GetContacts",
    InsertContact: "InsertContact",
    UpdateContact: "UpdateContact",
    DeleteContact: "DeleteContact",
    GetProjects: "GetProjects",
    InsertProject: "InsertProject",
    UpdateProject: "UpdateProject",
    DeleteProject: "DeleteProject",
    GetTasks: "GetTasks",
    InsertTask: "InsertTask",
    UpdateTask: "UpdateTask",
    DeleteTask: "DeleteTask",
    GetTimeSheets: "GetTimeSheets",
    InsertTimeSheet: "InsertTimeSheet",
    UpdateTimeSheet: "UpdateTimeSheet",
    DeleteTimeSheet: "DeleteTimeSheet",
    GetHours: "GetHours",
    InsertHours: "InsertHours",

}
const ConstructApiCall = (ApiName, data = null, QueryParams = ApiQueryParams) => {

    // Construct query parameters
    let queryParams = new URLSearchParams();

    if (QueryParams.filter) queryParams.append("filter", QueryParams?.filter);
    if (QueryParams.orderby) queryParams.append("orderby", QueryParams?.orderby);
    if (QueryParams.pagesize) queryParams.append("pagesize", QueryParams?.pagesize);
    if (QueryParams.page) queryParams.append("page", QueryParams?.page);
    if (QueryParams.select) queryParams.append("select", QueryParams?.select);

    const tempUrl = data ? `${baseUrl}/postdata/${ApiName}` : `${baseUrl}/getdata/${ApiName}`;

    const finalUrl = queryParams.toString() ? `${tempUrl}?${queryParams.toString()}` : `${tempUrl}`;
    console.log("finalUrl", finalUrl);
    return {
        url: finalUrl,
        method: data ? "POST" : "GET",
        body: data ? data : null,
        headers: {
            "Content-Type": "application/json"
        }
    };
};

const getDataFromResponse = (response) => {
    if (response.data) {
        const resultString = response.data[0].resObject[0].result;
        console.log("Result String:", resultString);

        const result = JSON.parse(resultString);
        console.log("Result:", result);
        return result.data;
    }
    return null;
};


//user login
export const userLogin = async (credentials) => {
    return credentials;
}

//Get user list
export const getUserList = async (QueryParams) => {
    const apiCallConfig = ConstructApiCall(apiName.GetUsers, null, QueryParams);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        console.log("Response:", response);

        const extractedData = getDataFromResponse(response);
        return extractedData;
        console.log("Extracted Data:", extractedData);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
};

//get single user
export const getSingleUser = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.GetUsers, obj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}
//Create user
export const createNewUser = async (userObj) => {
    const apiCallConfig = ConstructApiCall(apiName.InsertUser, userObj);
    console.log("API Call Config:", apiCallConfig)


    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Update user
export const updateUser = async (userObj) => {
    const apiCallConfig = ConstructApiCall(apiName.UpdateUser, userObj);
    console.log("API Call Config:", apiCallConfig)


    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

export const deleteUser = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.DeleteUser, obj);
    console.log("API Call Config:", apiCallConfig)


    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return response;
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}


//Get customer list 
export const getCustomerList = async (QueryParams) => {
    const apiCallConfig = ConstructApiCall(apiName.GetCustomers, null, QueryParams);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
};

//Create customer
export const createNewCustomer = async (customerObj) => {
    const apiCallConfig = ConstructApiCall(apiName.InsertCustomer, customerObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
};

//Update customer
export const updateCustomer = async (customerObj) => {
    const apiCallConfig = ConstructApiCall(apiName.UpdateCustomer, customerObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
};

//Get single customer   
export const getSingleCustomer = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.GetCustomers, obj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Delete customer
export const deleteCustomer = async (customerId) => {
    const apiCallConfig = ConstructApiCall(apiName.DeleteCustomer, customerId);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return response;
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}


//Get connection list
export const getConnectionList = async (connectionList) => {
    return connectionList;
}

//Create connection 
export const createNewConnection = async (connectionObj) => {
    return connectionObj;
}

///Get user list
export const getContactList = async (QueryParams) => {
    const apiCallConfig = ConstructApiCall(apiName.GetContacts, null, QueryParams);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        console.log("Response:", response);

        const extractedData = getDataFromResponse(response);
        return extractedData;
        console.log("Extracted Data:", extractedData);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
};

//Create contact
export const createNewContact = async (contactObj) => {
    const apiCallConfig = ConstructApiCall(apiName.InsertContact, contactObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Update contact
export const updateContact = async (contactObj) => {
    const apiCallConfig = ConstructApiCall(apiName.UpdateContact, contactObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Get single contact    
export const getSingleContact = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.GetContacts, obj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Delete contact
export const deleteContact = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.DeleteContact, obj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return response;
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Get project list
export const getProjectList = async (QueryParams) => {

    const apiCallConfig = ConstructApiCall(apiName.GetProjects, null, QueryParams);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Create project
export const createNewProject = async (projectObj) => {
    const apiCallConfig = ConstructApiCall(apiName.InsertProject, projectObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Update project    
export const updateProject = async (projectObj) => {
    const apiCallConfig = ConstructApiCall(apiName.UpdateProject, projectObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Get single project
export const getSingleProject = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.GetProjects, obj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Delete project
export const deleteProject = async (projectId) => {
    const apiCallConfig = ConstructApiCall(apiName.DeleteProject, projectId);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return response;
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}


//Get task list     
export const getTaskList = async (QueryParams) => {
    const apiCallConfig = ConstructApiCall(apiName.GetTasks, null, QueryParams);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }

};

//Create task
export const createNewTask = async (taskObj) => {
    const apiCallConfig = ConstructApiCall(apiName.InsertTask, taskObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }

}

//Update task   
export const updateTask = async (taskObj) => {
    const apiCallConfig = ConstructApiCall(apiName.UpdateTask, taskObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }

}

//Get single task   
export const getSingleTask = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.GetTasks, obj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }

}

//Delete task   
export const deleteTask = async (taskId) => {
    const apiCallConfig = ConstructApiCall(apiName.DeleteTask, taskId);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return response;
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }

}

//Get time sheet list   
export const getTimeSheetList = async (QueryParams) => {
    const apiCallConfig = ConstructApiCall(apiName.GetTimeSheets, null, QueryParams);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        console.log("Response:", response);

        const extractedData = getDataFromResponse(response);
        return extractedData;
        console.log("Extracted Data:", extractedData);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Create time sheet 
export const createNewTimeSheet = async (timeSheetObj) => {
    const apiCallConfig = ConstructApiCall(apiName.InsertTimeSheet, timeSheetObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Update time sheet 
export const updateTimeSheet = async (timeSheetObj) => {
    const apiCallConfig = ConstructApiCall(apiName.UpdateTimeSheet, timeSheetObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Get single time sheet
export const getSingleTimeSheet = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.GetTimeSheets, obj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Delete time sheet
export const deleteTimeSheet = async (timeSheetId) => {
    const apiCallConfig = ConstructApiCall(apiName.DeleteTimeSheet, timeSheetId);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return response;
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Get hours list    
export const getHoursList = async (hoursList) => {
    return hoursList;
}

//Create hours  
export const createNewHours = async (hoursObj) => {
    return hoursObj;
}

