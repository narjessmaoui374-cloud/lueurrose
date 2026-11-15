import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { OrderService } from '../../services/order';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  similarProducts: Product[] = [];
  quantity = 1;
  selectedPaymentMethod = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      if (product) {
        this.product = product;
        this.loadSimilarProducts();
      }
    });
  }

  loadSimilarProducts(): void {
    if (this.product?.category) {
      this.productService.getProductsByCategory(this.product.category).subscribe(
        products => {
          this.similarProducts = products
            .filter(p => p.id !== this.product?.id)
            .slice(0, 3);
        }
      );
    }
  }

  addToCart(): void {
    if (!this.selectedPaymentMethod) {
      alert('Veuillez sélectionner un mode de paiement');
      return;
    }

    if (this.product) {
      this.orderService.addToCart({
        productId: this.product.id,
        productName: this.product.name,
        quantity: this.quantity,
        price: this.product.price,
        image: this.product.image
      });

      this.router.navigate(['/confirmation'], { 
        queryParams: { order: Math.floor(Math.random() * 1000) + 1 } 
      });
    }
  }

  increaseQuantity(): void {
    if (this.quantity < 100) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}