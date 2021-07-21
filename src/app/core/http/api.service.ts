import { HttpClient, HttpParams } from '@angular/common/http';
import { Global } from '@shared/global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class ApiService {
  private http: HttpClient;
  private baseUrl: string = environment.apiUrl;

  constructor() {
    this.http = Global.Injector.get(HttpClient);
  }

  protected _get<T>(
    endpoint: string,
    params: any = null,
    mappingKey: string = null
  ): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      params: this.getHttpParams(params)
    }).pipe(
      map((res: any) => {
        return !mappingKey ? res : (res[mappingKey] as T);
      })
    );
  }

  protected _post<T>(
    endpoint: string,
    data: any,
    params: any = null,
    mappingKey: string = null
  ): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      params: this.getHttpParams(params)
    }).pipe(
      map((res: any) => {
        return !mappingKey ? res : (res[mappingKey] as T);
      })
    );
  }

  protected _put<T>(
    endpoint: string,
    data: any,
    params: any = null,
    mappingKey: string = null
  ): Observable<T> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, {
      params: this.getHttpParams(params)
    }).pipe(
      map((res: any) => {
        return !mappingKey ? res : (res[mappingKey] as T);
      })
    );
  }

  protected _patch<T>(
    endpoint: string,
    data: any,
    params: any = null,
    mappingKey: string = null
  ): Observable<T> {
    return this.http.patch(`${this.baseUrl}/${endpoint}`, data, {
      params: this.getHttpParams(params)
    }).pipe(
      map((res: any) => {
        return !mappingKey ? res : (res[mappingKey] as T);
      })
    );
  }

  protected _delete<T>(
    endpoint: string,
    params: any = null,
    mappingKey: string = null
  ): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      params: this.getHttpParams(params)
    }).pipe(
      map((res: any) => {
        return !mappingKey ? res : (res[mappingKey] as T);
      })
    );
  }

  private getHttpParams(params: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    if (params) {
      Object.keys(params).map((x: string) => {
        httpParams = httpParams.set(x, params[x]);
      });
    }
    return httpParams;
  }
}
