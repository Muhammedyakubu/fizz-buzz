function toFizzBuzz(value) {
    let num = parseInt(value, 10);
    if (num % 15 === 0)
        return "fizz buzz";
    else if (num % 5 === 0)
        return "buzz";
    else if (num % 3 === 0)
        return "fizz";

    else
        return String(value);
}
exports.toFizzBuzz = toFizzBuzz;
