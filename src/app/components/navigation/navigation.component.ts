import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/index';
import { SIDVIServices } from 'src/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  rout: string;
  haySesion: boolean;
  constructor(private router: Router, private sidvi: SIDVIServices) {
  }

  ngOnInit(): void {
    this.rout = localStorage.getItem('rout');
    if ( this.sidvi.manager.usuario !== null) {
      this.haySesion = true;
    } else {
      this.haySesion = false;
    }
  }

  logout() {
    localStorage.clear();
    this.haySesion = false;
    this.router.navigate(['./login']);
  }
}

