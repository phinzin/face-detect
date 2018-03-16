import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from "./service/data.service";
import { FaceRecognitionService } from "./service/face-recognition-service";
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  imageUrl: string = "";
  personAge: string;
  personCount: string;
  filesToUpload: Array<File>;
  // @ViewChild('inputImageUrl') inputImageUrl;
  // @ViewChild('inputImage') inputImage: ElementRef;
  constructor(private _http: Http, private data: DataService, private faceRecognitionService: FaceRecognitionService) {
    // this.imageUrl = '';
    this.filesToUpload = [];
  }
  getPersonAge(event) {
    this.imageUrl = event.target.value;
    this.data.getPersonAge(this.imageUrl).subscribe(data => {
      this.personAge = data;
      this.personCount = data.length;
    });
  }

  //
  values = '';

  onKey(event: any) { // without type info
    this.values = event.target.value;
    this.imageUrl = event.target.value;
  }

  // 
  test(e) {
    // let file = e.srcElement.files;
    // console.log(e.target.value);
    console.log(e.target.files);
    this.filesToUpload = <Array<File>>e.target.files;
    console.log(this.filesToUpload);
    let formData = new FormData();
    formData.append('file[]', e.target.files.item(0));
    // console.log(this.inputImage.nativeElement.files)
    this.faceRecognitionService.detect(formData)
      // .then(result => console.log(result))
      .subscribe(data => {
        this.personAge = data;
        this.personCount = data.length;
      });
  }

  //
  private apiBaseUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender'; //this is a fake url. Put in your own API url.
  headers: Headers = new Headers();
  handleInputChange(event) {

    var image = event.target.files[0];

    var pattern = /image-*/;
    // var reader = new FileReader();
    // 
    let reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      let result = (<any>event.target).result;
      // fileItem['_thumbUrl'] = result;
      console.log(1111)
      console.log(result)
    }, false);
    // reader.readAsDataURL(fileItem._file);
    // 
    if (!image.type.match(pattern)) {
      console.error('File is not an image');
      //of course you can show an alert message here
      return;
    }

    let endPoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender'; //use your own API endpoint
    let headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Ocp-Apim-Subscription-Key', 'cf3006aaaf274226b66af23faf00b4df');
    headers.set('Upload-Content-Type', image.type)

    this.makeRequest(endPoint, 'POST', image, headers).subscribe(
      response => { this.handleSuccess(response); },
      error => { this.handleError(error); }
    );

  }

  /**
   * Makes the HTTP request and returns an Observable
   */
  private makeRequest(endPoint: string,
    method: string, body = null,
    headers: Headers = new Headers()): Observable<any> {
    let url = this.apiBaseUrl + endPoint;
    this.headers = headers;
    if (method == 'GET') {
      let options = new RequestOptions({ headers: this.headers });
      return this._http.get(url, options)
        .map(this.extractData)
        .catch(this.extractError);
    } else if (method == 'POST') {
      let options = new RequestOptions({ headers: this.headers });
      return this._http.post(url, body, options)
        .map(this.extractData)
        .catch(this.extractError);
    }
  }
  /**
  * Extracts the response from the API response.
  */
  private extractData(res: Response) {
    let body = res.json();
    console.log(body)
    return body.response || {};
  }

  private extractError(res: Response) {
    console.log(res);
    let errMsg = 'Error received from the API';
    return errMsg;
  }

  private handleSuccess(response) {
    console.log(response)
    // console.log('Successfully uploaded image');
    // console.log(response);
    //provide your own implementation of handling the response from API
  }

  private handleError(errror) {
    console.error('Error uploading image')
    console.log(errror)
    //provide your own implementation of displaying the error message
  }

  private image
  changeListener(event): void {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let newFile;
      let fr = new FileReader();
      fr.onload = (event: any) => {
        let base64 = event.target.result
        let img = base64.split(',')[1]
        let blob = new Blob([window.atob(img)], { type: 'image/jpeg' })
        // newFile = this.blobToFile(blob,'test')
        // console.log(blob);
        // console.log(base64);
        this.faceRecognitionService.detect(blob)
          .map(result => console.log(result));
      }
      fr.readAsDataURL(file)
      console.log(file)
      console.log(newFile)
      // this.service.upload(newFile).subscribe()
      //			this.faceRecognitionService.detect
    }
  }

  readThis(inputValue: any): void {
    console.log(inputValue)
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
    console.log(this.image);
    console.log(111111);
    console.log(file);
  }
}
