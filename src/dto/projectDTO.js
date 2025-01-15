export const projectDTO = { 
    id: null,
    projectType: null,
    fromDate: null,
    toDate: null,
    customer: null, 
    customerId: null,
    contactId: null,
    additionalHours: null,  
    projectName: null,  
    projectNameHebrew: null, 
    projectMethod: null,
    budget: null,
    consumedHours: null,    
    balanceHours: null, 
    status: false,
    createdAt: null,
    modifiedAt: null,
    createdBy: null,    
    modifiedBy: null,
    
};  

export const buildProjectDTO = (project) => {
    console.log(project);   

         
    const pDTO = {...projectDTO}; 
    pDTO.id = project?.id;  
    pDTO.projectType = project?.projectType;
    pDTO.fromDate = project?.fromDate;
    pDTO.status = project?.status ? 1: 0;
    pDTO.toDate = project?.toDate;
    pDTO.customer = project?.customer;
    pDTO.customerId = project?.customerId || project?.customers?.id; 
    pDTO.contactId = project?.contactId || project?.customer?.contactPerson;        
    pDTO.additionalHours = project?.additionalHours;
    pDTO.projectName = project?.projectName;
    pDTO.projectNameHebrew = project?.projectNameHebrew;
    pDTO.projectMethod = project?.projectMethod;
    pDTO.budget = project?.budget;
    pDTO.consumedHours = project?.consumedHours;
    pDTO.balanceHours = project?.balanceHours;
    pDTO.createdAt = project?.createdAt;
    pDTO.modifiedAt = project?.modifiedAt;
    pDTO.createdBy = project?.createdBy;
    pDTO.modifiedBy = project?.modifiedBy;

    console.log(pDTO);  
    return pDTO;
}

export const buildProjectListDTO = (projects) => {      
    return projects.map(project => buildProjectDTO(project));
}   