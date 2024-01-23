export interface User{
    id: number,
    userName: string,
    password: string,
    phone: string
}

export interface ChatList {
    userId: number,
    userIdTwo: number,
    userNameTwo: string
}

export interface SelectedChat {
    iduser: number, 
    idusertwo: number
}