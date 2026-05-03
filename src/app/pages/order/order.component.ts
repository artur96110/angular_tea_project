import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderData, TeaService } from '../../services/tea.service';

@Component({ selector: 'app-order', templateUrl: './order.component.html' })
export class OrderComponent implements OnInit {
  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁёA-Za-z]+$/)]],
    last_name: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁёA-Za-z]+$/)]],
    phone: ['', [Validators.required, this.phoneValidator]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    product: [{ value: '', disabled: true }, Validators.required],
    address: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁёA-Za-z0-9\s\-\/]+$/)]],
    comment: ['']
  });

  isSent = false;
  isLoading = false;
  orderError = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private teaService: TeaService) {}

  ngOnInit(): void {
    const product = this.route.snapshot.queryParamMap.get('product') || '';
    this.orderForm.patchValue({ product });
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = String(control.value || '');
    const formatIsCorrect = /^\+?\d+$/.test(value);
    const digitsCount = value.replace(/\D/g, '').length;
    return formatIsCorrect && digitsCount === 11 ? null : { phone: true };
  }

  submit(): void {
    this.orderError = false;

    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const formValue = this.orderForm.getRawValue();
    const orderData: OrderData = {
      name: formValue.name || '',
      last_name: formValue.last_name || '',
      phone: formValue.phone || '',
      country: formValue.country || '',
      zip: formValue.zip || '',
      product: formValue.product || '',
      address: formValue.address || '',
      comment: formValue.comment || ''
    };

    this.isLoading = true;
    this.teaService.sendOrder(orderData).subscribe({
      next: response => {
        this.isLoading = false;
        if (response.success === 1) {
          this.isSent = true;
        } else {
          this.showErrorForThreeSeconds();
        }
      },
      error: () => {
        this.isLoading = false;
        this.showErrorForThreeSeconds();
      }
    });
  }

  hasError(field: string): boolean {
    const control = this.orderForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  private showErrorForThreeSeconds(): void {
    this.orderError = true;
    setTimeout(() => this.orderError = false, 3000);
  }
}
