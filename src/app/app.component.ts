import {Component} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {AutoCompleteService} from './auto-complete.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AutoCompleteService]
})
export class AppComponent {
    results: Object;
    searchTerm$ = new Subject<string>();
    // component will call auto complete service
    constructor(private autoCompleteService: AutoCompleteService) {
        this.autoCompleteService.autoComplete(this.searchTerm$)
            .subscribe(results => {
                this.results = results;
            });
    }
    title = 'Basic Realtime AutoComplete - By Mohamed Husain';
}
