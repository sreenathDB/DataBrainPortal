
export const taskChatDTO = {
    id: null,
    taskId: null,
    chatNote: null,
    emoji: null,
    flaged: null,   
    tagUserId: null,  
    parentChat: null,   
    status: null,
    createdAt: null,
    createdBy: null,
    modifiedAt: null,
    modifiedBy: null,       
}

//This is for to create a new task chat object (client to server)
export const buildTaskChatObjectDTO = (taskChat) => { 
    const tcDTO = {...taskChatDTO}
    tcDTO.id = taskChat?.id;
    tcDTO.taskId = taskChat?.taskId;
    tcDTO.chatNote = taskChat?.text;
    tcDTO.emoji = taskChat?.reactions;
    tcDTO.flaged = taskChat?.flaged; //used for pin and start messages
    tcDTO.tagUserId = taskChat?.tagUserId;
    tcDTO.parentChat = taskChat?.parentChat;
    tcDTO.status = taskChat?.status;
    tcDTO.createdAt = taskChat?.createdAt;
    tcDTO.createdBy = taskChat?.createdBy;
    tcDTO.modifiedAt = taskChat?.modifiedAt;
    tcDTO.modifiedBy = taskChat?.modifiedBy;
    console.log('Task Chat DTO:', tcDTO);
    return tcDTO;
}

//This is for accepting a task chat object from server
export const buildTaskChatDTO = (taskChat) => { 
    const tcDTO = {...taskChatDTO}
    tcDTO.id = taskChat?.id;
    tcDTO.taskId = taskChat?.taskId;
    tcDTO.chatNote = taskChat?.chatNote;
    tcDTO.emoji = taskChat?.emoji;
    tcDTO.flaged = taskChat?.flaged;
    tcDTO.tagUserId = taskChat?.tagUserId;
    tcDTO.parentChat = taskChat?.parentChat;
    tcDTO.status = taskChat?.status;
    tcDTO.createdAt = taskChat?.createdAt;
    tcDTO.createdBy = taskChat?.createdBy;
    tcDTO.modifiedAt = taskChat?.modifiedAt;
    tcDTO.modifiedBy = taskChat?.modifiedBy;
    console.log('Task Chat DTO:', tcDTO);
    return tcDTO;
}

export const buildTaskChatListObjectDTO = (activity) => {
    return activity.map(obj => {
        if (obj?.text) {
            return buildTaskChatObjectDTO(obj);
        }else {
            return null;
        }
    }
    );
}