import { ProductService } from './../../../shared/services/product.service';
import { Product } from './../../../shared/types/product.type';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarComponent } from '../../star/star.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  private paramsSubscription!: Subscription;
  products: Product[] = [];
  product: Product | undefined;
  errorMessage: string = 'Could not load products';
  sub!: Subscription;
  id: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {

    this.paramsSubscription = this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.pageTitle += `: ${this.id}`;
    });

    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.product = this.products.find((p) => p.productId === this.id);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.log('Completed'),
    });

  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
