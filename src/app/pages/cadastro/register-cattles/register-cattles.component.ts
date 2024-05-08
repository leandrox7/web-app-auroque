import { ActivatedRoute } from '@angular/router';
import { CattleDataService } from '../../../services/cattle-data.service';
import { ICattle } from '../../../Interface/ICattle';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { CattleService } from './../../../services/cattle.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegisterCattlesGenealogyComponent } from '../register-cattles-genealogy/register-cattles-genealogy.component';
import { RegisterCattlesEventTrakerComponent } from '../register-cattles-event-traker/register-cattles-event-traker.component';

@Component({
  selector: 'app-register-cattles',
  templateUrl: './register-cattles.component.html',
  styleUrls: ['./register-cattles.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterCattlesComponent implements OnInit {
  cattleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cattleDataService: CattleDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cattleForm = this.fb.group({
      idVisualIdentification: ['', Validators.required],
      idSisbovIdentification: ['', Validators.required],
      gender: ['', Validators.required],
      animalType: ['', Validators.required],
      animalSubtype: ['', Validators.required],
      breed: ['', Validators.required],
      origin: ['', Validators.required],
      purpose: ['', Validators.required],
      birthDate: ['', Validators.required],
      vaccinationStatus: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      id:['', Validators.required],
    });

    // Captura o ID da rota e verifica se é um número válido
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const id = parseInt(idStr, 10);
        if (!isNaN(id)) {  // Verifica se o id é um número válido
          const cattle = this.cattleDataService.getCattle(id);
          if (cattle) {
            this.cattleForm.patchValue(cattle);
          }
        }
      }
    });
  }

  onSubmit(): void {
    if (this.cattleForm.valid) {
      const newCattle: ICattle = this.cattleForm.value;
      this.cattleDataService.addCattle(newCattle);
      console.log('Cattle registered successfully!', newCattle);
    }
  }
}
