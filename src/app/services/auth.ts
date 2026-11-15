import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { USERS } from '../data/users.data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = USERS;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    // Récupérer l'utilisateur du localStorage
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Connexion
  login(email: string, password: string): Observable<any> {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Sauvegarder dans localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of({ success: true, user });
    } else {
      return of({ success: false, message: 'Email ou mot de passe incorrect' });
    }
  }

  // Inscription
  register(userData: any): Observable<any> {
    // Vérifier si l'email existe déjà
    const exists = this.users.find(u => u.email === userData.email);
    
    if (exists) {
      return of({ success: false, message: 'Cet email est déjà utilisé' });
    }

    // Créer nouvel utilisateur
    const newUser: User = {
      id: this.users.length + 1,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: 'user'
    };

    this.users.push(newUser);
    return of({ success: true, message: 'Inscription réussie' });
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Vérifier si connecté
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
