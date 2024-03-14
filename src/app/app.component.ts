import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'APICalling';

  apiData! : Observable<any>

  constructor(private http: HttpClient) {

    this.http.get<any>('assets/example.json')
    .subscribe(resData => {
      console.log("Normal API Call:  ",resData);
    });

    this.http.get<any>('assets/example.json')
    .pipe(map(resData => {
      return resData.results;
    }))
    .subscribe(transformedData => {
      console.log("Specific API Call:  ",transformedData);
    });

    this.http.get<any>('assets/example.json')
    .pipe(map(resData => {
      return resData.results.map((custom: { name: any; }) => custom.name);
    }))
    .subscribe(transformedData => {
      console.log("Customized Desired API Call:  ",transformedData);
    });


    // this.apiData = this.http.get('assets/example.json');

    // console.log("Api=>"+this.apiData)

    // this.apiData.pipe(
    //   map(data=>data.filter((data:any)=>{
    //     console.log("Filter=>"+data.name)
    //     return data.result.name == "Luke Skywalker";
    //   }))
    // ).subscribe(res=>{
    //   console.log("Observables"+res);
    // })
  }



}
