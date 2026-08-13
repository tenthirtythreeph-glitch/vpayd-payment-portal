import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render checkout flow', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-checkout')).toBeTruthy();
  });

  it('should display the payment URL when it is received', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.paymentUrl = 'https://example.com/payment/123';
    app.safePaymentUrl = app['sanitizer'].bypassSecurityTrustResourceUrl(app.paymentUrl);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const iframe = compiled.querySelector('iframe');

    expect(iframe).toBeTruthy();
    expect(iframe?.getAttribute('src')).toContain('https://example.com/payment/123');
  });
});
