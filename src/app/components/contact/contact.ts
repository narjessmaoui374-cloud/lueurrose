import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  contactForm = {
    fullName: '',
    email: '',
    subject: '',
    message: ''
  };
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.contactForm.fullName || !this.contactForm.email || !this.contactForm.message) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
      this.resetForm();
    }, 1500);
  }

  resetForm(): void {
    this.contactForm = {
      fullName: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}