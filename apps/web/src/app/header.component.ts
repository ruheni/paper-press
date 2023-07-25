import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'web-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isDark = true;

  async updateTheme(color: string) {
    await ui('theme', color);
  }

  async updateMode() {
    let newMode = ui('mode') == 'dark' ? 'light' : 'dark';
    await ui('mode', newMode);
  }
}
