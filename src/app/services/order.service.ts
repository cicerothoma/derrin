import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IOrderModal } from '../model/iOrderModal';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersCollection: AngularFirestoreCollection<IOrderModal>;
  orders: Observable<IOrderModal[]>;

  constructor(private afs: AngularFirestore) { 
    this.ordersCollection = this.afs.collection('orders');

    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map(action => action.map(value => {
        const id = value.payload.doc.id;
        const data = value.payload.doc.data() as IOrderModal;

        return {id, ...data}
      }))
    )
  }

  getOrders(): Observable<IOrderModal[]> {
    return this.orders
  }

  getOrder(id: string): Observable<IOrderModal> {
    return this.ordersCollection.doc<IOrderModal>(id).valueChanges()
  }
  
  addOrder(data: IOrderModal): Promise<DocumentReference> {
    return this.ordersCollection.add(data)
  }

  updateOrder(id: string, data: Partial<IOrderModal>): Promise<void> {
    return this.ordersCollection.doc(id).update(data)
  }

  deleteOrder(id: string): Promise<void> {
    return this.ordersCollection.doc(id).delete()
  }
}
