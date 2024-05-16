import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { colDef } from '@bhplugin/ng-datatable';
import { BookService } from 'src/app/services/services';
import { SwalService } from 'src/app/services/swal/swal.service';

@Component({
  selector: 'app-borrowed-list',
  templateUrl: './borrowed-list.component.html',
  styleUrls: ['./borrowed-list.component.scss'],
})
export class BorrowedListComponent {
  loading: boolean = true;
  cols: Array<colDef> = [
    {
      field: 'id',
      title: 'ID',
      isUnique: true,
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    {
      field: 'title',
      title: 'Title',
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    {
      field: 'bookCover',
      title: 'Book Cover',
      sort: false,
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    {
      field: 'authorName',
      title: 'Author Name',
      sort: false,
      minWidth: '100px',
      maxWidth: '100px',
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    {
      field: 'rate',
      title: 'Rate',
      sort: false,
      minWidth: '100px',
      maxWidth: '100px',
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    {
      field: 'returned',
      title: 'Returned',
      sort: false,
      minWidth: '60px',
      maxWidth: '60px',
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    {
      field: 'returnApproved',
      title: 'Approved',
      sort: false,
      minWidth: '60px',
      maxWidth: '60px',
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    {
      field: 'actions',
      title: 'Actions',
      sort: false,
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
  ];
  rows: Array<any> = [];
  total_rows: number = 0;
  params = {
    page: 1,
    size: 10,
    sort_column: 'id',
    sort_direction: 'asc',
    search: '',
  };

  controller: any;
  timer: any;
  constructor(
    private bookService: BookService,
    private router: Router,
    private swalService: SwalService
  ) {
    this.initData();
  }

  filterBorrowed() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getBorrowed();
    }, 300);
  }

  async getBorrowed() {
    // cancel request if previous request still pending before next request fire
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
    const signal = this.controller.signal;

    try {
      this.loading = true;

      this.bookService
        .findAllBorrowedBooks({
          page: this.params.page,
          size: this.params.size,
          sort_column: this.params.sort_column,
          sort_direction: this.params.sort_direction,
          search: this.params.search,
        })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.rows = res.content ?? [];
            this.rows = this.rows.map((row) => {
              return {
                ...row,
                profileId: row.id,
                title: row.title,
                bookCover: row.bookCover,
                authorName: row.authorName,
                rate: row.rate,
                returned: row.returned,
                returnedColor: this.randomStatusColor(row.returned),
                returnApproved: row.returnApproved,
                returnApprovedColor: this.randomStatusColor(row.returnApproved),
              };
            });
            this.total_rows = res.totalElements ?? 0;
          },
          error: (err) => {
            console.log(err);
          },
        });
    } catch {}

    this.loading = false;
  }

  async initData() {
    try {
      this.getBorrowed();
    } catch (error) {}
  }

  changeServer(data: any) {
    console.log(data);
    this.params.page = data.current_page;
    this.params.size = data.pagesize;
    this.params.sort_column = data.sort_column;
    this.params.sort_direction = data.sort_direction;
    this.params.search = data.search;
    if (data.change_type === 'search') {
      this.filterBorrowed();
    } else {
      this.getBorrowed();
    }
  }

  randomStatusColor(shareable: boolean) {
    const color = [
      'bg-light-error text-error rounded f-w-600 p-6 p-y-4 f-s-12',
      'bg-light-primary text-primary rounded f-w-600 p-6 p-y-4 f-s-12',
    ];
    if (shareable) {
      return color[1];
    }
    return color[0];
  }

  getRandomArray(len: number) {
    return Array.from({ length: len }, (_, i) => i);
  }

  viewBook(book: any) {
    this.router.navigate(['books/book-detail', book.id]);
  }
  deleteBook(book: any) {
    this.swalService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        this.bookService
          .deleteBook({
            'book-id': book.id,
          })
          .subscribe({
            next: (res) => {
              this.swalService.showAlertSuccess('Book deleted successfully');
              this.getBorrowed();
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }
}
