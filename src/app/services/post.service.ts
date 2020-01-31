import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

class Post {
}

@Injectable()
export class PostService {

  postSubject = new Subject<any[]>();

  private posts = [];

  constructor(private httpClient: HttpClient) {
  }


  emitPostSubject() {
    this.postSubject.next(this.posts.slice());
  }

  increaseLoveits(index: number) {
    this.posts[index].loveIts += 1;
    this.emitPostSubject();
  }

  decreaseLoveits(index: number) {
    this.posts[index].loveIts -= 1;
    this.emitPostSubject();
  }

  addPost(title: string, content: string) {
    const postObject = {
      title: '',
      content: '',
      loveIts: 0,
      created_at: Date
    }
    postObject.title = title;
    postObject.content = content;
    this.posts.push(postObject);
    this.emitPostSubject();
  }

  savePostsToServer() {
    this.httpClient
      .put('https://backend-blog-6ad4f.firebaseio.com/posts.json', this.posts)
      .subscribe(
        () => {
          console.log('Enregistrement terminé');
          (error) => {
            console.log('Erreur de sauvegarde' + error);
          };
        }
      );
  }

  getPostsFromServer() {
    this.httpClient.get<[]>('https://backend-blog-6ad4f.firebaseio.com/posts.json')
      .subscribe(
        (response) => {
          this.posts = response;
          this.emitPostSubject();
        },
        (error) => {
          console.log('Erreur de récupération des données' + error);
        }
      );
  }



  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postE1) => {
        if(postE1 === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.emitPostSubject();
  }

  }
