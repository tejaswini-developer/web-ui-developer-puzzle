import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {MatSnackBar} from '@angular/material/snack-bar';
import { getReadingList, removeFromReadingList,addToReadingList,markAsFinished } from '@tmo/books/data-access';
import { Book,ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,
    private snackBar: MatSnackBar) {}
  
  openSnackbar(message:string, action:string, item: Book) {
      let snackBarRef = this.snackBar.open(message, action,{duration: 6000});
    
      snackBarRef.onAction().subscribe(() => {
          this.store.dispatch(addToReadingList({book:item}));
      })
    }  
    markAsFinished(item: ReadingListItem){
    
      this.store.dispatch(markAsFinished({item}));
    }
  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackbar('Removed from Reading List', 'Undo',item);
  }
}
