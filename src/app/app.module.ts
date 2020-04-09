import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionComponent } from './components/transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
