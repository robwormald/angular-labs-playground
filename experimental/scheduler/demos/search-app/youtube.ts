import {Injectable} from '@angular/core';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyAfCZSPw143gyCtFT-l60wrWxTIbpXSoTI';

@Injectable({providedIn: 'root'})
export class YouTubeAPI {
  constructor(){}

  search(query){
    return fetch(`${BASE_URL}?q=${query}&part=snippet&maxResults=50&key=${API_TOKEN}`)
	  .then((res:Response) => res.json())
	  .then(results => results.items);
  }
}
