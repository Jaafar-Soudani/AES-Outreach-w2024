import React, { ChangeEventHandler } from 'react'
type AnswerParams ={
    inputRef : any;
    handleAnswer : ChangeEventHandler;
    answerText : string;
    id : string;

};
export default function Answer({inputRef, handleAnswer, answerText, id}: AnswerParams) {
  return (
    <div>
        <input 
            ref={inputRef} 
            id={id}
            type="radio" 
            name="answer" 
            className="radioButton" 
            onChange={handleAnswer} 
            value={answerText}
        />
        <label htmlFor={id}>{answerText}</label>

    </div>
  )
}
