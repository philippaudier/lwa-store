import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateTitleService } from '../services/update-title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private updateTitle: UpdateTitleService) { }

  ngOnInit(): void {
    this.updateTitle.setOnHomePage(true);
  }

  ngOnDestroy(): void {
    this.updateTitle.setOnHomePage(false);
  }
}
