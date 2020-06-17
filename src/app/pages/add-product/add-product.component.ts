import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup

  constructor(private fb: FormBuilder, 
    private productService: ProductsService, 
    private matSnackBar: MatSnackBar,
    private afStorage: AngularFireStorage) {
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

  fileUpload(event) {
    console.log(event.target.files[0])
  }

  async submit(): Promise<void> {
    if (this.productForm.valid) {
      await this.productService.addProduct(this.productForm.value);
      this.matSnackBar.open('Product Added!!', 'Close', {
        duration: 3000
      })
    } else {
      this.matSnackBar.open('Form Not Valid', 'Close', {
        duration: 6000
      })
    }
  }

}
