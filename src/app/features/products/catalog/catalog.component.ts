import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { TeaProduct } from '../../../models/tea-product';
import { TeaService } from '../../../services/tea.service';

@Component({ selector: 'app-catalog', templateUrl: './catalog.component.html' })
export class CatalogComponent implements OnInit, OnDestroy {
  products: TeaProduct[] = [];
  searchValue = '';
  loading = false;
  error = false;
  private destroy$ = new Subject<void>();

  constructor(private teaService: TeaService) {}

  ngOnInit(): void {
    this.teaService.search$.pipe(
      takeUntil(this.destroy$),
      switchMap(search => {
        this.searchValue = search;
        this.loading = true;
        this.error = false;
        return this.teaService.getProducts(search);
      })
    ).subscribe({
      next: products => { this.products = products; this.loading = false; },
      error: () => { this.loading = false; this.error = true; }
    });
  }

  get title(): string {
    return this.searchValue ? `Результаты поиска по запросу ${this.searchValue}` : 'Наши чайные коллекции';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
