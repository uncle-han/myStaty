function letDeclare(input: boolean, b: number) {
    let a = 1
    if (input) {
        let b = 2 + a
        return b
    }

    return b
}

console.log(letDeclare(false, 99));
