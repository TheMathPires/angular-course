import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import CarrinhoService from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.sass'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra!: number
  public itensCarrinho: ItemCarrinho[] = []

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(
    private ordemCompraService: OrdemCompraService,
    public carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log(this.itensCarrinho)
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      console.log('Formulário está inválido')

      this.formulario.controls.endereco.markAllAsTouched()
      this.formulario.controls.numero.markAllAsTouched()
      this.formulario.controls.complemento.markAsTouched()
      this.formulario.controls.formaPagamento.markAllAsTouched()

    } else {

      if (this.carrinhoService.exibirItens().length === 0) {
        alert('Você não selecionou nenhum item!')
      } else {
        let pedido: Pedido = new Pedido(
          this.formulario.controls.endereco.value,
          this.formulario.controls.numero.value,
          this.formulario.controls.complemento.value,
          this.formulario.controls.formaPagamento.value,
          this.carrinhoService.exibirItens()
        )

        console.log(pedido)

        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedidoCompra: number) => {
            this.idPedidoCompra = idPedidoCompra
            this.carrinhoService.limparCarrinho()
          })
      }
    }
  }
}
