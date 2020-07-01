import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { IMessage } from 'src/app/model/iMessage';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponentComponent } from '../message-modal-component/message-modal-component.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: IMessage[];

  constructor(private messagesService: MessagesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe(value => {
      this.messages = value
    })
  }

  delete(id: string) {
    this.messagesService.deleteMessage(id)
  }

  openDialog(data: IMessage) {
    this.dialog.open(MessageModalComponentComponent, {
      maxHeight: '80%',
      data: data,
    })
  }

}
