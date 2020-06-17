import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup

  constructor(private fb: FormBuilder, 
    private productService: ProductsService, 
    private matSnackBar: MatSnackBar) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDescription: ['', Validators.required],
      productImageUrl: ['', Validators.required],
      fakeFilePath: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    await this.productService.addProduct(this.productForm.value);
    this.matSnackBar.open('Product Added!!', 'Close', {
      duration: 3000
    })
  }

}
