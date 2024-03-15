import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  private clipsCollection : AngularFirestoreCollection<IClip>

  constructor(
    private db : AngularFirestore,
    private auth : AngularFireAuth,
    private storage : AngularFireStorage
  ) { 
    this.clipsCollection = db.collection<IClip>('clips')
  }

  public createClip(data : IClip) : Promise<DocumentReference<IClip>>{
    return this.clipsCollection.add(data)
  }

  public getUserClips($sort$ : BehaviorSubject<string>){
    return combineLatest([
      this.auth.user,
      $sort$
    ]).pipe(
      switchMap((value)=>{
          const [user , sort] = value

          if(!user){
            return of([])
          }
          
          const query = this.clipsCollection.ref.where('uid', '==', user.uid).orderBy('timeStamp', sort === '1' ? 'desc' : 'asc' )

          return query.get()
      }),
      map((snapshot)=>{
          return (snapshot as QuerySnapshot<IClip>).docs
      })
    )
  }

  public async updateClip(docId : string , title : string){
    await this.clipsCollection.doc(docId).update({
      title : title
    })
  }

  public async deleteClip(clip :IClip){
    const clipRef = this.storage.ref(`clips/${clip.fileName}`)
    await clipRef.delete()

    await this.clipsCollection.doc(clip.docId).delete()
    
  }
}
