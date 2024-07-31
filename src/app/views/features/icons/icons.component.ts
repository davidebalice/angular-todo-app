import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent {

  icons: string[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<{ icons: string[] }>('assets/unicons.json')
      .subscribe(data => {
        this.icons = data.icons;
      });
  }
}
