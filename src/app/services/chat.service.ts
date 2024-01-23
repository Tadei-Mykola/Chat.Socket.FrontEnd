import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatList, User } from 'src/assets/interface';
import { io } from 'socket.io-client';

const baseUrl = "http://localhost:3000";
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
};

@Injectable()
export class ChatService {
    private socket: any;

    constructor(private http: HttpClient) {
        this.socket = io(baseUrl);
    }

    public getChatList(iduser: number): Observable<ChatList[]> {
        return this.http.get<ChatList[]>(`${baseUrl}/chat/list?iduser=${iduser}`);
    }

    public addChat(iduser: number, idusertwo: number, nameusertwo: string, nameuser: string) {
        const data = {iduser: iduser, idusertwo: idusertwo, nameusertwo: nameusertwo, nameuser: nameuser}
        return this.http.post(`${baseUrl}/chat/addChat`, data, httpOptions);
    }

    public getChatMessages(iduser, idusertwo): Observable<any> {
        return this.http.get(`${baseUrl}/chat/messages?iduser=${iduser}&idusertwo=${idusertwo}`);
    }

    public sendMessage( messageData: any): void {
        this.socket.emit('message', messageData);
    }

    public onMessage(id: number): Observable<any> {
        return new Observable(observer => {
            this.socket.on('message', (message: any) => {
                observer.next(message);
            });
            this.socket.emit('setUserId', id);
        });
    }
}
