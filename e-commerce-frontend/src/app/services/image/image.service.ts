import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

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
}
