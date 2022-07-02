const evaluate =  require('../utils.js').evaluate


// TODO: Calculate the result of the expression
//  String => Float
test("test simple case", () => {
    expect(evaluate("1+3.5")).toStrictEqual(4.5);
})


test("test length 0", () => {
    expect(evaluate("")).toStrictEqual(0);
})


// Invalid expression: Old case
it("test invalid expression 1", () => {
    expect(() => evaluate("1+3.5+")).toThrow("Invalid expression");
})

test("test invalid expression 2", () => {
    expect(() => evaluate("+3.5")).toThrow("Invalid expression");
})

test("test invalid expression 3", () => {
    expect(() => evaluate("3.5+")).toThrow("Invalid expression");
})

test("test invalid expression 4", () => {
    expect(() => evaluate("+3.5+/")).toThrow("Invalid expression");
})

test("test invalid expression 5", () => {
    expect(() => evaluate("+  3.5  +")).toThrow("Invalid expression");
})

test("test invalid expression 6", () => {
    expect(() => evaluate("/")).toThrow("Invalid expression");
})

// *, / (high precedence), long
test("test high precedence 1", () => {
    expect(evaluate("1+3*2/1-3")).toStrictEqual(4);
})

test("test high precedence 2", () => {
    expect(evaluate("1.1+3*2/1-3")).toStrictEqual(4.1);
})

test("test high precedence 3", () => {
    expect(evaluate("1.1+3*2.2/2.2-3.1")).toStrictEqual(1);
})

test("test high precedence 4", () => {
    expect(evaluate("1.+3*2.2...2/2.2-.1")).toStrictEqual(3.9);
})

//divide 0
test("test divide 0", () => {
    expect(evaluate("1/0")).toStrictEqual(Infinity);
})



