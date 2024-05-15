import { Component } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { LoaderService } from '../loader.service';
import { CommonModule } from '@angular/common';
import { LoaderModule } from './loader.module';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, LoaderModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  public loading: Subject<boolean> = this.loaderService.isLoading;


  constructor(private loaderService: LoaderService){

  }

}
