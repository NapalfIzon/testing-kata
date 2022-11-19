import myBankAccount from "./index";

describe("Given a bank application", () => {
  let bankStatement: jest.Spied<typeof console.table>;
  let rejectionMessage: jest.Spied<typeof console.log>;
  const bankAccountClass = myBankAccount();
  let myAccount = new bankAccountClass();
  let actualDate: string;

  beforeEach(() => {
    bankStatement = jest.spyOn(console, "table");
    rejectionMessage = jest.spyOn(console, "log");
    actualDate = new Date().toLocaleDateString();
  });

  test("When a client deposit a quantity of money into an account, then the quantity should increase", () => {
    myAccount.deposit(500);
    myAccount.deposit(1000);

    expect(bankStatement).toHaveBeenCalledWith([
      { date: actualDate, amount: 1000, balance: 1500 },
      { date: actualDate, amount: 500, balance: 500 },
    ]);
  });

  test("When a client withdraw a quantity of money into an account, then the quantity should decrease", () => {
    myAccount.withdraw(300);

    expect(bankStatement).toHaveBeenCalledWith([
      { date: actualDate, amount: -300, balance: 1200 },
      { date: actualDate, amount: 1000, balance: 1500 },
      { date: actualDate, amount: 500, balance: 500 },
    ]);
  });

  test("When a client withdraw a quantity of money greater than the amount of money in the account, then a console log rejecting the operation should appear", () => {
    myAccount.withdraw(1300);

    expect(rejectionMessage).toHaveBeenCalledWith(
      "Permission denied, you dont have enought money into your account"
    );
  });
});
