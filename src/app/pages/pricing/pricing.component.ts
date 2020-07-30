import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/model/iProduct';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit, OnDestroy {
  products: IProduct[];
  isLoading: boolean = true;
  productsSub: Subscription;

  constructor(private productService: ProductsService,
    public dialog: MatDialog, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productsSub = this.productService.getProducts().subscribe((val) => {
      this.products = val;
      if (this.products) {
        this.isLoading = false
      }
    }, (err) => {
      this.matSnackBar.open(err.message, 'Close', {
        duration: 2000
      })
    });
  }

  openDialog(data: IProduct): void {
    this.dialog.open(OrderModalComponent, {
      data: data,
      height: '80%'
    });

  }
  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

}
