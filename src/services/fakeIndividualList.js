/*
debitBalance: Total money I am owing
creditBalance: Total money I am expecting/have

dr moneys: money owed to me by debtors
cr moneys: money owed by me
*/

import { getDebts } from "./fakeDebtList";

const debts = getDebts();

export function getIndividualDebts() {
  var { uniqueNameList, nameList } = getNameList();

  return classifyIndividualDebts(uniqueNameList, nameList);
}

function classifyIndividualDebts(uniqueNameList, nameList) {
  let individual = [];
  uniqueNameList.forEach((u) => {
    let debtsPerNameList = debts.filter((d) => d.name === u);
    let debitBalance = 0;
    let creditBalance = 0;
    debtsPerNameList.forEach((d) => {
      if (d.status === "dr") creditBalance += d.amount;
      else if (d.status === "cr") debitBalance += d.amount;
    });
    let newItem = {}; //create new property with empty object value
    newItem.name = u;
    newItem.tome = creditBalance;
    newItem.byme = debitBalance;
    newItem.balance = creditBalance - debitBalance;
    individual.push(newItem);
  });

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
  return { uniqueNameList, nameList };
}
