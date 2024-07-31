import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blog',
        loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
        data: {
          title: 'Blog',
          breadcrumb: { label: 'Blog', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'blog-details',
        loadComponent: () => import('./blog-details/blog-details.component').then(m => m.BlogDetailsComponent),
        data: {
          title: 'Blog Details',
          breadcrumb: { label: 'Blog Details', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'faq',
        loadComponent: () => import('./faq/faq.component').then(m => m.FaqComponent),
        data: {
          title: 'Faq',
          breadcrumb: { label: 'Faq', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'pricing',
        loadComponent: () => import('./pricing/pricing.component').then(m => m.PricingComponent),
        data: {
          title: 'Pricing',
          breadcrumb: { label: 'Pricing', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'testimonial',
        loadComponent: () => import('./testimonial/testimonial.component').then(m => m.TestimonialComponent),
        data: {
          title: 'Testimonial',
          breadcrumb: { label: 'Testimonial', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'terms',
        loadComponent: () => import('./terms/terms.component').then(m => m.TermsComponent),
        data: {
          title: 'Terms & Conditions',
          breadcrumb: { label: 'Terms & Conditions', des:'Form Elements is used to style and format the input field' }
        }
      }
    ]
  }
];
