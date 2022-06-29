const evaluate =  require('../utils.js').evaluate


// test("properly covert string to array", () => {
//     expect(evaluate(1,2)).toBe(3);
// })
const convert =  require('../utils.js').convert

// s: String => arr[]
// Float point, operator
test("properly covert string to array", () => {
    expect(convert("1+3.5")).toStrictEqual(['1', '+', '3.5']);
})
