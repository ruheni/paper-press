import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'web-header',
  standalone: true,
  imports: [RouterModule, NgClass, NgFor],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  platform = inject(PLATFORM_ID);

  isDark = true;

  colors = [
    { hex: '#f44336', display: 'red' },
    { hex: '#e91e63', display: 'pink' },
    { hex: '#9c27b0', display: 'purple' },
    { hex: '#673ab7', display: 'deep-purple' },
    { hex: '#3f51b5', display: 'indigo' },
    { hex: '#2196f3', display: 'blue' },
    { hex: '#03a9f4', display: 'light-blue' },
    { hex: '#00bcd4', display: 'cyan' },
    { hex: '#009688', display: 'teal' },
    { hex: '#4caf50', display: 'green' },
    { hex: '#8bc34a', display: 'light-green' },
    { hex: '#cddc39', display: 'lime' },
    { hex: '#ffeb3b', display: 'yellow' },
    { hex: '#ffc107', display: 'amber' },
    { hex: '#ff9800', display: 'orange' },
    { hex: '#ff5722', display: 'deep-orange' },
    { hex: '#795548', display: 'brown' },
    { hex: '#9e9e9e', display: 'grey' },
    { hex: '#607d8b', display: 'blue-grey' },
    { hex: '#000000', display: 'black' },
    // { hex: '#ffffff', display: 'white' },
  ];

  wallpapers = [
    '/assets/wallpaper-1.jpg',
    '/assets/wallpaper-2.jpg',
    '/assets/wallpaper-3.jpg',
    '/assets/wallpaper-4.jpg',
    '/assets/wallpaper-5.jpg',
  ];

  async updateTheme(
    wallpaper: string | File | Blob | Event | HTMLImageElement,
  ) {
    const result = await ui('theme', wallpaper as unknown as string);

    if (this.platform !== 'server') {
      localStorage.setItem('theme', JSON.stringify(result));
    }
  }

  async updateMode() {
    let newMode = ui('mode') == 'dark' ? 'light' : 'dark';
    this.isDark = newMode == 'dark';
    await ui('mode', newMode);

    if (this.platform !== 'server') {
      localStorage.setItem('mode', newMode);
    }
  }

  async ngOnInit() {
    if (this.platform !== 'server') {
      // // load theme from local storage
      const theme = localStorage.getItem('theme');
      const mode = localStorage.getItem('mode');

      if (mode) {
        await ui('mode', mode);
      }

      if (theme) {
        await ui('theme', JSON.parse(theme));
      }
    }
  }
}
