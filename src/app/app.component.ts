import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div>
        <h1>{{ title }}</h1>
        <app-products></app-products>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Acme Product Management';
}
