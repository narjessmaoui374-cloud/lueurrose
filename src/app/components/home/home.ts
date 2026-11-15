import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  occasions = ['Mariage', 'Anniversaire', 'Naissance', 'Deuil'];
  occasionProducts: { [key: string]: Product[] } = {};
  

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProductsByOccasions();
  }

  loadProductsByOccasions(): void {
    this.occasions.forEach(occasion => {
      this.productService.getProductsByOccasion(occasion).subscribe(
        products => {
          this.occasionProducts[occasion] = products.slice(0, 3);
        }
      );
    });
  }
}