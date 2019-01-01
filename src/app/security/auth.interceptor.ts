import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    //Colocar uma injeção de dependência direto no construtor pode causar um erro de referencia ciclica
    //constructor(private loginService: LoginService){}
    //umas das soluções: Injector ( O Injector é uma referência para um mecanismo de injeção de depêndencia do angular,
    // atravez dele é possível pegar um objeto que está registrado dentro do container de injeção de depedência do angular)
    constructor(private injector: Injector) { }

    //Request: é o request que você deseja modificar
    //Next: é o proximo interceptor ou o objeto que será responsável pela chamada final
    //Sempre que alterar o request, deve ser chamado o next dizendo: Pode continuar a requisição
    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService);
        if(loginService.isLoggedIn()){
            const authRequest = request.clone({setHeaders: {'Authorization': `bearer ${loginService.user.accessToken}`}});

            return next.handle(authRequest);
        }else{

        }        
        console.log(request);
        return next.handle(request); 
    }    
}