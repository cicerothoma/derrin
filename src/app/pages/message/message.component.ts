import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/model/iMessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: Observable<IMessage[]>;

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messages = this.messagesService.getMessages();
  }

  delete(id: string) {
    this.messagesService.deleteMessage(id)
  }

  openDialog(data: IMessage) {
    console.log(data)
  }

}
