import myBankAccount from "./index";

describe("Given a bank application", () => {
  let bankStatement: jest.Spied<typeof console.log>;

  beforeEach(() => {
    bankStatement = jest.spyOn(console, "table");
  });

  test("When a client deposit a quantity of money into an account, then the quantity should increase", () => {
    const bankAccountClass = myBankAccount();
    const myAccount = new bankAccountClass();

    myAccount.deposit(500);
    myAccount.deposit(1000);

    expect(bankStatement).toHaveBeenCalledWith([
      { amount: 1000, balance: 1500 },
      { amount: 500, balance: 500 },
    ]);
  });
});
