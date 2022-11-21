import Account from "./index";

describe("Given a bank application", () => {
  let transactions: jest.Spied<typeof console.table>;
  let rejectionMessage: jest.Spied<typeof console.log>;
  let sessionExpiredMessage: jest.Spied<typeof console.log>;
  let myAccount: any;
  let actualDate: string;
  jest.useFakeTimers();

  beforeEach(() => {
    myAccount = new Account();
    transactions = jest.spyOn(console, "table");
    rejectionMessage = jest.spyOn(console, "log");
    actualDate = new Date().toLocaleDateString();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test("When a client deposit a quantity of money into an account, then the quantity should increase", () => {
    expect(myAccount.deposit(500)).toBe(500);
  });

  test("When a client withdraw a quantity of money into an account, then the quantity should decrease", () => {
    myAccount.deposit(500);

    expect(myAccount.withdraw(300)).toBe(200);
  });

  test("When a client a client wants to get an extract of the transactions, then should receive a console log with the information", () => {
    myAccount.deposit(500);
    myAccount.deposit(1000);
    myAccount.withdraw(300);

    myAccount.printTransactions();

    expect(transactions).toHaveBeenCalledWith([
      { date: actualDate, amount: -300, balance: 1200 },
      { date: actualDate, amount: 1000, balance: 1500 },
      { date: actualDate, amount: 500, balance: 500 },
    ]);
  });

  test("When a client withdraw a quantity of money greater than the amount of money in the account, then a console log rejecting the operation should appear", () => {
    myAccount.deposit(500);
    myAccount.withdraw(1300);

    expect(rejectionMessage).toHaveBeenCalledWith(
      "Permission denied, you dont have enought money into your account"
    );
  });

  test("When a client gets the session opened for 30 sec, then the session should expire and a console log should appear", () => {
    jest.spyOn(global, "setTimeout");
    sessionExpiredMessage = jest.spyOn(console, "log");
    jest.advanceTimersByTime(31000);

    expect(sessionExpiredMessage).toBeCalled();
    expect(sessionExpiredMessage).toHaveBeenLastCalledWith(
      "Your session has expired"
    );
  });
});
