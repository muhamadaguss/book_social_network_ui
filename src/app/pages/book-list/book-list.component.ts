import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookListComponent {
  loading: boolean = true;
  cols: Array<colDef> = [
    { field: 'id', title: 'ID', isUnique: true },
    { field: 'title', title: 'Title' },
    {
      field: 'bookCover',
      title: 'Book Cover',
      sort: false,
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    { field: 'owner', title: 'Email' },
    {
      field: 'rate',
      title: 'Rate',
      sort: false,
      minWidth: '120px',
      headerClass: 'justify-center',
      cellClass: 'justify-center',
    },
    { field: 'shareable', title: 'Shareable', sort: false },
    { field: 'archived', title: 'Archived', sort: false },
  ];
  rows: Array<any> = [];
  total_rows: number = 0;
  params = {
    current_page: 1,
    pagesize: 10,
    sort_column: 'id',
    sort_direction: 'asc',
    column_filters: [],
  };
  countryList: Array<any> = [];

  controller: any;
  timer: any;
  constructor(private bookService: BookService) {
    this.initData();
  }

  filterUsers() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getUsers();
    }, 300);
  }

  async getUsers() {
    // cancel request if previous request still pending before next request fire
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
    const signal = this.controller.signal;

    try {
      this.loading = true;

      this.bookService.findAllBooks().subscribe({
        next: (res) => {
          this.rows = res.content ?? [];
          this.rows = this.rows.map((row) => {
            return {
              ...row,
              profileId: row.id,
              title: row.title,
              bookCover: row.bookCover,
              email: row.owner,
              rate: row.rate,
              shareable: row.shareable,
              shareableColor: this.randomStatusColor(row.shareable),
              archived: row.archived,
              archivedColor: this.randomStatusColor(row.archived),
            };
          });
          this.total_rows = res.totalPages ?? 0;
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
      this.getUsers();
    } catch (error) {}
  }

  changeServer(data: any) {
    this.params.current_page = data.current_page;
    this.params.pagesize = data.pagesize;
    this.params.sort_column = data.sort_column;
    this.params.sort_direction = data.sort_direction;
    this.params.column_filters = data.column_filters;

    if (data.change_type === 'filter') {
      this.filterUsers();
    } else {
      this.getUsers();
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
}
