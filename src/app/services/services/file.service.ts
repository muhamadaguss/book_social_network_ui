/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getImages } from '../fn/file/get-images';
import { GetImages$Params } from '../fn/file/get-images';

@Injectable({ providedIn: 'root' })
export class FileService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getImages()` */
  static readonly GetImagesPath = '/get-images/{book-id}/{fileName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImages$Response(params: GetImages$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getImages(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getImages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImages(params: GetImages$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getImages$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

}
