import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Charger le panier du localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  // Ajouter au panier
  addToCart(item: CartItem): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find(i => i.productId === item.productId);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCart.push(item);
    }
    
    this.updateCart(currentCart);
  }

  // Retirer du panier
  removeFromCart(productId: number): void {
    const currentCart = this.cartItemsSubject.value.filter(
      item => item.productId !== productId
    );
    this.updateCart(currentCart);
  }

  // Mettre à jour le panier
  updateCart(cart: CartItem[]): void {
    this.cartItemsSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Vider le panier
  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  // Calculer le total
  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  }

  // Nombre d'articles
  getCartItemsCount(): number {
    return this.cartItemsSubject.value.reduce(
      (count, item) => count + item.quantity, 
      0
    );
  }
}