import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"

import { url_API } from "./app.api"

import { Pedido } from "./shared/pedido.model"

@Injectable()
export class OrdemCompraService {

  constructor(
    private http: HttpClient
  ) {}

  public efetivarCompra(pedido: Pedido): Observable<number> {
    let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    });

    return this.http.post(`${url_API}/pedidos`, JSON.stringify(pedido), { headers: httpHeaders })
      .map((resposta: any) => resposta.id)
  }
}
