import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class TransactionParserService {

  private papaConfig = {
    worker: true,
    header: true,
    dynamicTyping: true,
    step: this.parseRow.bind(this),
    error: this.parseError.bind(this),
    complete: this.parseComplete.bind(this)
  };
  private currentIndex: number;
  private transactions: Transaction[];
  private promiseResolveFunction : (value?: Transaction[]) => void;
  private promiseRejectFunction : (reason?: any) => void;

  constructor(private papa: Papa) { 
    this.resetTransactions();
  }

  private resetTransactions() {
    this.currentIndex = 0;
    this.transactions = [];
  }

  private parseRow(row: any) {
    let parsedRow = {
      id: this.currentIndex,
      date: new Date(Date.parse(row.data.Date)),
      textDescription: row.data.Name,
      amount: row.data.Amount
    };
    this.currentIndex++;

    this.transactions.push(parsedRow);
  }

  private parseError(error?: any) {
    this.promiseRejectFunction(error);
  }

  private parseComplete() {
    this.promiseResolveFunction(this.transactions);
  }

  parseCSVFile(file: File): Promise<Transaction[]> {
    this.resetTransactions();
    this.papa.parse(file, this.papaConfig);
    return new Promise((resolve, reject) => {
      this.promiseResolveFunction = resolve;
      this.promiseRejectFunction = reject;
    });
  }
}
