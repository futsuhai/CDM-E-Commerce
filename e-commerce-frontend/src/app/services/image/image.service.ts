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

  public getImage(id: string): Observable<IImage> {
    const endpoint: string = `${this.api}/GetImage/${id}`;
    return this.restService.restGET<IImage>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log("An error occurred while fetching image with ID ${id}:", error)
        return throwError(error);
      })
    )
  }
}
