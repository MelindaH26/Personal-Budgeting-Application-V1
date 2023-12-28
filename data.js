// This file simulates a database
// A database will be connected to the App at a later date
const income = [
    {name: "melinda\s income",
    ammount: 1000,
    requency: "weekly"}
];

const envelopes = [
    {name: "Travel Budget",
    category: "Travel",
    allowence: 200,
    spent: 0},
    {name: "Weekly Food Shop",
    category: "Groceries",
    allowence: 100,
    spent: 0},
    {name: "Physio",
    category: "Health",
    allowence: 50,
    spent: 0},
    {name: "Dining Out",
    category: "Dining Out",
    allowence: 30,
    spent: 0},
    {name: "Electricity Bill",
    category: "Utilities",
    allowence: 80,
    spent: 0},
    {name: "Cosmo\s Food",
    category: "Pets",
    allowence: 80,
    spent: 0},
];

const spendings = [
    {title: "Belmodo\s",
    category: "Groceries",
    ammount: 65}
];


module.exports = {income, envelopes, spendings};