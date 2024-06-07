import { Component } from '@angular/core';
import { CloudService } from '../../../services/cloud.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private serviceCloud: CloudService){}

}
