import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'


export class ErrorHandler {

    //este método recebe um atributo do tipo Response ou qualquer outro tipo
    static handleError(error: HttpErrorResponse | any) {
        let errorMessage: string

        if (error instanceof HttpErrorResponse) {
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText} ${error.error}`
        } else {
            errorMessage = error.toString()
        }

        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}