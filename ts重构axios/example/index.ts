class User {
    firstName: string
    lastName: string
    fullName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName
    }

}

interface Person {
    firstName: string
    lastName: string
    age?: number
    sex?: 0 | 1 | 2
}

function greeter(person: Person): string {
    return 'hello ' + person.firstName + ' ' + person.lastName
}

const information: Person = {
    firstName: 'qq',
    lastName: 'h',
    age: 18,
    sex: 2
}



const p1: string = greeter(information);

console.log(p1);

const p2: Person = new User('hao', 'de')

console.log(greeter(p2));
