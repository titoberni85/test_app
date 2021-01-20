import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ImageItem } from '../interfaces/image-item';
import { ErrorHandlerService } from '../../../_shared/services/error-handler/error-handler.service';
const randomWords = require('random-words');

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  private itemList: ImageItem[] = [];

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { 
    this.setItemList();
  }

  setItemList() {
    for (let index = 1; index <= 4000; index++) {
      let item: ImageItem = {
        id: index,
        photoUrl: `https://picsum.photos/id/${index}/500/500`,
        text: randomWords({ exactly: 10, join: ' ', maxLength: 7 })
      }
      this.itemList.push(item);
    }
  }

  getItemList(): Observable<ImageItem[]> {
    return of(this.itemList);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' })
      .pipe(
        retry(1),
        catchError(this.errorHandler.handleError)
      );
  }

}