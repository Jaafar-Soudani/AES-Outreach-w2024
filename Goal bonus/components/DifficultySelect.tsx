import React, { ChangeEvent } from 'react'

type DiffSelectParams = {
    questionCounter : number;
    currentState : string;
    onChange : CallableFunction;
    options : string[];
};


export default function DifficultySelect({questionCounter, currentState, onChange, options}:DiffSelectParams) {

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <>
        <label htmlFor="diffSelect">Difficulty: </label>
        <select id="diffSelect" value={currentState} onChange={handleSelectChange} >
        {options.map((option : string) => (
          <option key={option} value={option} disabled={questionCounter!=0}>
            {option}
          </option>
        ))}
      </select>  
      {
        questionCounter==0?<></>:
        <p className="grey-info">You can only change the difficulty when your streak is 0</p>
      }
      </>  )
}
