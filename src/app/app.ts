import { Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckoutComponent, CheckoutPayload } from './checkout/checkout.component';
import { CheckoutApiService } from './checkout-api.service';
import { ErrorModal } from './error-modal/error-modal';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, CheckoutComponent, ErrorModal],
  templateUrl: './app.html',
})
export class App {
  @ViewChild(ErrorModal) errorModal!: ErrorModal;

  paymentUrl: string | null = null;
  safePaymentUrl: SafeResourceUrl | null = null;

  constructor(
    private readonly checkoutApi: CheckoutApiService,
    private readonly sanitizer: DomSanitizer,
  ) {}

  onCheckoutComplete(payload: CheckoutPayload): void {
    this.checkoutApi.sendCheckout(payload).subscribe({
      next: (response: any) => {
        const paymentUrl = response?.data?.data?.payment_url as string | undefined;
        this.setPaymentUrl(paymentUrl ?? null);
        if(paymentUrl) {
          window.open(paymentUrl, '_blank');
        }
      },
      error: (error: any) => {
        console.error('Checkout failed:', error);
        const message = error?.error?.operation?.error_message || error?.message || 'An unexpected error occurred during checkout.';
        this.errorModal.show(message);
      },
    });
  }

  private setPaymentUrl(url: string | null): void {
    this.paymentUrl = url;
    this.safePaymentUrl = url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }
}
