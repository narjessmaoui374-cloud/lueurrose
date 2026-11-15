import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../data/products.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = PRODUCTS;

  constructor() { }

  
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  
  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  
  getProductsByOccasion(occasion: string): Observable<Product[]> {
    const filtered = this.products.filter(p => p.occasion === occasion);
    return of(filtered);
  }

  
  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.products.filter(p => p.category === category);
    return of(filtered);
  }
}
