import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    CatalogComponent,
    ProductComponent
  ]
})
export class ProductsModule { }
