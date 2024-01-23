import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatList, SelectedChat, User } from 'src/assets/interface';
import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  public chatList: Array<ChatList>
  public isAddChat: boolean
  public friendPhone: string
  public isSelectChat: boolean
  private userData: User
  public selectedChat: SelectedChat = { iduser: 0, idusertwo: 0 };

  constructor(private userService: UserService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.userData = this.userService.getUserData()
    if (this.userData) {
      this.setChatList();
    }
  }

  private setChatList() {
    this.chatService.getChatList(this.userData.id).subscribe(item => {
      this.chatList = item;
    });
  }

  changeWindowAddChat(){
    this.isAddChat = !this.isAddChat
  }

  addChat() {
    if (this.friendPhone.trim() !== '') {
      this.userService.getUser(this.friendPhone).subscribe((item: any) => {
        this.chatService.addChat(this.userData.id, item.id, item.username, this.userData.userName).subscribe(
          () => {
            this.setChatList();
            this.friendPhone = '';
            this.changeWindowAddChat();
          },
          (error) => {
            console.error('Error adding chat:', error);
          }
        );
      });
    }
  }

  selectChat(iduser: number, idusertwo: number) {
    this.isSelectChat = true
    this.selectedChat = { iduser, idusertwo };
  }

  preventClose(event: Event): void {
    event.stopPropagation();
  }

}
