import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  submitting = false;
  searchForm: FormGroup;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]>;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
      idCategory: [0],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService
      .getCategories()
      .pipe(takeUntil(this.destroy$));
  }

  onSearch(searchTerm: string, idCategory: number): void {
    if ((searchTerm && searchTerm.trim().length > 0) || idCategory > 1) {
      this.router.navigate(['/products'], {
        queryParams: { key: searchTerm, category: idCategory },
      });
    } else this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
