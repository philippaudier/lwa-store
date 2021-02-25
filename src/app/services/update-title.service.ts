import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateTitleService {

  private pageTitle: BehaviorSubject<string>;

  constructor(
    private router: Router,
  ) {
      this.pageTitle = new BehaviorSubject<string>('');
    }

    setTitle(value) {
      this.pageTitle.next(value);
    }

    getTitle() {
      console.log('pageTile updateTitle' + this.pageTitle);
      return this.pageTitle.asObservable();
    }






}
