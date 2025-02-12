import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';
import { PaymentSummary } from '../models/order';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {

  transform(value?: ConfirmationToken['payment_method_preview'] | PaymentSummary, ...args: unknown[]): unknown {

    if (value && 'card' in value) {

      const { brand, exp_month, exp_year, last4 } =
        (value as ConfirmationToken['payment_method_preview']).card!;

      return `${brand.toUpperCase()} **** **** **** ${last4}, Exp: ${exp_month}/${exp_year}`;

    } else if (value && 'brand' in value) {

      const { brand, expMonth, expYear, last4 } = value as PaymentSummary;

      return `${brand.toUpperCase()} **** **** **** ${last4}, Exp: ${expMonth}/${expYear}`;
    }

    else {
      return 'Unknown payment';
    }

  }

}
