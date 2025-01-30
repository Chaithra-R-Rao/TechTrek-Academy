import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `<h1>Unauthorized Access</h1><p>You do not have permission to view this page.</p>`,
  styles: [`h1 { color: red; }`],
  standalone: true
})
export class UnauthorizedComponent {}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-unauthorized',
//   standalone: false,
  
//   templateUrl: './unauthorized.component.html',
//   styleUrl: './unauthorized.component.css'
// })
// export class UnauthorizedComponent {

// }
