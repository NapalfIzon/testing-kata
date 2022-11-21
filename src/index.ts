const fs = require("fs-extra");

interface Transaction {
  date: string;
  amount: number;
  balance: number;
}

type Transactions = Transaction[];

export default class Account {
  #amount: number = 0;
  #money: number = 0;
  #date: string = new Date().toLocaleDateString();
  #transaction: Transaction = {
    date: this.#date,
    amount: this.#amount,
    balance: this.#money,
  };
  #transactions: Transactions = [];

  constructor() {
    this.shutdownSession();
  }

  public deposit(amount: number) {
    this.#amount = amount;
    this.#money += amount;
    this.saveTransaction();
    return this.#money;
  }

  public withdraw(amount: number) {
    if (amount > this.#money)
      return console.log(
        "Permission denied, you dont have enought money into your account"
      );
    this.#amount = -amount;
    this.#money -= amount;
    this.saveTransaction();
    return this.#money;
  }

  private saveTransaction() {
    this.#transaction = {
      date: this.#date,
      amount: this.#amount,
      balance: this.#money,
    };
    this.#transactions = [this.#transaction, ...this.#transactions];
    fs.writeJsonSync("./transactions.json", {
      transactions: this.#transactions,
    });
  }

  public printTransactions() {
    console.table(this.#transactions);
  }

  private shutdownSession() {
    console.log("Ready....go!");
    setTimeout(() => {
      console.log("Your session has expired");
    }, 30000);
  }
}
