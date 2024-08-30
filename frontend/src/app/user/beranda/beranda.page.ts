import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {
  rating: number = 0;

  constructor() { }

  ngOnInit() {
    console.log('BerandaPage ngOnInit');
  }

}
