import { Component, inject, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
// Bootstrap
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
// Components
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgbDropdownModule, NgbCollapseModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  routeData: any | undefined;
  breadcrumbs: { label: string; url: string }[] = [];
  mode?: string;
  private offcanvasService = inject(NgbOffcanvas);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.generateBreadcrumb(this.route.root);
  }

  ngOnInit() {
    // Click Breadcrumb
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.generateBreadcrumb(this.route.root);
      });
  }

  // Breadcrumb Generate
  private generateBreadcrumb(route: ActivatedRoute): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return;
    }

    for (const child of children) {
      const routeLabel =
        child.snapshot.data['breadcrumb'] !== undefined
          ? child.snapshot.data['breadcrumb']
          : '';
      this.routeData = child.snapshot.data;
      this.generateBreadcrumb(child);
    }
  }

  // Open Offcanvas
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  // CHange Mode
  changeLayout(mode: string) {
    document.documentElement.setAttribute('dir', mode);
  }

  // Mode Type
  changeMode(mode: string) {
    document.documentElement.setAttribute('data-theme', mode);
  }

  // Sidebar Toggle
  toggleSidebar(el: any) {
    document.querySelector('.sidebar')?.classList.toggle('d-block');
    document.querySelector('.dashboard')?.classList.add('overlay_active');
  }

  onLogout() {
    this.authService.logout();
  }
}
