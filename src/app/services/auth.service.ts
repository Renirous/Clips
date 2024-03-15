import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import IUser from '../models/user.model';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { delay, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection : AngularFirestoreCollection<IUser>
  public isAuthenticated$ : Observable<Boolean>
  public isAuthenticatedWithDelay$ : Observable<Boolean>

  constructor(
    private auth : AngularFireAuth,
    private db  : AngularFirestore
    ) { 
      this.usersCollection = db.collection<IUser>('users')
      this.isAuthenticated$ = auth.user.pipe(
        map((user)=> Boolean(user))
      )
      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
        delay(1000)
      )
    }


  public async crateUser(userData : IUser){
    if(!userData.password){
      throw new Error("Password is not provided!")
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, 
      userData.password as string
      ) 

    if(!userCred.user){
      throw new Error('User not found!')
    }

    await this.usersCollection.doc(userCred.user.uid).set({
      name : userData.name,
      email : userData.email,
      age : userData.age,
      phoneNumber : userData.phoneNumber
    })

    await userCred.user.updateProfile({
      displayName : userData.name
    })

  }

  public async loginUser(cerdential : IUser){
    if(!cerdential.password){
      throw new Error("Password is not provided!")
    }
    
    await this.auth.signInWithEmailAndPassword(
      cerdential.email,
      cerdential.password
    )
  }

  public async logout(){
    this.auth.signOut()
  }
}
