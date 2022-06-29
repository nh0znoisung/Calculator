// Enzyme -> DOM Testing
// Jest: For testing bussiness logic in JS
// https://jestjs.io/docs/tutorial-react#snapshot-testing
// https://www.youtube.com/watch?v=3e1GHCA3GP0
// React testing library

// DOM interaction
const convert =  require('../utils.js').convert

// s: String => arr[]
// Float point, operator
test("properly covert string to array", () => {
    expect(convert("1+3.5")).toStrictEqual(['1', '+', '3.5']);
})
