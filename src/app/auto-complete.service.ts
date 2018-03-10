import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Injectable()
export class AutoCompleteService {

    NyTimes = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';


    constructor(private http: Http) {
    }
    // auto complete method created to limit the api requests
    autoComplete(terms: Observable<string>) {
        return terms.debounceTime(650)
            .distinctUntilChanged()
            .switchMap(term => this.realtimeSearch(term));
    }

    // this function to call remote api
    realtimeSearch(term) {
        const params = {'api-key': 'b1bd98e13f8a4f36b1eadd619bfd66c9', 'q': term};
        return this.http.get(this.NyTimes, {params})
            .map((res: any) => res.json());
    }
}

