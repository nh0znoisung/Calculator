const check_expression = require('../utils.js').check_expression;

// TODO: Checking the array of converted expression is valid
// Valid condition: 
//      If array is empty, return true
//      If array is not empty, check if the first element is a number and numbers and operators are placed alternating.
//  Array[String] => Boolean

test("test basic", () => {
    expect(check_expression(['1','+','3.5'])).toStrictEqual(true);
})

test("test empty array", () => {
    expect(check_expression([])).toStrictEqual(true);
})

test("test even index false syntax", () => {
    expect(check_expression(['+', '12'])).toStrictEqual(false);
})

test("test even index true syntax", () => {
    expect(check_expression(['12', '+'])).toStrictEqual(false);
})

test("test even index with long string 1", () => {
    expect(check_expression(['+', '12', '*', '/'])).toStrictEqual(false);
})

test("test even index with long string 2", () => {
    expect(check_expression(['+', '12', '*', '/', '-', '-12'])).toStrictEqual(false);
})

test("test even index with long string wrong rule 1", () => {
    expect(check_expression(['+', '12', '*3', '/31'])).toStrictEqual(false);
})

test("test even index with long string wrong rule 2", () => {
    expect(check_expression(['12', '', '*', '/'])).toStrictEqual(false);
})

test("test true array basic", () => {
    expect(check_expression(['12', '+', '13', '*', '4'])).toStrictEqual(true);
})

test("test true array basic wrong rule 1", () => {
    expect(check_expression(['/'])).toStrictEqual(false);
})

test("test true array basic wrong rule 2", () => {
    expect(check_expression(['762.'])).toStrictEqual(true);
})

test("test true array basic wrong rule 3", () => {
    expect(check_expression(['', '/', ''])).toStrictEqual(true);
})

test("test true complex array 1", () => {
    expect(check_expression(['12', '+', '13', '*', '4', '+', '13', '*', '4', '+', '13', '*', '4', '+', '13', '*', '4', '+', '13', '*', '4'])).toStrictEqual(true);
})

test("test true complex array 2", () => {
    expect(check_expression(['12', '/', '13', '+', '4', '/', '13', '+', '4', '/', '13', '+', '4', '/', '13', '+', '4', '/', '13', '+', '4'])).toStrictEqual(true);
})

test("test true complex array with float", () => {
    expect(check_expression(['12.', '/', '1.3', '*', '.4'])).toStrictEqual(true);
})