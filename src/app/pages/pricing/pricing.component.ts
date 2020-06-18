import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/model/iProduct';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  productsSub: Observable<IProduct[]>;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productsSub = this.productService.getProducts();
  }

}
