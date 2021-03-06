import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from "@angular/material/card";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PricingComponent } from './pages/pricing/pricing.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderModalComponent } from './pages/order-modal/order-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderInfoModalComponent } from './pages/order-info-modal/order-info-modal.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';
import { UpdateProductModalComponent } from './pages/update-product-modal/update-product-modal.component';
import { PromosComponent } from './pages/promos/promos.component';
import { AddPromoModalComponent } from './pages/add-promo-modal/add-promo-modal.component';
import { MessageComponent } from './pages/message/message.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from './pages/footer/footer.component';
import { MessageModalComponentComponent } from './pages/message-modal-component/message-modal-component.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PricingComponent,
    AdminComponent,
    AddProductComponent,
    OrdersComponent,
    LoginComponent,
    SignupComponent,
    OrderModalComponent,
    OrderInfoModalComponent,
    ProductListingComponent,
    UpdateProductModalComponent,
    PromosComponent,
    AddPromoModalComponent,
    MessageComponent,
    NotFoundComponent,
    FooterComponent,
    MessageModalComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAnalyticsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    CarouselModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    OrderModalComponent,
    OrderInfoModalComponent,
    UpdateProductModalComponent,
    AddPromoModalComponent,
    MessageModalComponentComponent
  ],
  providers: [
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
