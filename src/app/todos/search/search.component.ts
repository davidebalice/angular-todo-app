import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { TodosModule } from '../todos.module';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [TodosModule],
})
export class SearchComponent implements OnInit, OnDestroy {
  submitting = false;
  searchForm: FormGroup;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]> | undefined;

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

  onSearch(searchTerm: string, idCategory: any): void {
    if ((searchTerm && searchTerm.trim().length > 0) || idCategory > 1) {
      this.router.navigate(['/todos'], {
        queryParams: { key: searchTerm, category: idCategory },
      });
    } else this.router.navigate(['/todos']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
