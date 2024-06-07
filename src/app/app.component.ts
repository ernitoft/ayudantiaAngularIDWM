import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

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
    initFlowbite();
  }

}
