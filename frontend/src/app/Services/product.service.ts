/*
 * Copyright (c) 2014-2022 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly hostServer = environment.hostServer
  private readonly apiServer = environment.apiServer
  private readonly apikey = environment.apikey
  private readonly host = this.hostServer + '/api/Products'

  constructor (private readonly http: HttpClient) { }

  search (criteria: string) {
    //return this.http.get(`${this.hostServer}/rest/products/search?apikey=${this.apikey}&q=${criteria}`).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
    return this.http.get(`${this.apiServer}/rest/products/search?apikey=${this.apikey}&q=${criteria}`).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }

  find (params: any) {
    return this.http.get(this.host + '/', { params: params }).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }

  get (id: number) {
    return this.http.get(`${this.host}/${id}?d=${encodeURIComponent(new Date().toDateString())}`).pipe(map((response: any) =>
      response.data), catchError((err) => { throw err }))
  }

  put (id: number, params) {
    return this.http.put(`${this.host}/${id}`, params).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }
}
