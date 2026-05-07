import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeaProduct } from '../../../models/tea-product';
import { TeaService } from '../../../services/tea.service';

@Component({ selector: 'app-product', templateUrl: './product.component.html' })
export class ProductComponent implements OnInit {
  product: TeaProduct | null = null;
  loading = false;
  error = false;

  constructor(private route: ActivatedRoute, private router: Router, private teaService: TeaService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.teaService.getProducts().subscribe({
      next: products => {
        this.product = products.find(item => item.id === id) || null;
        this.loading = false;
        this.error = !this.product;
      },
      error: () => { this.loading = false; this.error = true; }
    });
  }

  buy(): void {
    if (this.product) {
      this.router.navigate(['/order'], { queryParams: { product: this.product.title } });
    }
  }
}
