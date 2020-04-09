import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  @Input() transaction: Transaction;

  constructor() { }

  ngOnInit(): void {
  }

}
