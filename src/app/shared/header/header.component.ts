import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeaService } from '../../services/tea.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  searchValue = '';

  constructor(private teaService: TeaService, private router: Router) {
    this.teaService.search$.subscribe(value => this.searchValue = value);
  }

  search(): void {
    this.teaService.setSearch(this.searchValue);
    this.router.navigate(['/catalog']);
  }

  resetSearch(): void {
    this.searchValue = '';
    this.teaService.clearSearch();
    this.router.navigate(['/catalog']);
  }
}
