import { Product } from './../../shared/types/product.type';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  private paramsSubscription!: Subscription;
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.pageTitle += `: ${id}`;
      this.product = {
        productId: 1,
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2021',
        description: 'Leaf rake with 48-inch wooden handle.',
        price: 19.95,
        starRating: 3.2,
        imageUrl: 'assets/images/leaf_rake.png',
      };
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
