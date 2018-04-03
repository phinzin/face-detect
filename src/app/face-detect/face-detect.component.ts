import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceDetectService } from "../service/face-detect.service";

@Component({
  selector: 'app-face-detect',
  templateUrl: './face-detect.component.html',
  styleUrls: ['./face-detect.component.css']
})
export class FaceDetectComponent implements OnInit {
  public isLocal:boolean= false;
  private personCount: number;
  public isShow: boolean = false;
  title = 'app';
  imageUrl: string = "";
  // private fileHolder: Array<FileHolder> = [];
  private fileListTemp: Array<File> = [];
  private fileCounterTemp: Array<number> = [];
  constructor(private route: ActivatedRoute, private faceDetectService: FaceDetectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isLocal=params['id']==1?true:false;
    });
  }

  private apiBaseUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender'; //this is a fake url. Put in your own API url.
    private headers = {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': 'cf3006aaaf274226b66af23faf00b4df',
    }

  detectByURL(event) {
    this.imageUrl = event.target.value;
    this.isShow=false;
    this.personCount=0;
    this.faceDetectService.detectByURL(this.imageUrl).then(data => {
      this.personCount = data.length;
      this.isShow=true;
    });
  }

  onFileChange(files: FileList) {
    this.isShow=false;
    this.fileListTemp=[];
    this.fileCounterTemp=[];
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
        this.faceDetectService
          .detectByImage(this.apiBaseUrl, arrBuffer, this.headers, "", false)
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
