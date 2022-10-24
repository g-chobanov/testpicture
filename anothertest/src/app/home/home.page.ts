import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HttpClient} from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  img: any;
  blobUrl: any;
  takenPhotos: SafeResourceUrl[] = [];
  dataUrlPrefix: string = "data:image/png;base64,";
  constructor(private sanitizer:DomSanitizer, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://10.0.2.2:7166/WeatherForecast/getImage?id=1", {responseType: "blob"}).subscribe({
      next: (response) => {
        this.blobUrl = URL.createObjectURL(response);
        
      },
      error : (error) => {
        console.log("bruh");
        console.log(error);
      }
    })
    
  }
 
  async takePicture() {
    
    const image = await Camera.getPhoto({
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    }) 
    this.img = image;
    
    this.takenPhotos.push(this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath));
    
    
  }

  thingies(event: any){
    console.log(event.detail)
  }

  async  saveBlob() {
      let blob = await fetch(this.img.webPath)
          .then(res => res.blob());
     
      const formData = new FormData();
      formData.append('file', blob);
      this.http.post<void>("https://localhost:7166/WeatherForecast/getFiles", formData)
      .subscribe({
        next: (response) => { 
          console.log(response);
        }, 
        error : (error) => {
         console.log(error);
        }
      });
   
  }
  sanitize(blob: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(blob);
  }

  /*
  createImageFromBlob(image: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.blobUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  */

}
