/*
debitBalance: Total money I am owing
creditBalance: Total money I am expecting/have

*/

import { getDebts } from "./fakeDebtList";

const debts = getDebts();

export function getIndividualDebts() {
  var { uniqueNameList } = getNameList();

  return classifyIndividualDebts(uniqueNameList);
}

function classifyIndividualDebts(uniqueNameList) {
  let total = { name: "Total Balance" };
  let totalAmount = 0;
  let totalOwedToMe = 0;
  let totalOwedByMe = 0;

  let individual = [];
  uniqueNameList.forEach((u) => {
    let debtsPerNameList = debts.filter((d) => d.name === u);
    let debitBalance = 0;
    let creditBalance = 0;
    debtsPerNameList.forEach((d) => {
      if (d.status === "cr") creditBalance += Number(d.amount);
      else if (d.status === "dr") debitBalance += Number(d.amount);
    });
    let newItem = {}; //create new property with empty object value
    newItem.name = u;
    newItem.tome = creditBalance;
    newItem.byme = debitBalance;
    newItem.balance = Number(creditBalance) - Number(debitBalance);
    individual.push(newItem);

    totalOwedByMe = Number(totalOwedByMe) + Number(newItem.byme);
    totalOwedToMe = Number(totalOwedToMe) + Number(newItem.tome);
    totalAmount = Number(totalAmount) + Number(newItem.balance);
  });

  total.balance = totalAmount;
  total.tome = totalOwedToMe;
  total.byme = totalOwedByMe;
  individual.push(total);

  return individual;
}

function getNameList() {
  let nameList = [];
  debts.forEach((d) => {
    d.name && nameList.push(d.name);
  });
  let uniqueNameList = nameList.filter(
    (n, index) => nameList.indexOf(n) === index
  );
  return { uniqueNameList };
}
