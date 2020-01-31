import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {PostService} from '../services/post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})

export class PostlistComponent implements OnInit, OnDestroy {

posts: any[];
postSubscription: Subscription;


	constructor(private postService: PostService) { }

	ngOnInit() {
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: any[]) => {
      this.posts = posts;
    }
    );
    this.postService.emitPostSubject();
  }

  onSave() {
	  this.postService.savePostsToServer();

  }

  onFetch() {
	  this.postService.getPostsFromServer();
  }

  ngOnDestroy() {
	  this.postSubscription.unsubscribe();
  }
}
