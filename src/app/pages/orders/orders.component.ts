import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { IOrderModal } from 'src/app/model/iOrderModal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderInfoModalComponent } from '../order-info-modal/order-info-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: IOrderModal[];
  constructor(private orderService: OrderService,
    private matSnackbar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((value) => {
      this.orders = value
    }, (error) => {
      this.matSnackbar.open(error.message, 'Close', {
        duration: 4000
      })
    })
  }

  async delete(id: string) {
    try {
      await this.orderService.deleteOrder(id);
      this.matSnackbar.open('Order Deleted', 'Close', {
        duration: 4000
      })
    } catch (error) {
      this.matSnackbar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }

  openDialog(productData: IOrderModal) {
    this.dialog.open(OrderInfoModalComponent, {
      data: productData,
      maxHeight: '80%'
    })
  }

}
