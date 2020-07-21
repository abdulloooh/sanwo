/*
dr balance : the money owed by me
cr balance : the money owed to me => The money I still have outside
*/

const debts = [
  {
    _id: "6hdh900280",
    name: "Tosin Adetola",
    description: "Data Money",
    amount: 380,
    dateIncurred: "2020/09/21",
    dateDue: "2020/10/02",
    status: "dr",
  },
  {
    _id: "6hdhjsh280",
    name: "Obioma Adetola",
    description:
      "Airtime Money Airtime Money Airtime Money Airtime Money debtBodydebtBodydebtBody",
    amount: 400,
    dateIncurred: "2020/04/11",
    dateDue: "2020/10/05",
    status: "cr",
  },
  {
    _id: "6hdh900120",
    name: "Tosin Kolade",
    description: "Travel Money",
    amount: 3180,
    dateIncurred: "2019/09/11",
    dateDue: "2020/10/02",
    status: "dr",
  },
  {
    _id: "6hdh9p0170",
    name: "Tosin Funaab",
    description: "Tfare",
    amount: 2000,
    dateIncurred: "2020/09/11",
    dateDue: "2021/10/02",
    status: "dr",
  },
  {
    _id: "7ydh900280",
    name: "Tosin Adetola",
    description: "Data Money",
    amount: 380,
    dateIncurred: "2020/09/11",
    dateDue: "2020/10/02",
    status: "dr",
  },
  {
    _id: "6hdh90021z",
    name: "Grace Adetola",
    description: "Chips bought at canteen",
    amount: 180,
    dateIncurred: "2020/09/11",
    dateDue: "2020/09/15",
    status: "cr",
  },
  {
    _id: "5hdh900170",
    name: "Tosin Yakubu",
    description: "House rent",
    amount: 24000,
    dateIncurred: "2020/09/11",
    dateDue: "2021/10/02",
    status: "dr",
  },
  {
    _id: "6hdh900170",
    name: "Tosin Funaab",
    description: "Tfare",
    amount: 2400,
    dateIncurred: "2020/09/11",
    dateDue: "2021/10/02",
    status: "cr",
  },
];

export function getDebts() {
  return debts;
}

export function getDebt(_id) {
  return debts.find((d) => d._id === _id);
}

export function saveDebt(debt) {
  let debtClone = debts.find((d) => d._id === debt._id) || {}; //edited old debt or new debt to be added
  debtClone.name = debt.name;
  debtClone.description = debt.description;
  debtClone.amount = debt.amount;
  debtClone.dateIncurred = debt.dateIncurred;
  debtClone.dateDue = debt.dateDue;
  debtClone.status = debt.status;

  //if it is a new debt
  if (!debtClone._id) {
    debt._id = Date.now().toString();
    debts.push(debtClone);
  }

  return debtClone;
}

export function deleteDebt(debt) {
  let debtIndex = debts.findIndex((d) => d._id === debt._id);
  let debtClone = debts.find((d) => d._id === debt._id); // get a copy to return

  //delete the debt
  if (debtIndex) {
    debts.slice(debtIndex, 1);
    return debtClone;
  }
  return null;
}
