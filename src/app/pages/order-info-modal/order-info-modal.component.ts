import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IOrderModal } from 'src/app/model/iOrderModal';

@Component({
  selector: 'app-order-info-modal',
  templateUrl: './order-info-modal.component.html',
  styleUrls: ['./order-info-modal.component.css']
})
export class OrderInfoModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrderModal) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
