function letDeclare(input, b) {
    var a = 1;
    if (input) {
        var b_1 = 2 + a;
        return b_1;
    }
    return b;
}
console.log(letDeclare(false, 99));
