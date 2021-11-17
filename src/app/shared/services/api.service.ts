import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

export const GET = 'Get';
export const POST = 'Post';
export const CREATE = 'Create';
export const DELETE = 'Delete';
export const UPDATE = 'Update';

export const ODATA = '/odata';
export const API = '/api';
export const TOKEN = '/connect/token';
export const MOCK = '/assets';

export interface QueryParams {
  path?: string;
  odata?: OData;
  body?: any;
  login?: boolean;
  mock?: string;
}

export interface OData {
  top?: number;
  skip?: number;
  count?: boolean;
  orderby?: OrderBy;
  filter?: Filter[];
}
interface OrderBy {
  names: string[];
  order?: 'asc' | 'desc' | '';
}

interface Filter {
  property?: string;
  value?: string;
  operator?: string;
}

export abstract class ApiService {
  private readonly serviceName: string;
  private readonly apiPath: string;

  protected constructor(
    private http: HttpClient,
    apiPath: string,
    serviceName: string = ApiService.name
  ) {
    this.apiPath = apiPath;
    this.serviceName = serviceName;
  }

  get<T>(params: QueryParams): Observable<T> {
    return this.wrapRequest<T>(
      this.http.get<T>(this.getApiUrl(params) + this.getQueryOptions(params)),
      GET
    );
  }

  post<T, B>(params: QueryParams, body: B): Observable<T> {
    return this.wrapRequest<T>(
      this.http.post<T>(
        this.getApiUrl(params) + this.getQueryOptions(params),
        body
      ),
      CREATE
    );
  }

  put<T, B>(params: QueryParams, body: B): Observable<T> {
    return this.wrapRequest<T>(
      this.http.put<T>(
        this.getApiUrl(params) + this.getQueryOptions(params),
        body
      ),
      UPDATE
    );
  }

  delete<T>(params: QueryParams): Observable<T> {
    return this.wrapRequest<T>(
      this.http.delete<T>(
        this.getApiUrl(params) + this.getQueryOptions(params)
      ),
      DELETE
    );
  }

  protected getApiUrl(params: QueryParams): string {
    if (params.mock) {
      return environment.mockApiUrl + MOCK;
    } else if (params.odata) {
      return environment.apiUrl + ODATA + this.apiPath;
    } else if (params.login) {
      return environment.apiUrl + TOKEN + this.apiPath.toLowerCase();
    } else {
      return environment.apiUrl + API + this.apiPath.toLowerCase();
    }
  }

  private getQueryOptions(params: QueryParams): string {
    let url = '';
    if (params.mock) {
      url += params.mock;
    } else if (params.odata) {
      url = '?$count=true';
      if (params.odata.top) {
        url += this.buildOData('top', params.odata.top);
      }
      if (params.odata.skip) {
        url += this.buildOData('skip', params.odata.skip);
      }
      if (params.odata.orderby) {
        const orderBy = params.odata.orderby;
        url += this.buildOData(
          'orderby',
          orderBy.names.join(',') + ' ' + orderBy.order
        );
      }
      if (params.odata.filter) {
        const filter = params.odata.filter;
        const filterParams = filter
          .map((f) => `${f.property}${f.value}`)
          .join(' or ');
        url += this.buildOData('filter', filterParams);
        console.log(url);
      }
    } else if (params.login) {
    } else {
      url += params.path;
    }
    return url;
  }

  private buildFilter() {}

  // private isRuleInterface(obj: Rule | Filter): obj is Rule {
  //   return (<Rule>obj).filter !== undefined;
  // }

  private buildOData(query: string, value: any) {
    return (query && `&$${query}=${value}`) || '';
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
