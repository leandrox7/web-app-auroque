import { Component, OnInit, Input } from '@angular/core';
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
import {MatStepperModule} from '@angular/material/stepper';
import { CattleEventTrackerService } from '../../../services/cattle-event-tracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICattleEvent } from '../../../Interface/ICattleEvent';
import { Console } from 'console';
import { IEvent } from '../../../Interface/IEvent';
import { IEventType } from '../../../Interface/IEventType';

@Component({
  selector: 'app-register-cattles-history',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatStepperModule],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  templateUrl: './register-cattles-history.component.html',
  styleUrl: './register-cattles-history.component.scss'
})
export class RegisterCattlesHistoryComponent {
  isEdition!: boolean;
  events !: ICattleEvent[];
  eventTypes !: IEventType[];

  @Input() title = "";
  @Input() isReprodutive: any;


  constructor( 
    private eventService: CattleEventTrackerService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {

 


    this.route.paramMap.subscribe(params => {
      this.isEdition = !!params.get('id');

      if (this.isEdition) {
        const cattleId = parseInt(params.get('id')!, 10);
        console.log("id:" + cattleId)
        this.eventService.getEventsbyCattle(cattleId).subscribe({
          next: (events: ICattleEvent[]) => {
            this.events = events;
            this.filterReproductiveEvents();
          },
          error: err => console.error('Error fetching events:', err)
        });

        this.eventService.getEventType().subscribe({
          next: (eventTypes: IEventType[]) => {
            this.eventTypes = eventTypes;
            this.filterReproductiveEvents(); // Chama novamente para garantir que o filtro é aplicado após carregar os tipos de evento
          },
          error: err => console.error('Error fetching event types:', err)
        });
      }
    });
  }

  filterReproductiveEvents(): void {
    if (this.isReprodutive && this.eventTypes) {
      const reproductiveEventTypeIds = this.eventTypes
        .filter(eventType => eventType.isReproductive)
        .map(eventType => eventType.id);

      this.events = this.events.filter(event => reproductiveEventTypeIds.includes(event.typeId));
    }
  }
}