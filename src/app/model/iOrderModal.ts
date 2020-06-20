import { IProduct } from './iProduct';

export interface IOrderModal {
    id?: string;
    name: string;
    phone: number;
    quantity: number;
    product: IProduct;
    price: number;
    date: number;
}