import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


export interface User {
  id: number;
  idProperty: number
  name: string;
  email: string;
  gender: string
  status: string;
  startEmployDate: Date;
}

const ELEMENT_DATA: User[] = [
  {id: 1, idProperty: 1, name: 'Nelson Barbosa', email: "nelson_a.barb@gmail.com", gender: 'Male', status: "Ativo", startEmployDate: new Date('2019-11-05')},
  {id: 2, idProperty: 1, name: 'Romulo Alves da Silva', email: "nelson_a.barb@gmail.com", gender: 'Male', status: "Ativo", startEmployDate: new Date('2014-08-02')},
  {id: 3, idProperty: 1, name: 'Marcos Kawasky Shitz', email: "marcosKawasky.S.@outlook.com", gender: 'Male', status: "Ativo", startEmployDate: new Date('2015-01-09')},
  {id: 4, idProperty: 1, name: 'José Carlos Cristolo', email: "jcristolo@gmail.com", gender: 'Male', status: "Ativo", startEmployDate: new Date('2012-12-16')},
];
@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status', 'startEmployDate'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router: Router) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToNewUser() {
    this.router.navigate(['/home/user']);
  }

  redirectToUser(id: string) {
    this.router.navigate([`/home/user/${id}`]);
  }
}
