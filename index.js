import inquirer from 'inquirer';
import { faker } from '@faker-js/faker/locale/af_ZA';
const createUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(1000000000 * Math.random() * 90000000000),
            balance: 1000000 * i
        };
        users.push(user);
    }
    return users;
};
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "write pin code",
        name: "pin"
    });
    //console.log("Welcome account holder")
    const user = users.find(val => val.pin == res.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunc(user);
        return;
    }
    console.log("invalid user pin");
};
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "What do you want to do?",
        choices: ["withdraw", "balance", "deposit", "exist"]
    });
    if (ans.select == "withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "enter amount",
            name: "rupee"
        });
        if (amount.rupee > user.balance) {
            return console.log("insufficient amount");
        }
        if (amount.rupee > 25000) {
            return console.log("Limit exceed");
        }
        console.log(`withdraw amount: ${amount.rupee}`);
        console.log(`Balance :${user.balance - amount.rupee}`);
    }
    if (ans.select == "balance") {
        console.log(`Balance :${user.balance}`);
    }
    if (ans.select == "deposit") {
        const deposit = await inquirer.prompt({
            type: "number",
            message: "Deposit amount enter.. ",
            name: "rupee"
        });
        console.log(`Deposit amount:${deposit.rupee}`);
        console.log(`Total balance:${user.balance + deposit.rupee}`);
    }
    if (ans.select == "exist") {
        console.log("Thanks for using ATM");
    }
};
//console.log(ans)
const users = createUser();
atmMachine(users);
