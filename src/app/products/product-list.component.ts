import { Product } from './../shared/types/product.type';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {

  pageTitle: string = 'Product List';
  private _listFilter: string = '';
  filteredProducts: Product[];
  products: Product[];
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  ratingClicked: string = '';

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

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
    console.log('In OnInit');
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
