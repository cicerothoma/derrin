import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-promo-modal',
  templateUrl: './add-promo-modal.component.html',
  styleUrls: ['./add-promo-modal.component.css']
})
export class AddPromoModalComponent implements OnInit {

  promoForm: FormGroup;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  constructor(private fb: FormBuilder, private afStorage: AngularFireStorage) {
    this.promoForm = this.fb.group({
      promoName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      promoDetails: ['', Validators.required],
      imageUrl: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  getErrorMessage(formControlName) {
    return this.promoForm.get(formControlName).hasError('required') ? 'You must enter a value' : '';
  }

  fileUpload(event) {

    console.log(event)

    // const { promoName } = this.promoForm.value;
    // const file = event.target.files[0];
    // const filePath: string = `productImages/${promoName}`;
    // const fileRef: AngularFireStorageReference = this.afStorage.ref(filePath);
    // const task: AngularFireUploadTask = this.afStorage.upload(filePath, file);

    // this.uploadPercent = task.percentageChanges();

    // task.snapshotChanges().pipe(
    //   finalize(() => {
    //     this.downloadURL = fileRef.getDownloadURL();
    //     this.downloadURL.subscribe(url => {
    //       this.promoForm.get('imageUrl').patchValue(url)
    //     })
    //   })
    // ).subscribe()
  }

  createPromo() {
    console.log(this.promoForm.value)
  }

}
