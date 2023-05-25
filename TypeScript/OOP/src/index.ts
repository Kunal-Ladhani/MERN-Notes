console.log('======================== OOP in TS ==================================');

/*
 * OOP is one of many programming paradigms(style of writing code), some are -
 * Procedural
 * Funcctional
 * Object Oriented
 * Event-driven
 * Aspect-Oriented
 * ...
 * */

// objects are building blocks of the program here.
// the problem is solved using these.
// object has data(fields/properties) and functions(methods) that act on that data
// it is contrasted with functional programming.

// each tool has its own strengths and weaknesses be it - language/framework/library/programming paradigms...
// so there is no such thing as the best!
// it will all depend on your use case.

// dont fall in love with one tool and try to use it to solve each problem!

console.log('======================== Classes in TS ==================================');

// blueprint for creating objects.

// pascal Naming Convention
class Account {
    // readonly id: number;
    // this can be set in constructor only as its a readonly prop.
    // owner: string;
    // private balance: number;
    // all properties are public by default unless stated otherwise
    // nickname?: string;  
    // this is now a optional proerty

    // this way the constructor will declare and initialize the property in one go.
    // NOTE: this is called parameter properties.
    constructor(
        public readonly id: number,
        public owner: string,
        private _balance: number) {
    }

    // public getBalance(): number {
    //     return this.balance;
    // }    - GETTER METHOD

    // public setBalance(balance: number): void {
    //     this._balance = balance;
    // }    - SETTER METHOD


    // GETTER
    public get balance(): number {
        return this._balance;
    }

    // SETTER
    // you can do validation here.
    // public set balance(val: number) {
    //     this._balance = val;
    // }



    // private calculateTax(): number {
    //     if (this.balance > 30_000) {
    //         return 30;
    //     }
    //     else {
    //         return 15;
    //     }
    // }

    public deposit(amount: number): void {
        if (amount <= 0)
            throw new Error('amount need to be more than 1');
        else
            this._balance += amount;
        //record a transaction
    }
}

console.log('======================== Objects in TS ==================================');

let account = new Account(1, "Rohit", 100);
account.deposit(12000);

console.log(account);
console.log(account.balance);   // see you can get balance just like a property. 
// but internally the getter is called.
console.log(typeof account);    // object always for all classes.
console.log(account instanceof Account);    // true

// NOTE: ADDING PROP TO OBJECTS ON THE FLY.

// let person = {};
// person.name = 'kunal';
// NOT ALLOWED

class seatAssignment {
    [seatNumber: string]: string;
}

let seats = new seatAssignment();
seats.A1 = 'K';
seats.A2 = 'U';
seats.A3 = 'N';
seats.A4 = 'A';
seats['A1'] = 'L';
// we can only store string properties.

// NOTE : static members

class Ride {
    private static _activeRides: number = 0;


    public static get activeRides(): number {
        return Ride._activeRides;
    }


    start() { Ride._activeRides++; }
    stop() { Ride._activeRides--; }
}

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();

console.log(Ride.activeRides);

class Person {
    constructor(public firstName: string, public lastName: string) { }

    get fullName(): string {
        return this.firstName + " " + this.lastName;
    }

    walk(): void {
        console.log("walking...");

    }
}

class Student extends Person {
    constructor(public studentId: number, firstName: string, lastName: string) {
        super(firstName, lastName);
    }

    test(): void {
        console.log("giving a test");
    }
}

class Teacher extends Person {
    override get fullName(): string {
        return 'Prof. ' + super.fullName;
    }
}

let rohit = new Student(1, 'rohit', 'ladhani');
console.log(rohit.fullName);
rohit.walk();

let steven = new Teacher('Steven', 'Smith');
steven.walk();
console.log(steven.fullName);

