import { Product } from './../shared/types/product.type';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  private _listFilter: string = '';
  filteredProducts: Product[] = [];
  products: Product[] = [];
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  ratingClicked: string = '';
  private errorMessage: string = '';
  sub!: Subscription;

  constructor(private productService: ProductService) {}

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredProducts = this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.log('Completed'),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    console.log('Destroying');
  }

  private performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: Product) =>
        product.productName.toLocaleLowerCase().includes(filterBy) ||
        product.productCode.toLocaleLowerCase().includes(filterBy)
    );
  }

  onNotify(message: string): void {
    this.ratingClicked = message;
  }
}
