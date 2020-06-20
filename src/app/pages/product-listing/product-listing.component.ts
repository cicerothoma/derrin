import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/model/iProduct';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  products: Observable<IProduct[]>
  constructor(private productService: ProductsService, 
    private dialog: MatDialog, 
    private matSnackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts()
  }

  openDialog(product: IProduct): void {
    this.dialog.open(UpdateProductModalComponent, {
      data: product
    })
  }

  async delete(id: string) {
    try {
      await this.productService.deleteProduct(id);
      this.matSnackbar.open('Product has been successfully deleted!!', 'Close', {
        duration: 3000
      })
    } catch (error) {
      this.matSnackbar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }

}
