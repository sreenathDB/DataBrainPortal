import e from "express"

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

export const buildTaskChatListDTO = (taskChats) => {
    return taskChats.map(taskChat => {
        return buildTaskChatDTO(taskChat);
    }
    );
}