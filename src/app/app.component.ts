import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'dashboard-nathi';
}
