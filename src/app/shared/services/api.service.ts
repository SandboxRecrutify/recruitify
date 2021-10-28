import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  constructor(private http: HttpClient) {}

   readData<T>(url: string): Observable<T> {
    return this.http.get<T>(url)
    // return this.http.get<T>(`${this.getApiUrl()}${url}`)
    // .pipe(map(result => result as T));
  }

  createData<T>(url: string): Observable<T> {
    return this.http.post<T>(url, {})
  }

  updateData<T>(url: string): Observable<T> {
    return this.http.put<T>(url, {})
  }

  deleteData<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, {})
  }

  protected getApiUrl(): string {
    return environment.url;
  }
}
