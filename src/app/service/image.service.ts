import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImageService {
    constructor(private http: Http) {
    }

    // public postImage(url: string, image: File, headers?: Headers | { [name: string]: any }, partName: string = 'image', withCredentials?: boolean): Promise<any> {
    public postImage(url: string, arrBuffer: string, headers?: Headers | { [name: string]: any }, partName: string = 'image', withCredentials?: boolean): Promise<any> {
        // , customFormData?: { [name: string]: any }
        if (!url || url === '') {
            throw new Error('Url is not set! Please set it before doing queries');
        }

        const options: RequestOptionsArgs = new RequestOptions();

        if (withCredentials) {
            options.withCredentials = withCredentials;
        }

        if (headers) {
            options.headers = new Headers(headers);
        }

        return this.http.post(url, arrBuffer, options)
            .toPromise().then(res => res.json() || {})
            .catch(err => console.log(err))
    }
}
