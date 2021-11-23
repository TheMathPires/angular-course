import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import '../util/rxjs-extensions'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.sass'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .debounceTime(1000) //executa a ação do switchMap após 1s
      .distinctUntilChanged() //para fazer pesquisas distintas
      .switchMap((termo: string) => {

        if (termo.trim() === '') {
          //retornar um observable de array de ofertas vazio
          return Observable.of(<Oferta[]>([]))
        }

        return this.ofertasService.pesquisaOfertas(termo)
      })
      .catch((err: any) => {
         return Observable.of<Oferta[]>([])
      })
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): any {
    console.log('teste')
    return this.subjectPesquisa.next()
  }
}
