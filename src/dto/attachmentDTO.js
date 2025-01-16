
const attachmentDTO = { 
    id: null,
    taskId: null,
    fileName: null,
    path: null,
    comments: null,
    status: null,
    createdAt: null,
    modifiedAt: null,
    createdBy: null,    
    modifiedBy: null,   
};

//This is for to create a new attachment object (client to server)
export const buildAttachmentObjectDTO = (file) => {
    const aDTO = {...attachmentDTO}
    aDTO.id = file?.id;
    aDTO.taskId = file?.taskId;
    aDTO.fileName = file?.name;
    aDTO.path = file?.path;
    aDTO.comments = file?.comments;
    aDTO.status = file?.status;
    aDTO.createdAt = file?.lastModified;
    aDTO.modifiedAt = file?.lastModified;
    aDTO.createdBy = file?.createdBy;
    aDTO.modifiedBy = file?.modifiedBy;
    console.log('Attachment DTO:', aDTO);
    return aDTO;
}   

//This is for accepting an attachment object from server
export const buildAttachmentDTO = (attachment) => {
    const aDTO = {...attachmentDTO}
    aDTO.id = attachment?.id;
    aDTO.taskId = attachment?.taskId;
    aDTO.fileName = attachment?.fileName;
    aDTO.path = attachment?.path;
    aDTO.comments = attachment?.comments;
    aDTO.status = attachment?.status;
    aDTO.createdAt = attachment?.createdAt;
    aDTO.modifiedAt = attachment?.modifiedAt;
    aDTO.createdBy = attachment?.createdBy;
    aDTO.modifiedBy = attachment?.modifiedBy;
    console.log('Attachment DTO:', aDTO);
    return aDTO;
}   

export const buildAttachmentObjectListDTO = (activity) => {
    
    return activity.map(obj => {
        if (obj?.file) {
            return buildAttachmentObjectDTO(obj.file);
        }else {
            return null;
        }
    });
}  