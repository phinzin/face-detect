import { Component, ViewChild, ElementRef } from '@angular/core';
import { FaceRecognitionService } from "./service/face-recognition-service";
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { DataService } from "./service/data.service";
import { ImageService } from './service/image.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


export interface FileHolder {
  file: File;
  PersonQuantity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  // private uploadURL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender';

  // 
  public isShow: boolean = false;
  title = 'app';
  imageUrl: string = "";
  personAge: string;
  personCount: string;
  private fileHolder: Array<FileHolder> = [];
  private fileListTemp: Array<File> = [];
  private fileCounterTemp: Array<number> = [];
  constructor(private imageService: ImageService, private _http: Http, private data: DataService, private faceRecognitionService: FaceRecognitionService) {
  }
  getPersonAge(event) {
    this.imageUrl = event.target.value;
    this.data.getPersonAge(this.imageUrl).subscribe(data => {
      this.personAge = data;
      this.personCount = data.length;
    });
  }

  private apiBaseUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender'; //this is a fake url. Put in your own API url.
  private headers = {
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': 'cf3006aaaf274226b66af23faf00b4df',
  }
  // headers: Headers = new Headers();
  onFileChange(files: FileList) {
    console.log('files:', files)
    for (let i = 0; i < files.length; i++) {
      // this.files[i] = files[i];
      const file = files[i];
      console.log('before reader!');
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        //this.isShow = false;
        console.log('reader - before call service!');
        let arrBuffer = event.target.result;
        this.imageService
          .postImage(this.apiBaseUrl, arrBuffer, this.headers, "", false)
          .then(result => {
            console.log('image servic - done!:', i);
            console.log(result.length);
            this.fileCounterTemp[i] = result.length || 0;
            console.log('all done!', this.fileListTemp, this.fileCounterTemp);
            this.isShow = true;
          })
      }, false);
      // 

      reader.readAsArrayBuffer(file);
      let reader1 = new FileReader();
      reader1.addEventListener('loadend', (event: any) => {
        //this.isShow = false;
        console.log('reader loadend');
        this.fileListTemp[i] = event.target.result;
       
        this.isShow = true;
      }, false);
      reader1.readAsDataURL(file);
      console.log('after reader!');
    }

  }

}
