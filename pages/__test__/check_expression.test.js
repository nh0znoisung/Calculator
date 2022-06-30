const check_expression = require('../utils.js').check_expression;

// TODO: Checking the array of converted expression is valid
// Valid condition: 
//      If array is empty, return true
//      If array is not empty, check if the first element is a number and numbers and operators are placed alternating.
//  Array[String] => Boolean
// Fixed bug: 

test("test basic", () => {
    expect(check(['1','+','3.5'])).toStrictEqual(true);
})

test("test empty array", () => {
    expect(check([])).toStrictEqual(true);
})
