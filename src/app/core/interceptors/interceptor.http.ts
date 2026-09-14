import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn)=>{
    const token = localStorage.getItem('user_token');

    if(token){
        const secReq = req.clone({
            setHeaders:{
                Authorization:`Bearer ${token}`
            }
        });
        return next(secReq)
    }

    return next(req)
}