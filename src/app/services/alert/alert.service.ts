import { Injectable, HostListener , Output, EventEmitter} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: any, keepAfterNavigationChange = false) {
    //    this.keepAfterNavigationChange = keepAfterNavigationChange;
    //    this.subject.next({ type: 'error', text: message });
        console.log('alert.service message');
        this.change.emit(message);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
