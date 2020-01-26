import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionHandlerService {
    public servicesSubscriptions: Subscription[] = [];

    pushSubscription(subscription): void {
        this.servicesSubscriptions.push(subscription);
    }

    clearSubscriptions(): void {
        if (this.servicesSubscriptions) {
            this.servicesSubscriptions.forEach(sub =>
                sub.unsubscribe());
        }
    }
}
