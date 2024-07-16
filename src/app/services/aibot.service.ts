import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseAddress = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class AibotService {

  GetHttpHeaders() : HttpHeaders {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return headers;
  }
  constructor(private http: HttpClient, public router: Router) {}
  
  getQueryResponse(data: any): Observable<any> {
    return this.http.post<any>(baseAddress + "/ChatBot/Conversation", data, { headers: this.GetHttpHeaders() });
  }
}
