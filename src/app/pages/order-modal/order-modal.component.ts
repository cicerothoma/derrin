import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'src/app/model/iProduct';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IOrderModal } from 'src/app/model/iOrderModal';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {

  orderForm: FormGroup;
  totalPrice: number = +this.data.productPrice;
  userOrder: IOrderModal;
  constructor(public dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    public fb: FormBuilder) { 
      this.orderForm = this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        quantity: ['1', Validators.required]
      })
    }

  ngOnInit(): void {
  }

  getErrorMessage(formControlName) {
    return this.orderForm.get(formControlName).hasError('required') ? 'You must enter a value' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePrice() {
    this.orderForm.get('quantity').valueChanges.subscribe(value => {
      if (!value) {
        this.totalPrice = this.data.productPrice
      } else {
        this.totalPrice = this.data.productPrice * value
      }
    })  
  }

  order() {
    console.log(this.orderForm.value)
    const { name, phone, quantity } = this.orderForm.value;
    this.userOrder = {
      name: name,
      phone: phone,
      quantity: quantity,
      price: this.totalPrice,
      product: this.data
    }
    console.log(this.userOrder);
  }

  
}
