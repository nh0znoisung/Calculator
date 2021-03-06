// TODO: Convert a string into spiltted array of tokens and operators (+,-,*,/) 
//  String => Array[String]
function convert (s){
    // Return arr
    let arr = [], curr = "";
    for(let i = 0; i<s.length; i++){
        if (['+', '-', '*', '/'].includes(s[i])){
            if(curr != "") arr.push(curr);
            arr.push(s[i]);
            curr = "";
        }else{
            curr += s[i];
        }
    }
    // Only insert when remaining string is not empty
    if(curr != ""){
        arr.push(curr);
    }
    return arr;
}

// TODO: Checking the array of converted expression is valid
// Valid condition: 
//      If array is empty, return true
//      If array is not empty, check if the first element is a number and numbers and operators are placed alternating.
//  Array[String] => Boolean
function check_expression (arr){
    if(arr.length > 0 && arr.length % 2 == 0) return false;
    for(let i = 0; i<arr.length; i++){
        if(['+', '-', '*', '/'].includes(arr[i])){
            if(i%2 == 0) return false;
        }else{
            if(i%2 == 1) return false;
        }
    }
    return true;
}

function evaluate (s){
    //TODO: implement evaluator, s:string
    // Float + BinOp + Unary(-,+) + (-, +, *, /)/ No unary
    let st = [], arr = convert(s);
    if(check_expression(arr) == false) throw "Invalid expression";
    if (arr.length == 0) return 0;
    // push, pop() -> return value
    // parseFloat(ss)
    // length is odd number
    // *, /, +, - is left-associated, *,/ has higher precedence than +,-
    for(const ss of arr){
        if(['+', '-', '*', '/'].includes(ss)){
            st.push(ss);
        }else{ //float
            // Check *,/
            if(st[st.length-1] == '*' || st[st.length-1] == '/'){
                let op = st.pop(), a = st.pop();
                switch(op){
                    case '*':
                        st.push(parseFloat(a) * parseFloat(ss));
                        break;
                    case '/':
                        st.push(parseFloat(a) / parseFloat(ss));
                        break;
                }
            }else{
                st.push(parseFloat(ss));
            }
        }
    }
    // Now just only +, -
    while (true){
        if(st.length == 1) break;   
        let a = st.pop(), b = st.pop(), c = st.pop();
        switch(b){
            case '+':
                st.push(a+c);
                break;
            case '-':
                st.push(c-a);
                break;
        }
    }
    return st[0];
}

module.exports = {
    convert: convert,
    check_expression: check_expression,
    evaluate: evaluate
}