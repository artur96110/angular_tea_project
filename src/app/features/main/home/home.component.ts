import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  showPopup = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    timer(10000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.showPopup = true);
  }

  goToCatalog(): void {
    this.showPopup = false;
    this.router.navigate(['/catalog']);
  }

  closePopup(): void {
    this.showPopup = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
