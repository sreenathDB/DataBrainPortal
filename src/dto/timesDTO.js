
export const timeSheetObjDTO = {
    id: 0,
    customer: null,
    taskDate: null, 
    endDate: null,  
    task: null,
    taskId: null,    
    startTime: null,    
    description: null,
    endTime: null,  
    approvedHours: null,    
    remainingHours: null,   
    totalTime: null,
    totalWorkingTime: null, 
    contactPerson: null,
    user: null,
    internalNotes: null,
    status: true,
    isBillable: true,
}

export const buildTimeSheetObjDTO = (timeSheetObj) => { 
    const timeDTO = {...timeSheetObjDTO};   
    let id = 1;
    timeDTO.id = id + 1;
    timeDTO.customer = timeSheetObj?.customer;
    timeDTO.taskDate = timeSheetObj?.taskDate;  
    timeDTO.endDate = timeSheetObj?.endDate || timeSheetObj?.taskDate;    
    timeDTO.task = timeSheetObj?.task;
    timeDTO.taskId = timeSheetObj?.taskId || timeSheetObj?.task?.id || 2;      
    timeDTO.startTime = timeSheetObj?.startTime;    
    timeDTO.description = timeSheetObj?.description;    
    timeDTO.endTime = timeSheetObj?.endTime;    
    timeDTO.approvedHours = timeSheetObj?.approvedHours;    
    timeDTO.remainingHours = timeSheetObj?.remainingHours;  
    timeDTO.totalTime = timeSheetObj?.totalTime;    
    timeDTO.totalWorkingTime = timeSheetObj?.totalWorkingTime;  
    timeDTO.contactPerson = timeSheetObj?.contactPerson;    
    timeDTO.user = timeSheetObj?.user;  
    timeDTO.internalNotes = timeSheetObj?.internalNotes;    
    timeDTO.status = timeSheetObj?.status;  
    timeDTO.isBillable = timeSheetObj?.isBillable;    
    return timeDTO; 
    
}

export const buildTimeSheetObjDTOList = (timeSheetObjList) => {
    return timeSheetObjList.map((timeSheetObj) => {
        return buildTimeSheetObjDTO(timeSheetObj);
    });
}   