const convert =  require('../utils.js').convert

// s: String => arr[]
// Float point, operator
test("properly convert string to array", () => {
    expect(convert("1+3.5")).toStrictEqual(['1', '+', '3.5']);
})


