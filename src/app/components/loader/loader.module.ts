import { NgModule } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    })
  ],
  exports: [
    NgxLoadingModule  // Exportar para uso em outros lugares
  ]
})
export class LoaderModule { }
