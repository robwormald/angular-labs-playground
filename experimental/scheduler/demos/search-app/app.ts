import {
  NgModule, Component, ViewChild, ElementRef,
  ɵdetectChanges as detectChanges,
	ɵmarkDirty as markDirty,
} from '@angular/core';

import { NgRepeat } from './repeat';
import { YouTubeAPI } from './youtube';

@Component({
  selector: 'search-app',
  template: `
	  <input type="search" #searchBox (input)="onSearch($event.target.value)"/>
	  <pre>{{currentQuery}}</pre>
	  <ul class="results">
			<li *ngRepeat="let result of results" [style.backgroundImage]="'url(' + result.snippet.thumbnails.medium.url + ')'">
				<h4>{{result.snippet?.title}}</h4>
			</li>
	  </ul>
  `,
})
export class SearchApp {

	currentQuery = '';
	results = [];

	constructor(private youtube: YouTubeAPI){}
	onSearch(value: string){
    this.results = [];
    detectChanges(this); //sync change detection
    this.youtube.search(value).then(searchResults => {
      this.results = searchResults;
      markDirty(this); //goes through the scheduler
    });
	}
}

@NgModule({
  declarations: [
		SearchApp,
		NgRepeat,
  ]
})
export class SearchAppModule { }
