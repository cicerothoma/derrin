import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPromoModalComponent } from '../add-promo-modal/add-promo-modal.component';
import { Router } from '@angular/router';
import { PromoService } from 'src/app/services/promo.service';
import { Observable } from 'rxjs';
import { IPromo } from 'src/app/model/iPromo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {

  promos: IPromo[]

  constructor(private dialog: MatDialog, public router: Router,
    private promoService: PromoService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.promoService.getPromos().subscribe(value => {
      this.promos = value
    })
  }

  openDialog(): void {
    this.dialog.open(AddPromoModalComponent, {
      maxHeight: '80%'
    })
  }

  async deletePromo(id: string): Promise<void> {
    try {
      await this.promoService.deletePromo(id)
      this.matSnackBar.open('Promo Deleted', 'Close', {
        duration: 3000
      })
    } catch (error) {
      this.matSnackBar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }

}
