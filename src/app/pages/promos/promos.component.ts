import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPromoModalComponent } from '../add-promo-modal/add-promo-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {

  constructor(private dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(AddPromoModalComponent)
  }

}
