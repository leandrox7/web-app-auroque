import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Ensure RouterModule and Routes are imported

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
