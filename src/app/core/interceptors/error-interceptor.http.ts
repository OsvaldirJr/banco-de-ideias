import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) =>{
    let errorMessage = ''
    return next(req).pipe(
        catchError((error: HttpErrorResponse)=>{
            switch(error.status){
                case 401:
                    //redirect to login
                    console.log(`Unauthorazed error: ${error.error.erro}`)
                    break;
                case 404:
                    console.log(`Not found error: ${error.error.erro}`)
                    break;
                case 500:
                    console.log(`Internal server Error: ${error.error.erro}`)
                    break;
                default:
                    console.log(`other error Status ${error.status}, Error: ${error.error.erro}`)
                
            } 
            return throwError(()=> new Error())  
        })
    )
    
}