import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})


export class PostListItemComponent implements OnInit {

	@Input() post: any;
	loveIts: number;
	created_at: Date;


	constructor() {

		this.loveIts = 0;
		this.created_at = new Date;
	}

	ngOnInit() {  }

	onLovePlus() {
	  	this.loveIts +=1;
	}

	onLoveMoins() {
		this.loveIts -=1;
	}
}
