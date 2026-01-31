import { Component, OnInit } from '@angular/core';
import { TradeService } from '../core/trade.service';
import { Trade } from './trade.model';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
})
export class TradeListComponent implements OnInit {
  trades: Trade[] = [];
  loading = false;

  filters = {
    side: '',
    type: '',
    status: '',
  };

  page = 1;
  limit = 20;

  constructor(private tradeService: TradeService) {}

  ngOnInit(): void {
    this.loadTrades();
  }

  loadTrades(): void {
    this.loading = true;
    const params = { ...this.filters, page: this.page, limit: this.limit };

    this.tradeService.getTrades(params).subscribe({
      next: data => {
        this.trades = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
