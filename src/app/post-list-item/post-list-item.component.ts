import { Component, Input, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Subscription} from "rxjs";

class Post {
}

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})


export class PostListItemComponent implements OnInit {

	posts: Post[];
  @Input() post: any;
	@Input() indexOfPost: number;
	@Input() loveIts: number;
	created_at: Date;
  postsSubscription: Subscription;


	constructor(private postService: PostService) {	}

	ngOnInit() {

    this.postsSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPostSubject();

    this.created_at = new Date;
  }

	onLovePlus() {
	  this.postService.increaseLoveits(this.indexOfPost);
	}

	onLoveMoins() {
		this.postService.decreaseLoveits(this.indexOfPost);
	}

	onDeletePost(post: Post) {
	  this.postService.removePost(this.post);
  }

}
