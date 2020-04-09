import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionParserService } from 'src/app/services/transaction-parser.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[]

  constructor(protected transactionParser: TransactionParserService) { 
    this.transactions = [];
  }

  ngOnInit(): void {
  }

  fileSelected(fileList: FileList) {
    if(fileList.length == 0) {
      console.log("No file was selected");
      return;
    } 
    if(fileList.length > 1) {
      console.error("Multiple input files selected");
      return;
    }

    var file: File = fileList[0];
    let transactionPromise = this.transactionParser.parseCSVFile(file);
    transactionPromise.then((transactions?: Transaction[]) => {
      if(transactions) {
        this.transactions = transactions;
      }
      console.log("Parsed transactions");
    }).catch((error?: any) => {
      console.error(error);
    });
  }

}
