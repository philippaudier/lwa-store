import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss']
})
export class DesktopMenuComponent implements OnInit {

  productNumber = 0;
  onCheckout = false;


  constructor() { }

  ngOnInit(): void {
  }

}
