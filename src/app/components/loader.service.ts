import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new Subject<boolean>();

  show(){
    this.isLoading.next(true);
    console.log('show:')
  }

  hide(){this.isLoading.next(false)
    console.log('hide:')
  }

  constructor() { }
}
