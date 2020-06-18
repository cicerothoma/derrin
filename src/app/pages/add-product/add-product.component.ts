import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

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
    const { productName } = this.productForm.value; 
    const file = event.target.files[0];
    const filePath: string = `productImages/${productName}`;
    const fileRef: AngularFireStorageReference = this.afStorage.ref(filePath);
    const task: AngularFireUploadTask = this.afStorage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    ).subscribe()
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
