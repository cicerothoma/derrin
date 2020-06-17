import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { IProduct } from '../model/iProduct';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsCollection: AngularFirestoreCollection<IProduct>;
  products: Observable<IProduct[]>;

  constructor(private afs: AngularFirestore) { 
    this.productsCollection = this.afs.collection('products');

    this.products = this.productsCollection.snapshotChanges().pipe(
      map(action => action.map(value => {
        const id = value.payload.doc.id;
        const data = value.payload.doc.data() as IProduct;

        return {id, ...data}
      }))
    )
  }

  getProducts(): Observable<IProduct[]> {
    return this.products
  }

  getProduct(id: string): Observable<IProduct> {
    return this.productsCollection.doc<IProduct>(id).valueChanges()
  }
  
  addProduct(data: IProduct): Promise<DocumentReference> {
    return this.productsCollection.add(data)
  }

  updateProduct(id: string, data: Partial<IProduct>): Promise<void> {
    return this.productsCollection.doc(id).update(data)
  }

  deleteProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete()
  }
}
