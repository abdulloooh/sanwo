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
  return { uniqueNameList };
}
