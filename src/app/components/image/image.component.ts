import { Component, Input, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/services';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  imageUrl: any;
  @Input() imageId: number | undefined;
  @Input() imageName: string | undefined;
  imageData: any;

  constructor(private imageService: FileService) {}

  ngOnInit(): void {
    console.log(this.imageId, this.imageName);
    this.imageService
      .getImages({
        'book-id': this.imageId!,
        fileName: this.imageName!,
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.imageUrl = URL.createObjectURL(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
