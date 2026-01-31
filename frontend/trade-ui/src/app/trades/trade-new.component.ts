import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TradeService } from '../core/trade.service';

@Component({
  selector: 'app-trade-new',
  templateUrl: './trade-new.component.html',
})
export class TradeNewComponent {
  form = this.fb.group({
    side: ['', Validators.required],
    type: ['', Validators.required],
    amount: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    price: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,5})?$/)],
    ],
    status: ['open'],
    pair: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private tradeService: TradeService,
    private router: Router
  ) {}

  submit(): void {
    if (this.form.invalid) return;

    this.tradeService.createTrade(this.form.value as any).subscribe(() => {
      this.router.navigate(['/trades']);
    });
  }
}
