import { Usuario } from "./acesso/usuario.model";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export class Autenticacao {
  public cadastrarUsuario(usuario: Usuario): void {
    console.log('Chegamos até o serviço: ', usuario)

    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        console.log(resposta)
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }
}
