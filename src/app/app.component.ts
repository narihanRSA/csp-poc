import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;

  openClick(): void {
    this.sidebar.toggle();
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }
}
