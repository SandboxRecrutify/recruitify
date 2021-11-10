import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const GET = 'Get';
export const POST = 'Post';
export const CREATE = 'Create';
export const DELETE = 'Delete';
export const UPDATE = 'Update';

export abstract class ApiService {
  private readonly serviceName: string;
  private readonly apiPath: string;
  private readonly isMock: boolean = false;

  protected constructor(
    private http: HttpClient,
    apiPath: string,
    serviceName: string = ApiService.name,
    isMock: boolean = false
  ) {
    this.isMock = isMock;
    this.apiPath = apiPath;
    this.serviceName = serviceName;
  }

  get<T>(params: string = ''): Observable<T> {
    return this.wrapRequest<T>(
      this.http.get<T>(this.getApiUrl() + params),
      GET
    );
  }

  createData<T, B>(url: string, body: B): Observable<T> {
    return this.wrapRequest<T>(
      this.http.post<T>(this.getApiUrl(), body),
      CREATE
    );
  }

  updateData<T, B>(url: string, body: B): Observable<T> {
    return this.wrapRequest<T>(
      this.http.put<T>(this.getApiUrl(), body),
      UPDATE
    );
  }

  deleteData<T>(url: string): Observable<T> {
    return this.wrapRequest<T>(this.http.delete<T>(this.getApiUrl()), DELETE);
  }

  protected getApiUrl(): string {
    return (
      (this.isMock ? environment.mockApiUrl : environment.apiUrl) + this.apiPath
    );
  }

  private wrapRequest<T>(
    observable: Observable<T>,
    info: string = 'ApiService logger'
  ): Observable<T> {
    return observable.pipe(
      tap(
        (result) => {
          this.log(result, info);
        },
        (error) => {
          this.log(error, info);
        }
      )
    );
  }

  private log(message: any, method: string) {
    if (!environment.production) {
      console.group(method + ' [' + this.serviceName + ']:');
      console.info(message);
      console.groupEnd();
    }
  }
}
