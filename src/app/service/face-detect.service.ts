// import { Injectable } from '@angular/core';

// @Injectable()
// export class FaceDetectService {

//   constructor() { }

// }
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FaceDetectService {
  private url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender';

  constructor(private http: Http) {
  }

  public detectByImage(url: string, arrBuffer: string, headers?: Headers | { [name: string]: any }, partName: string = 'image', withCredentials?: boolean): Promise<any> {
  // public detectByImage(arrBuffer: string): Promise<any> {
    // , customFormData?: { [name: string]: any }
    if (!this.url || this.url === '') {
      throw new Error('Url is not set! Please set it before doing queries');
    }

    const options: RequestOptionsArgs = new RequestOptions();

    if (withCredentials) {
      options.withCredentials = withCredentials;
    }

    if (headers) {
      options.headers = new Headers(headers);
    }

    return this.http.post(this.url, arrBuffer, options)
      .toPromise().then(res => res.json() || {})
      .catch(err => err)
  }

  public detectByURL(imageUrl: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'cf3006aaaf274226b66af23faf00b4df',
    });
    const options = new RequestOptions({ headers });
    return this.http.post(this.url, { url: imageUrl }, options)
      .toPromise()
      .then((data) => {
        return data.json();
      })
  }
}
