import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ICattle } from '../../../Interface/ICattle';
import { CattleDataService } from '../../../services/cattle-data.service';
let ELEMENT_DATA: ICattle[] = [];

@Component({
  selector: 'app-list-cattles',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './list-cattles.component.html',
  styleUrl: './list-cattles.component.scss'
})
export class ListCattlesComponent {
  constructor(private router: Router,  private cattleDataService: CattleDataService ) {}

  displayedColumns: string[] = ['id', 'breed', 'weight', 'gender'];
  dataSource = new MatTableDataSource(this.cattleDataService.getCattles())

  ngOnInit(){ 
}
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToNewCattle() {
    this.router.navigate(['/home/cattle']);
  }

  redirectToCattle(id: string) {
    this.router.navigate([`/home/cattle/${id}`]);
  }
}