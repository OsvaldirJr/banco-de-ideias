import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) =>{
    const router = inject(Router);
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse)=>{
            const detalhe = error.error?.erro ?? error.message;
            let errorMessage = '';

            switch(error.status){
                case 401:
                    router.navigate(['/login']);
                    errorMessage = `Unauthorized error: ${detalhe}`;
                    break;
                case 404:
                    errorMessage = `Not found error: ${detalhe}`;
                    break;
                case 500:
                    errorMessage = `Internal server Error: ${detalhe}`;
                    break;
                default:
                    errorMessage = `other error Status ${error.status}, Error: ${detalhe}`;
            }

            console.log(errorMessage);
            return throwError(()=> new Error(errorMessage, { cause: error }))
        })
    )

}
