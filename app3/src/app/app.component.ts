import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'app3';

  ngOnInit(): void {

    const firebaseConfig: Object = {
      apiKey: "AIzaSyAYZz4yq4KAWmmZLaMkY7hs2K2VERalB6k",
      authDomain: "jta-instagram-clone-3f61a.firebaseapp.com",
      projectId: "jta-instagram-clone-3f61a",
      storageBucket: "jta-instagram-clone-3f61a.appspot.com",
      messagingSenderId: "248161503805",
      appId: "1:248161503805:web:a0bbd48cf38f910c5a3854"
    }

    firebase.initializeApp(firebaseConfig)
  }

}
