import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRequest, BookResponse } from 'src/app/services/models';
import { BookService, FileService } from 'src/app/services/services';
import { SwalService } from 'src/app/services/swal/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
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

  bookRequest: BookRequest = {
    authorName: '',
    id: 0,
    isbn: '',
    shareable: false,
    synopsis: '',
    title: '',
  };

  errorMsg: Array<string> = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private imageService: FileService,
    private router: Router,
    private swalService: SwalService
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

  onSave() {
    this.bookRequest.id = this.bookResponse.id;
    this.bookRequest.authorName = this.bookResponse.authorName!;
    this.bookRequest.isbn = this.bookResponse.isbn!;
    this.bookRequest.synopsis = this.bookResponse.synopsis!;
    this.bookRequest.title = this.bookResponse.title!;

    this.swalService.confirmSave().then((result) => {
      if (result.isConfirmed) {
        this.bookService
          .updateBook({
            'book-id': this.bookResponse.id!,
            body: this.bookRequest,
          })
          .subscribe({
            next: (res) => {
              console.log(res);
              this.bookService
                .updateShareableStatus({
                  'book-id': this.bookRequest.id!,
                  status: this.bookResponse.shareable!,
                })
                .subscribe({
                  next: (res1) => {
                    console.log('shareable status updated');
                    this.bookService
                      .updateArchivedStatus({
                        'book-id': this.bookRequest.id!,
                        status: this.bookResponse.archived!,
                      })
                      .subscribe({
                        next: (value) => {
                          // Gunakan arrow function di sini
                          console.log(value);
                          this.swalService
                            .showAlertSuccess('Book Updated')
                            .then(() => {
                              this.router.navigate(['/books'], {
                                replaceUrl: true,
                              });
                            });
                        },
                        error: (err) => {
                          // Gunakan arrow function di sini
                          console.log(err);
                          if (err.error.validationErrors) {
                            this.errorMsg = err.error.validationErrors;
                          } else {
                            this.errorMsg.push(err.error.error);
                          }
                          for (let i = 0; i < this.errorMsg.length; i++) {
                            this.swalService.showAlertError(this.errorMsg[i]);
                          }
                        },
                      });
                  },
                  error: (err) => {
                    // Gunakan arrow function di sini
                    console.log(err);
                    if (err.error.validationErrors) {
                      this.errorMsg = err.error.validationErrors;
                    } else {
                      this.errorMsg.push(err.error.error);
                    }
                    for (let i = 0; i < this.errorMsg.length; i++) {
                      this.swalService.showAlertError(this.errorMsg[i]);
                    }
                  },
                });
            },
            error: (err) => {
              // Gunakan arrow function di sini
              console.log(err);
              if (err.error.validationErrors) {
                this.errorMsg = err.error.validationErrors;
              } else {
                this.errorMsg.push(err.error.error);
              }
              for (let i = 0; i < this.errorMsg.length; i++) {
                this.swalService.showAlertError(this.errorMsg[i]);
              }
            },
          });
      }
    });
  }

  back() {
    this.router.navigate(['/books'], { replaceUrl: true });
  }

  // onSelectChange() {
  //   console.log('Selected value:', this.bookResponse.shareable);
  // }
}
