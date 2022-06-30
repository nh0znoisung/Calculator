const convert =  require('../utils.js').convert


// TODO: Convert a string into spiltted array of tokens and operators (+,-,*,/) 
//  String => Array[String]
// Fixed bug: space and empty string at last
test("test basic", () => {
    expect(convert("1+3.5")).toStrictEqual(['1', '+', '3.5']);
})

test("test with 0 element", () => {
    expect(convert("")).toStrictEqual([]);
})

test("test with 1 single element", () => {
    expect(convert("1")).toStrictEqual(['1']);
})

test("test with 1 complex number element", () => {
    expect(convert("1345612")).toStrictEqual(['1345612']);
})

test("test with 1 complex character element", () => {
    expect(convert("1%$##@(&^%)")).toStrictEqual(['1%$##@(&^%)']);
})

test("test with 1 complex character element contains space", () => {
    expect(convert("1%$##@ (&^%)")).toStrictEqual(['1%$##@ (&^%)']);
})

test("test with operator +", () => {
    expect(convert("1+")).toStrictEqual(['1', '+']);
})

test("test with operator -", () => {
    expect(convert("1-")).toStrictEqual(['1', '-']);
})

test("test with operator /", () => {
    expect(convert("1/")).toStrictEqual(['1', '/']);
})

test("test with operator *", () => {
    expect(convert("1*")).toStrictEqual(['1', '*']);
})

test("test with basic float number", () => {
    expect(convert("12.231")).toStrictEqual(['12.231']);
})

test("test with basic float number no float part", () => {
    expect(convert("12.")).toStrictEqual(['12.']);
})

test("test with basic float number no decimal part", () => {
    expect(convert(".212")).toStrictEqual(['.212']);
})

test("test with basic float number start with zero", () => {
    expect(convert("00012.000")).toStrictEqual(['00012.000']);
})

test("test with irregular float number", () => {
    expect(convert("1&^%2.2@#!@#$!{31")).toStrictEqual(['1&^%2.2@#!@#$!{31']);
})

test("test with expression 1", () => {
    expect(convert("1.2 + 3.4 - 4.5 * 7 / 6666.9")).toStrictEqual(["1.2 ","+"," 3.4 ","-"," 4.5 ","*"," 7 ","/"," 6666.9"]);
})

test("test with expression 2", () => {
    expect(convert(".2 + 3. - 4.5 * 7 / 6666.9")).toStrictEqual([".2 ","+"," 3. ","-"," 4.5 ","*"," 7 ","/"," 6666.9"]);
})

test("test with expression 3", () => {
    expect(convert("1.2  +   3.4  -  4.5    *7/6666")).toStrictEqual(["1.2  ","+","   3.4  ","-","  4.5    ","*","7","/","6666"]);
})


test("test with wrong expression", () => {
    expect(convert(".2 + 3+ 4....... - 4.>?5 * 7 / 6&&*%$@666.9")).toStrictEqual([".2 ","+"," 3","+"," 4....... ","-"," 4.>?5 ","*"," 7 ","/"," 6&&","*","%$@666.9",]);
})

test("test with illegal expression", () => {
    expect(convert("1.2--1.2++Ans*")).toStrictEqual(["1.2","-","-","1.2","+","+","Ans","*"]);
})