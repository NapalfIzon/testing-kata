interface BankMovementDetail {
  // date: Date,
  amount: number;
  balance: number;
}

type BankMovementDetails = BankMovementDetail[];

export default function myBankAccount() {
  class Account {
    #amount: number = 0;
    #money: number = 0;
    #bankMovementDetail: BankMovementDetail = {
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
    // public withdraw(amount: Number) {}
    public printStatement() {
      this.#bankMovementDetail = {
        amount: this.#amount,
        balance: this.#money,
      };
      this.#bankMovementDetails = [
        this.#bankMovementDetail,
        ...this.#bankMovementDetails,
      ];
      console.table(this.#bankMovementDetails);
    }
  }

  return Account;
}
