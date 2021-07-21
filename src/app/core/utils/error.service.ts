import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

class ErrorMessage {
	title: string;
	message: string;
}

@Injectable({
	providedIn: 'root'
})
export class ErrorService {
	errorSubject: BehaviorSubject<ErrorMessage> = new BehaviorSubject<ErrorMessage>(null);

	storeError(error: ErrorMessage): void {
		this.errorSubject.next(error);
	}

	getError(): Observable<ErrorMessage> {
		return this.errorSubject.asObservable();
	}
}
