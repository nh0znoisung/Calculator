import React, {useState, useEffect, useRef} from 'react';
import {evaluate} from './utils.js';


const useEventListener = (eventName, handler) => {
    const savedHandler = useRef();
  
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
  
    useEffect(() => {
      const eventListener = (event) => savedHandler.current(event);
      window.addEventListener(eventName, eventListener);
      return () => {
        window.removeEventListener(eventName, eventListener);
      };
    });
  };

export default function Main() {
    const [preResult, setPreResult] = useState('');
    const [result, setResult] = useState(""); //eval()
    const [isTyping, setIsTyping] = useState(true);

    function display(s){    
        if(s == "") return "0";
        
        // scientific notation
        if(isTyping) return s;
        else{
            if(s.toString().length > 7) return Number(s).toExponential(7);
            return s;
        }
    }

    const handleClick = (e) => {
        result = result.toString();
        if (!isTyping){
            if (['+', '/', '*', '-'].includes(e.target.name)){
                setResult("Ans" + e.target.name);
            }else{
                setResult(e.target.name);
            }

            setIsTyping(true);

        }else{
            if (result == "") {
                if(['+', '/', '*', '-'].includes(e.target.name)){
                    setResult("0" + e.target.name);
                    return;
                }
            } 
            setResult(result.concat(e.target.name));
        }
    }

    const backspace = () => {
        if(result.length >= 3){
            if(result.slice(-3) == "Ans"){
                setResult(result.slice(0,-3));
                return;
            }
        }

        setResult(result.slice(0, -1));
    }

    const clear = () => {
        setResult("");
    }
    
    // Not use eval() -> Lexer, Parser, AST -> Result
    const calc = () => {
        if (!isTyping) return;
        // replace 
        result = result.replace("Ans", preResult);
        try {
            let res = Number(evaluate(result).toString())
            setResult(res);
            // console.log(isNaN(res))
            if(isNaN(res)) res = 0;
            setPreResult(res);
            setIsTyping(false);
        } catch(e) {
            setResult("Invalid Format");
            setIsTyping(false);
        }
    }
    const handleKeyPress = ({key}) => {
        // console.log(String(key))
        let k = String(key)
        if(k.toLowerCase() == 'a'){
            k = "Ans"
        }
        if (['0','1','2','3','4','5','6','7','8','9', '+', '-','/','*','.',"Ans"].includes(k)){
            result = result.toString();
            if (!isTyping){
                if (['+', '/', '*', '-'].includes(k)){
                    setResult("Ans" + k);
                }else{
                    setResult(k);
                }
    
                setIsTyping(true);
    
            }else{
                if (result == "") {
                    if(['+', '/', '*', '-'].includes(k)){
                        setResult("0" + k);
                        return;
                    }
                } 
                setResult(result.concat(k));
            }
        }else if(k == "Enter" || k == "="){
            calc()
        }else if(k == "Backspace"){
            backspace()
        }else if(k.toLowerCase() == "c"){
            clear()
        }
    }
    // handle button + evaluate() + testing + submit    
    // onKeyPress={e -> e.key}
    useEventListener("keydown", handleKeyPress);
	return (
        <div>
            <h1 className="title">My Calculator</h1>
            <div className="calculator">
                <div className="calc-numbers">
                {/* {preResult} */}
                    <div className="answer">Ans = {display(preResult)}</div>
                    {/* <input type="text" className="text" value={display(result)} /> */}
                    <div className="text" tabIndex="0" onKeyDown={handleKeyPress}>{display(result)}</div>
                </div>
                <div className="calculator-buttons">
                    <button onClick={clear} className="btn clear">C</button>
                    <button onClick={handleClick} name="Ans" className="btn brown">Ans</button>
                    <button onClick={backspace} className="btn blue">&larr;</button>
                    <button onClick={handleClick} name="/" className="btn orange">&divide;</button>
                    <button onClick={handleClick} name="7" className="btn">7</button>
                    <button onClick={handleClick} name="8" className="btn">8</button>
                    <button onClick={handleClick} name="9" className="btn">9</button>
                    <button onClick={handleClick} name="*" className="btn orange">x</button>
                    <button onClick={handleClick} name="4" className="btn">4</button>
                    <button onClick={handleClick} name="5" className="btn">5</button>
                    <button onClick={handleClick} name="6" className="btn">6</button>
                    <button onClick={handleClick} name="-" className="btn orange">-</button>
                    <button onClick={handleClick} name="1" className="btn">1</button>
                    <button onClick={handleClick} name="2" className="btn">2</button>
                    <button onClick={handleClick} name="3" className="btn">3</button>
                    <button onClick={handleClick} name="+" className="btn orange">+</button>
                    <button onClick={handleClick} name="0" className="btn span-2">0</button>
                    <button onClick={handleClick} name="." className="btn">.</button>
                    <button onClick={calc} className="btn orange equal">=</button>
                </div>
            </div>
      </div>
  	)
}
