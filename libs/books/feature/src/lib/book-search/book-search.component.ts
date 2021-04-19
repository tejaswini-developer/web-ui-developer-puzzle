import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject} from 'rxjs';
import {
  addToReadingList,
  removeFromReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})


export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  private unSubscribeSubscription$ = new Subject();
  
  searchForm = this.fb.group({
    term: ''
  });


  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  
  openSnackbar(message:string, action:string, book:Book) {
    let snackBarRef = this.snackBar.open(message, action,{duration: 3000});

    snackBarRef.onAction().subscribe(() => {

      const item: any = {bookId:book.id};

      this.store.dispatch(removeFromReadingList({item}));
    })
  }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {

    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });

    this.searchForm.get('term')
    .valueChanges.pipe(debounceTime(500),distinctUntilChanged(),takeUntil(this.unSubscribeSubscription$)).subscribe(input => this.searchBooks());
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.openSnackbar('Added to Reading List', 'Undo',book);
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void{
    this.unSubscribeSubscription$.complete();
  }
}
