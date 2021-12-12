import firebase from 'firebase/compat/app';
import 'firebase/database';

export class Bd {
  public publicar(publicacao: any): void {
    firebase.database().ref(`publicacoes/${btoa(publicacao.titulo)}`)
      .push({ titulo: publicacao.titulo })

    console.log(publicacao)

    //console.log('Chegamos até o serviço responsável pelo controle de dados')
  }
}
