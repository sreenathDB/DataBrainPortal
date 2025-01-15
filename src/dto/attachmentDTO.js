
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

export const buildAttachmentListDTO = (attachments) => {
    return attachments.map(attachment => {
        return buildAttachmentDTO(attachment);
    });
}  