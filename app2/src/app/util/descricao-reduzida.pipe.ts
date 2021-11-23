import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
  transform(texto: string, truncarEm: number, iniciarEm: number) {
    if (texto.length > 5) {
      return texto.slice(iniciarEm, truncarEm) + '...'
    }

    return texto
  }
}
