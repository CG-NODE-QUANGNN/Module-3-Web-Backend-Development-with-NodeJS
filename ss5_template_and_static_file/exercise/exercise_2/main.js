function readNumber(num) {
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const twenties = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num < 0 || num >= 1000) {
        return "out of ability";
    }

    if (num < 10) {
        return ones[num];
    }

    if (num < 20) {
        return tens[num - 10];
    }

    if (num < 100) {
        let result = twenties[Math.floor(num / 10) - 2];
        if (num % 10 !== 0) {
            result += " " + ones[num % 10];
        }
        return result;
    }

    let result = ones[Math.floor(num / 100)] + " hundred";
    if (num % 100 === 0) {
        return result;
    }
    result += " and ";

    if (num % 100 < 10) {
        result += ones[num % 100];
    } else if (num % 100 < 20) {
        result += tens[num % 100 - 10];
    } else {
        result += twenties[Math.floor(num % 100 / 10) - 2] + " " + ones[num % 10];
    }

    return result;
}

console.log(readNumber(261)); // "two hundred and sixty one"
