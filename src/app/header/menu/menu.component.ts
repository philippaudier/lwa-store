import { Component, OnInit } from '@angular/core';
import { UpdateTitleService } from 'src/app/services/update-title.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  onHomePage = true;
  pageTitle: string;

  constructor(
    private updateTitle: UpdateTitleService
  ) { }

  ngOnInit(): void {
    this.updateTitle.getOnHomePage().subscribe((value) => {
      this.onHomePage = value;
      console.log('onHomePage ? ' + this.onHomePage);
    });
    setTimeout(() => {
      this.updateTitle.getTitle().subscribe((value) => {
        this.pageTitle = value;
        console.log(this.pageTitle);
      });
    });
  }

}
