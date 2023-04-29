async function findMax(arr) {
    if (arr instanceof Array) {
        return Math.max(...arr);
    }
    throw new Error("Input data is incorrect")
}

async function f() {
    try {
        let result = await findMax([1, 2, 3]);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

f();
