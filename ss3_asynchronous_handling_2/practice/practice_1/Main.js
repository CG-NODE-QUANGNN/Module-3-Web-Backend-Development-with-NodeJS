axios = require('axios');

async function getJSONAsync() {
    let json = await axios.get('http://jsonplaceholder.typicode.com/posts/1');
    return json.data;
}
//
// getJSONAsync().then(result =>console.log(result));

// let data = await getJSONAsync();
// console.log(data)

// (async () => {
//     let data = await getJSONAsync();
//     console.log(data)
// })();
//
// let data = await getJSONAsync();
// console.log(data)

getJSONAsync().then(value => {
    console.log(value)})
