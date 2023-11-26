import { Component, Input } from '@angular/core';

interface Item {
  imgSrc: string;
  imgAlt: string;
}

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent {
  @Input() galleryData: Item[]=[];
}
