import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trade } from '../trades/trade.model';

@Injectable({ providedIn: 'root' })
export class TradeService {
  private readonly baseUrl = 'http://localhost:3000/trade_orders';

  constructor(private http: HttpClient) {}

  getTrades(filters?: {
    side?: string;
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Observable<Trade[]> {
    let params = new HttpParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<Trade[]>(this.baseUrl, { params });
  }

  createTrade(trade: Trade): Observable<Trade> {
    return this.http.post<Trade>(this.baseUrl, trade);
  }
}
