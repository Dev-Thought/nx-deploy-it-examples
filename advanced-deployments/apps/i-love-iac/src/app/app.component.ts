import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@advanced-deployments/api-interfaces';

@Component({
  selector: 'advanced-deployments-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>(
    'https://api-functionsf9316579.azurewebsites.net/hello'
  );
  constructor(private http: HttpClient) {}
}
