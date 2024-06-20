import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs";
import { LoaderService } from "./loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{

    constructor(public loaderService:LoaderService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        this.loaderService.show();
console.log('intercepter')

 // Ler o token do armazenamento local
 const token = localStorage.getItem('token');

 // Se o token existir, clona a requisição e adiciona o token ao cabeçalho de autorização
 if (token) {
     req = req.clone({
         setHeaders: {
             Authorization: `Bearer ${token}`
         }
     });
 }

 return next.handle(req).pipe(
     finalize(() => this.loaderService.hide())
 );

    }
}