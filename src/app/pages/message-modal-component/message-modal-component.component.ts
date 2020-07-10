import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMessage } from 'src/app/model/iMessage';

@Component({
  selector: 'app-message-modal-component',
  templateUrl: './message-modal-component.component.html',
  styleUrls: ['./message-modal-component.component.css']
})
export class MessageModalComponentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MessageModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMessage,) { }

  ngOnInit(): void {
  }

  replyMail(email) {
    window.location.href = `mailto:${email}`
  }

  close() {
    this.dialogRef.close()
  }

}
