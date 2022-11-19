interface BankMovementDetail {
  date: string;
  amount: number;
  balance: number;
}

type BankMovementDetails = BankMovementDetail[];

export default function myBankAccount() {
  class Account {
    #amount: number = 0;
    #money: number = 0;
    #date: string = new Date().toLocaleDateString();
    #bankMovementDetail: BankMovementDetail = {
      date: this.#date,
      amount: this.#amount,
      balance: this.#money,
    };
    #bankMovementDetails: BankMovementDetails = [];

    public deposit(amount: number) {
      this.#amount = amount;
      this.#money += amount;
      this.printStatement();
      return this.#money;
    }
    public withdraw(amount: number) {
      if (amount > this.#money)
        return console.log(
          "Permission denied, you dont have enought money into your account"
        );
      this.#amount = -amount;
      this.#money -= amount;
      this.printStatement();
      return this.#money;
    }
    public printStatement() {
      this.#bankMovementDetail = {
        date: this.#date,
        amount: this.#amount,
        balance: this.#money,
      };
      console.log(this.#bankMovementDetail);
      this.#bankMovementDetails = [
        this.#bankMovementDetail,
        ...this.#bankMovementDetails,
      ];
      console.table(this.#bankMovementDetails);
    }
  }

  return Account;
}
