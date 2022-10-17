import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './../components/products/product-detail/product-detail.component';
import { ProductListComponent } from './../components/products/product-list.component';
import { NgModule } from '@angular/core';
import { ConvertToSpacesPipe } from '../shared/pipes/convertToSpaces.pipe';
import { ProductDetailGuard } from '../shared/guards/product-detail.guard';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        canActivate: [ProductDetailGuard],
      },
    ]),
    SharedModule,
  ],
})
export class ProductModule {}
