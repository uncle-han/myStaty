var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
    return User;
}());
function greeter(person) {
    return 'hello ' + person.firstName + ' ' + person.lastName;
}
var information = {
    firstName: 'qq',
    lastName: 'h',
    age: 18,
    sex: 2
};
var p1 = greeter(information);
console.log(p1);
var p2 = new User('hao', 'de');
console.log(greeter(p2));
