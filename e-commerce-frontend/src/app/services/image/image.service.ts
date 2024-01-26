import { Injectable } from '@angular/core';
import { Observable, Observer, catchError, throwError } from 'rxjs';
import { IImage } from 'src/app/models/image.model';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  get api(): string {
    return `/api/image`;
  }

  constructor(private restService: RestService) { }

  public convertFileToBase64(file: File): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        observer.next(base64String);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsDataURL(file);
    });
  }

  public convertImageToByteArray(base64String: string): Observable<Uint8Array> {
    return new Observable((observer: Observer<Uint8Array>) => {
      const binaryString = atob(base64String.split(',')[1]);
      const length = binaryString.length;
      const uint8Array = new Uint8Array(length);
  
      for (let i = 0; i < length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
  
      observer.next(uint8Array);
      observer.complete();
    });
  }

  public getImage(id: string): Observable<IImage> {
    const endpoint: string = `${this.api}/GetImage/${id}`;
    return this.restService.restGET<IImage>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log("An error occurred while fetching image with ID ${id}:", error)
        return throwError(error);
      })
    )
  }

  public addImage(imgBytes: Uint8Array): Observable<IImage> {
    const endpoint: string = `${this.api}/AddImage`;
    const formData = new FormData();
    formData.append('img', new Blob([imgBytes], { type: 'application/octet-stream' }), 'image.jpg');
  
    return this.restService.restPOST<IImage>(endpoint, formData).pipe(
      catchError((error: unknown) => {
        console.log("An error occurred while uploading image:", error);
        return throwError(error);
      })
    );
  }
}
