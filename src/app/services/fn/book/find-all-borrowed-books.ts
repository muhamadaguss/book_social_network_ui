/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBorrowedBooksResponse } from '../../models/page-response-borrowed-books-response';

export interface FindAllBorrowedBooks$Params {
  page?: number;
  size?: number;
  sort_column?: string;
  sort_direction?: string;
  search?: string;
}

export function findAllBorrowedBooks(http: HttpClient, rootUrl: string, params?: FindAllBorrowedBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedBooksResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllBorrowedBooks.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('sort_column', params.sort_column, {});
    rb.query('sort_direction', params.sort_direction, {});
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBorrowedBooksResponse>;
    })
  );
}

findAllBorrowedBooks.PATH = '/book/borrowed';
