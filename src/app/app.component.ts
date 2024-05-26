import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ayudantiaAngular';

  constructor() {
    console.log('Hola desde el constructor');
  }

  ngOnInit(): void {
    console.log('Hola desde el ngOnInit');
  }

}
