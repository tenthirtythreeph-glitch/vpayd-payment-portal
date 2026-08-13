import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutPayload } from './checkout/checkout.component';

@Injectable({
  providedIn: 'root',
})
export class CheckoutApiService {
  // private readonly apiUrl = 'https://n9oeax2a74.execute-api.us-east-1.amazonaws.com/dev/api/pay';
  // private readonly apiUrl = 'https://payamo.vercel.app/api/payment/intent';
  private readonly apiUrl = 'http://localhost:3000/api/payments/card';

  constructor(private readonly http: HttpClient) {}

  sendCheckout(payload: CheckoutPayload): Observable<CheckoutPayload> {
    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json; charset=UTF-8'
    // });
    console.log('Sending checkout payload:', payload);
    // return this.http.get<CheckoutPayload>(`${this.apiUrl}?amount=${payload.amount}&orderid=${payload.orderid}`, {});
    return this.http.post<CheckoutPayload>(this.apiUrl, payload);
  }
}
