import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IPromo } from '../model/iPromo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  promoCollection: AngularFirestoreCollection<IPromo>;
  promos: Observable<IPromo[]>;

  constructor(private afs: AngularFirestore) {
    this.promoCollection = this.afs.collection('promos');

    this.promos = this.promoCollection.snapshotChanges().pipe(
      map(action => action.map(value => {
        const id = value.payload.doc.id;
        const data = value.payload.doc.data() as IPromo;

        return { id, ...data }
      }))
    )
  }

  getPromos(): Observable<IPromo[]> {
    return this.promos
  }

  getPromo(id: string): Observable<IPromo> {
    return this.promoCollection.doc<IPromo>(id).valueChanges()
  }

  addPromo(data: IPromo): Promise<DocumentReference> {
    return this.promoCollection.add(data)
  }

  deletePromo(id: string): Promise<void> {
    return this.promoCollection.doc(id).delete()
  }
}
