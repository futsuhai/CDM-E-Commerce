import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public convertImageToBase64(imagePath: string): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, img.width, img.height);

        const dataURL = canvas.toDataURL('image/png');
        observer.next(dataURL);
        observer.complete();
      };

      img.onerror = (error) => {
        observer.error(error);
      };

      img.src = imagePath;
    });
  }
}
