import { buildAttachmentObjectListDTO } from "./attachmentDTO";
import { buildTaskChatListObjectDTO } from "./chatNotesDTO";

export const taskDTO = {   
    id: 0,
    ticketNumber: null,
    customer: null,
    // customerId: null,   
    // module: null,
    // contactName: null,
    // contactId: null,
    // projectName: null,
    project: null,
    projectId: null,
    taskName: null, 
    taskNameHebrew: null,
    attachment: null,
    chat: null,
    status: null,
    approvedHours: null,
    balanceHours: null,
    priority: null,
    description: null,
    user: null, 
    assignToUser: null,
    createdAt: null,
    modifiedAt: null,
    createdBy: null,    
    modifiedBy: null,
};

export const taskListDTO = {    
    id: 0,
    ticketNumber: null,
    customer: null,
    contactName: null,
    projectName: null,
    taskName: null, 
    taskNameHebrew: null,
    attachment: null,
    status: null,
    approvedHours: null,
    balanceHours: null,
    priority: null,
    description: null,
    user: null,
    chat: null,
};

//This is for to create a new task object (client to server)    
export const buildTaskObjectDTO = (task, activity) => {     
    const tDTO = {...taskDTO}   
    let id = 1;
    tDTO.id = id + 1;
    tDTO.ticketNumber = task?.ticketNumber;
    tDTO.customer = task?.customer;
    // tDTO.module = task?.module;
    // tDTO.contactName = task?.contactName;
    // tDTO.form = task?.form;
    // tDTO.projectName = task?.projectName;
    tDTO.project = task?.project;
    tDTO.projectId = task?.project?.id;
    tDTO.taskName = task?.taskName;
    tDTO.taskNameHebrew = task?.taskNameHebrew;
    tDTO.status = task?.status;
    tDTO.approvedHours = task?.approvedHours;
    tDTO.balanceHours = task?.balanceHours;
    tDTO.priority = task?.priority;
    tDTO.description = task?.description;
    tDTO.user = task?.user; 
    tDTO.assignToUser = task?.assignToUser || task?.user?.id;
    tDTO.createdAt = task?.createdAt;
    tDTO.modifiedAt = task?.modifiedAt;
    tDTO.createdBy = task?.createdBy;
    tDTO.modifiedBy = task?.modifiedBy;
    tDTO.attachment = activity ? buildAttachmentObjectListDTO(activity) : null;
    tDTO.chat  = activity ? buildTaskChatListObjectDTO(activity): null; 
    console.log('Task DTO:', tDTO);
    return tDTO;
};

//This is for accepting a task object from server
export const buildTaskRecieverObjectDTO = (task) => {     
    const tDTO = {...taskDTO}   
    tDTO.id = task?.id;
    tDTO.ticketNumber = task?.ticketNumber;
    tDTO.customer = task?.customer?.id || task?.project?.customerId;
    // tDTO.module = task?.module;
    tDTO.contactName = task?.contactName;
    // tDTO.form = task?.form;
    tDTO.projectName = task?.projectName || task?.project?.projectName; 
    tDTO.project = task?.project;
    tDTO.projectId = task?.projectId || task?.project?.id;  
    tDTO.taskName = task?.taskName;
    tDTO.taskNameHebrew = task?.taskNameHebrew;
    tDTO.attachment = task?.attachment || task?.attachment?.name;   
    tDTO.status = task?.status;
    tDTO.approvedHours = task?.approvedHours;
    tDTO.balanceHours = task?.balanceHours;
    tDTO.priority = task?.priority;
    tDTO.description = task?.description;
    tDTO.user = task?.user; 
    tDTO.assignToUser = task?.assignToUser;
    tDTO.createdAt = task?.createdAt;
    tDTO.modifiedAt = task?.modifiedAt;
    tDTO.createdBy = task?.createdBy;
    tDTO.modifiedBy = task?.modifiedBy;
    console.log('Task DTO:', tDTO);
    return tDTO;
};

// export const buildTaskRecieverObjectListDTO = (task) => { 

//     const tDTO = {...taskListDTO}   
//     let id = 1;
//     tDTO.id = id + 1;
//     tDTO.ticketNumber = task?.ticketNumber;
//     tDTO.customer = task?.customer;
//     tDTO.contactName = task?.contactName;
//     tDTO.projectName = task?.projectName;
//     tDTO.subject = task?.subject;
//     tDTO.attachment = task?.attachment;
//     tDTO.status = task?.status;
//     tDTO.approvedHours = task?.approvedHours;
//     tDTO.balanceHours = task?.balanceHours;
//     tDTO.priority = task?.priority;
//     tDTO.detailDescription = task?.detailDescription;
//     tDTO.user = task?.user;
//     return tDTO;
// };



export const buildTaskRecieverObjectListDTO = (tasks) => {     
    return tasks.map(task => buildTaskRecieverObjectDTO(task));
}   