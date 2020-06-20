import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'src/app/model/iProduct';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IOrderModal } from 'src/app/model/iOrderModal';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public fb: FormBuilder,
    private orderService: OrderService,
    private matSnackbar: MatSnackBar) { 
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

  async order() {
    try {
      if (this.orderForm.valid) {
        const { name, phone, quantity } = this.orderForm.value;
        this.userOrder = {
          name: name,
          phone: phone,
          quantity: quantity,
          price: this.totalPrice,
          product: this.data,
          date: new Date().getTime()
        }
        await this.orderService.addOrder(this.userOrder);
        this.orderForm.reset({
          name: '',
          phone: '',
          quantity: ''
        })
        this.dialogRef.close();
        this.matSnackbar.open(`Your Order Has Been Sent And we will get back to you as soon as possible`, 'Close', {
          duration: 6000
        })
  
      }
    } catch (error) {
      this.matSnackbar.open(error.message, 'Close', {
        duration: 6000
      })
    }

  }

  
}
