import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectedChat, User } from 'src/assets/interface';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges, OnInit {
  @Input() selectedChat: SelectedChat;
  public newMessage: string;
  public messages: any[] = [];
  public userData: User;

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit(): void {
    if (!this.userData) {
      this.userData = this.userService.getUserData();
    }

    this.chatService.onMessage(this.userData.id).subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedChat) {
      this.loadChatMessages();
    }
    
  }

  loadChatMessages() {
    if (this.selectedChat) {
      this.chatService.getChatMessages(this.selectedChat.iduser, this.selectedChat.idusertwo).subscribe(item => {
        this.messages = item;
        console.log(this.messages, 1);
      });
    }
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const messageData = {
        iduser: this.selectedChat.iduser,
        idusertwo: this.selectedChat.idusertwo,
        content: this.newMessage
      };
      this.chatService.sendMessage(messageData);
      this.messages.push(messageData);
      this.messages.forEach(item => console.log(item))
      this.newMessage = '';
    }
  }

  public getMessageCssClass(message): any {
    console.log(message)
    const isMyMessage = message.sender_id === this.userData.id || message.iduser === this.userData.id;
    return {
      'my-message': isMyMessage,
      'other-message': !isMyMessage
    };
  }

}
