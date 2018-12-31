import { LoginService } from 'app/security/login/login.service';
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) { }

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn;
    }

    //Método responsável por validar se o module deve ser ou não carregado
    //IMPORTANTE: Vale para carregamento de modulos
    canLoad(route: Route): boolean { //configuração da rota que o guard está associado
        return this.checkAuthentication(route.path);
    }

    //ActivatedRouteSnapshot é uma foto da rota
    //RouterStateSnapshot é a arvore de rotas
    //CHAMADO TODA VEZ, APÒS O CARREGAMENTO DO MODULO
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }
}