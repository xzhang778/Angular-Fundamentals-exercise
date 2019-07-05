import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  searchResults: GitSearch;
  searchQuery: string;
  displayQuery: string;
  title: string;
  constructor(private GitSearchService: GitSearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      console.log('ngOnInit this.searchQuery:' + this.searchQuery);
      console.log('ngOnInit this.displayQuery:' + this.displayQuery);
      this.gitSearch();
    })
    this.route.data.subscribe((result) => {
      console.log('result is : ' + JSON.stringify(result));
      console.log('result title is : ' + result.title);
      this.title = result.title
    });
  }

  gitSearch = () => {
    console.log('gitSearch this.searchQuery:' + this.searchQuery);
    this.GitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  sendQuery = () => {
    this.searchResults = null;
    console.log('sendQuery: ' + this.searchQuery);
    this.router.navigate(['/search/' + this.searchQuery])
  }

}