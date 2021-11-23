import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Oferta } from "./shared/oferta.model";
import { url_API } from "./app.api";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/retry";

@Injectable()
export class OfertasService {

  constructor(private http: HttpClient) {}

  public getOfertas(): Promise<Oferta[]> {
    return this.http.get(`${url_API}/ofertas?destaque=true`)
      .toPromise()
      .then((resposta: any) => resposta)
  }

  public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
    return this.http.get(`${url_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((resposta: any) => resposta)
  }

  public getOfertasPorId(id: string): Promise<Oferta[]> {
    return this.http.get(`${url_API}/ofertas?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        return resposta.shift()
      })
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${url_API}/como-usar?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        return resposta.shift().descricao
      })
  }

  public getOndeFicaPorId(id: number): Promise<string> {
    return this.http.get(`${url_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        return resposta.shift().descricao
      })
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(`${url_API}/ofertas?descricao_oferta_like=${termo}`)
      .retry(10)
      .map((resposta: any) => resposta)
  }

}
