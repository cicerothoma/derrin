import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/model/iProduct';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  productsSub: Observable<IProduct[]>;

  constructor(private productService: ProductsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productsSub = this.productService.getProducts();
  }

  openDialog(data: IProduct): void {
    this.dialog.open(OrderModalComponent, {
      data: data
    });

  }

}
