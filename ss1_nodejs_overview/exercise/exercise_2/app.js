students = [
    {
        name: "Ha",
        gender: 'female',
        poin: 8
    },
    {
        name: "Huy",
        gender: 'male',
        poin: 9
    },
    {
        name: "Hung",
        gender: 'male',
        poin: 7
    },
    {
        name: "Phuong",
        gender: 'female',
        poin: 6
    },
    {
        name: "Huyen",
        gender: 'female',
        poin: 10
    },
    {
        name: "Long",
        gender: 'male',
        poin: 5
    },
    {
        name: "Luan",
        gender: 'male',
        poin: 10
    },
    {
        name: "Linh",
        gender: 'female',
        poin: 8
    }
];

const averageMalePoint = students.filter(student => student.gender === 'male')
        .map(student => student.poin).reduce((a, b) => a + b, 0) /
    students.filter(student => student.gender === 'male').length;

const averageFemalePoint = students.filter(student => student.gender === 'female')
        .map(student => student.poin).reduce((a, b) => a + b, 0) /
    students.filter(student => student.gender === 'male').length;

console.log("Điểm trung bình của nam: " + averageMalePoint)
console.log("Điểm trung bình của nữ: " + averageFemalePoint)
