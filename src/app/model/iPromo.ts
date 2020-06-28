import { Timestamp } from 'rxjs/internal/operators/timestamp';

import { firestore } from "firebase/app";

export interface IPromo {
    id?: string;
    promoName: string;
    promoDetails: string;
    startDate: firestore.Timestamp;
    endDate: firestore.Timestamp;
    imageUrl: string;
}