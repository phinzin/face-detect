import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class DataService {
  private url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender';

  constructor(private http: Http) { }

  getPersonAge(imageUrl: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'cf3006aaaf274226b66af23faf00b4df',
    });
    const options = new RequestOptions({ headers });
    return this.http.post(this.url, { url: imageUrl }, options)
      .map((data) => {
        return data.json();
      })
      .do(result => console.log(result))
  }

}
