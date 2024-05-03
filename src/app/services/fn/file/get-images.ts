/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetImages$Params {
  'book-id': number;
  fileName: string;
}

export function getImages(http: HttpClient, rootUrl: string, params: GetImages$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
  const rb = new RequestBuilder(rootUrl, getImages.PATH, 'get');
  if (params) {
    rb.path('book-id', params['book-id'], {});
    rb.path('fileName', params.fileName, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'image/png', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<string>>;
    })
  );
}

getImages.PATH = '/get-images/{book-id}/{fileName}';
