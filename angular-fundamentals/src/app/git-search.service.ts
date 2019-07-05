import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class GitSearchService {

  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];

  constructor(private http: HttpClient) {

  }

  gitSearch = (query: string): Promise<GitSearch> => {
    console.log('function gitSearch - query is:' + query);
    let promise = new Promise<GitSearch>((resolve, reject) => {
      console.log('Testing 2');
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query])
      }
      else {
        this.http.get('https://api.github.com/search/repositories?q=' + query)
          .toPromise()
          .then((response) => {
            resolve(response as GitSearch)
          }, (error) => {
            reject(error);
          })
      }
    })
    console.log('Testing 3');
    return promise;
  }
}