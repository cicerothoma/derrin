import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IProduct } from 'src/app/model/iProduct';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.css']
})
export class UpdateProductModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private productService: ProductsService, 
    private matSnackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  async update() {
    try {
      await this.productService.updateProduct(this.data.id, this.data);
      this.onNoClick()
      this.matSnackbar.open('Product has been updated!!', 'Close', {
        duration: 3000
      })
    } catch (error) {
      this.matSnackbar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }

}
