import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookResponse } from 'src/app/services/models';
import { BookService, FileService } from 'src/app/services/services';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  bookId: string | null = '';
  bookResponse: BookResponse = {
    id: 0,
    title: '',
    authorName: '',
    owner: '',
    bookCover: '',
    archived: false,
    shareable: false,
  };

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private imageService: FileService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      if (this.bookId != null) {
        this.bookService
          .findBookById({
            'book-id': +this.bookId,
          })
          .subscribe({
            next: (res) => {
              this.imageService
                .getImages({
                  'book-id': res.id!,
                  fileName: res.bookCover!,
                })
                .subscribe({
                  next: (res1: any) => {
                    console.log(res);
                    this.bookResponse = res;
                    this.bookResponse.bookCover = URL.createObjectURL(res1);
                  },
                  error: (err) => {
                    console.log(err);
                  },
                });
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  getRandomArray(len: number) {
    return Array.from({ length: len }, (_, i) => i);
  }

  back() {
    this.router.navigate(['/books'], { replaceUrl: true });
  }

  edit() {
    this.router.navigate(['/books/book-edit', this.bookId], {
      replaceUrl: true,
    });
  }
}
