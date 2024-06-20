import { Component,OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
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
import { IEvent } from '../../../Interface/IEvent'
import { ICattleEvent } from '../../../Interface/ICattleEvent';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CattleEventTrackerService } from '../../../services/cattle-event-tracker.service';
import { IGenericItem } from '../../../Interface/IGenericItem';

@Component({
  selector: 'app-register-cattles-event-traker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './register-cattles-event-traker.component.html',
  styleUrl: './register-cattles-event-traker.component.scss'
})
export class RegisterCattlesEventTrakerComponent {
  trackerEventForm!: FormGroup;
  typeEvent!: FormControlName;
  eventDate!: FormControlName;
  description!: FormControlName;
  cattleId!: number;
  hasCattleRegiter!: boolean;
  eventTypes!: IGenericItem[];
  private timer: any;
  weighEvent!: boolean;


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _service: CattleEventTrackerService) { }

  ngOnInit() {

    this.weighEvent = false;
    this._service.getEventType().subscribe({
      next: (_types: IGenericItem[]) => this.eventTypes = _types,
      error: (err: any) => console.error('Error fetching types:', err)
    });

    this.route.paramMap.subscribe(params => {
      this.hasCattleRegiter = !!params.get('id');
      this.cattleId = parseInt(params.get('id')!, 10);
    })

    this.initializeForm(this.cattleId);

  }

  initializeForm(_cattleId: number): void {

    this.trackerEventForm = this.fb.group({
      typeId: ['', Validators.required],
      description: ['',Validators.required],
      title: ['',Validators.required],
      cattleId: _cattleId,
      id: 0,
      isActive: true,
      date: [Date.now, Validators.required],
      createdBy: 1,
      lastUpdatedBy: null,
      createdAt: Date.now, // ou string, dependendo de como você deseja manipular datas
    });

     // Subscrição para mudanças no controle 'typeId'
     this.trackerEventForm.get('typeId')!.valueChanges.subscribe(value => {
      this.handleTypeIdChange(value);
    });
  
  }

  resetForm(): void {

    this.trackerEventForm.reset();
    this.initializeForm(this.cattleId);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
 
  redirectAfterFiveSeconds(): void {
    this.timer = setTimeout(() => {
      // Navega para a rota
      this.router.navigateByUrl(`/home/cattle/${this.cattleId}`).then(() => {
        // Força um reload completo da página após a navegação
        window.location.reload();
      });
    }, 3000); // Ajustado para 5 segundos conforme o nome da função sugere
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

    onSubmit()
    {
      if (this.trackerEventForm.valid) {

        if(this.trackerEventForm.get('typeId')?.value == 3)
          this.trackerEventForm.get('description')?.setValue(String(this.trackerEventForm.get('description')?.value)) 
        
        
        this._service.registerEvent(this.trackerEventForm.value).subscribe({
          next: (res) => {
            console.log('item registered successfully!', res)
            this.openSnackBar('item criado!', '')
            this.redirectAfterFiveSeconds();

          },   
          error: (err) => {
            console.error('Error registering user:', err)
            this.openSnackBar('Error:', err)
          }
        });
      }
    }


 
handleTypeIdChange(typeId: number): void {
console.log(`Tipo ID mudou para: ${typeId}`);
if (typeId == 3) {
  this.trackerEventForm.get('title')!.setValue('Pesagem inserida via tela');
  this.trackerEventForm.get('title')!.clearValidators();
  this.trackerEventForm.get('description')!.setValue('');

}
 else {
  this.trackerEventForm.get('title')!.setValidators([Validators.required]);
  if(this.trackerEventForm.get('title')?.value === 'Pesagem inserida via tela')
     this.trackerEventForm.get('title')!.setValue('');
}
this.trackerEventForm.get('title')!.updateValueAndValidity();
}
  
    private updateFieldValidation() {
      console.log('updateFieldValidation')

      const titleField = this.trackerEventForm.get('title');
      titleField?.setValidators([]);
      titleField?.updateValueAndValidity(); 
    }
}
