import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Item } from '../component/image-list.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  constructor(private http: HttpClient) { }

  // getNextImages(items: ImageItem[]): any[] {
  //   let images: any[] = [];
  //   items.forEach(item => {
  //     this.http.get(item.photo).subscribe(imageData => {
  //       images.push(imageData);
  //     })
  //   });
  //   return images;
  // }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }


  
}
