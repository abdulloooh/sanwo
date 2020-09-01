/*
debitBalance: Total money I am owing
creditBalance: Total money I am expecting/have

*/

import { getDebts } from "./fakeDebtList";

export function getIndividualDebts() {
  let debts = getDebts();
  let individualList = [];
  let finalBalance = 0;

  debts.forEach(function (debt) {
    //Simply add credittotal and debittotal
    if (debt.name === "Total")
      finalBalance =
        finalBalance + (debt.status === "cr" ? +debt.amount : -debt.amount);

    if (individualList.length === 0)
      if (debt.name !== "Total")
        return individualList.push(formatIndividual(debt)); //start off by pushing sth in the equivalent array

    const sameNameIndex = individualList.findIndex(
      (item) => item.name === debt.name
    ); //check if matching name exist

    //if not found already
    if (sameNameIndex === -1) {
      if (debt.name !== "Total") {
        //ignore debit and credit total
        individualList.push(formatIndividual(debt));
      }
    } else {
      const formattedDebt = formatIndividual(debt);
      const thisDebtBalance = formattedDebt.tome - formattedDebt.byme;
      const data = individualList[sameNameIndex];
      data.tome = Number(data.tome) + Number(formattedDebt.tome);
      data.byme = Number(data.byme) + Number(formattedDebt.byme);
      data.balance = Number(data.balance) + thisDebtBalance;
    }
  });

  individualList.push({
    name: "Total Balance",
    balance: finalBalance,
    common: "total",
  });
  return individualList;
}

function formatIndividual(item) {
  let { name, status, amount } = item;
  amount = Number(amount); //double sure
  return {
    tome: status === "cr" ? amount : 0,
    byme: status === "dr" ? amount : 0,
    balance: status === "cr" ? +amount : -amount,
    name: name,
  };
}
