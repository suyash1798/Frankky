import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const token = this.tokenService.GetToken();
    if (token) {
      headersConfig['Authorization'] = `beader ${token}`;
    }
    const _req = req.clone({setHeaders: headersConfig});
    console.log(_req);
    return next.handle(_req);
  }
}
