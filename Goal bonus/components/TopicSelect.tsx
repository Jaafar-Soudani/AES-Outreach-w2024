import React, { ChangeEvent } from 'react'

type TopicSelectParams = {
    questionCounter : number;
    currentState : number;
    onChange : CallableFunction;
};


/**
 * options for topics
 */
const options : {id:number, name:string}[] = [
          {
            "id": 9,
            "name": "General Knowledge"
          },
          {
            "id": 10,
            "name": "Entertainment: Books"
          },
          {
            "id": 11,
            "name": "Entertainment: Film"
          },
          {
            "id": 12,
            "name": "Entertainment: Music"
          },
          {
            "id": 13,
            "name": "Entertainment: Musicals & Theatres"
          },
          {
            "id": 14,
            "name": "Entertainment: Television"
          },
          {
            "id": 15,
            "name": "Entertainment: Video Games"
          },
          {
            "id": 16,
            "name": "Entertainment: Board Games"
          },
          {
            "id": 17,
            "name": "Science & Nature"
          },
          {
            "id": 18,
            "name": "Science: Computers"
          },
          {
            "id": 19,
            "name": "Science: Mathematics"
          },
          {
            "id": 20,
            "name": "Mythology"
          },
          {
            "id": 21,
            "name": "Sports"
          },
          {
            "id": 22,
            "name": "Geography"
          },
          {
            "id": 23,
            "name": "History"
          },
          {
            "id": 24,
            "name": "Politics"
          },
          {
            "id": 25,
            "name": "Art"
          },
          {
            "id": 26,
            "name": "Celebrities"
          },
          {
            "id": 27,
            "name": "Animals"
          },
          {
            "id": 28,
            "name": "Vehicles"
          },
          {
            "id": 29,
            "name": "Entertainment: Comics"
          },
          {
            "id": 30,
            "name": "Science: Gadgets"
          },
          {
            "id": 31,
            "name": "Entertainment: Japanese Anime & Manga"
          },
          {
            "id": 32,
            "name": "Entertainment: Cartoon & Animations"
          }
        ];

export default function DifficultySelect({questionCounter, currentState, onChange}:TopicSelectParams) {

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <>
        <label htmlFor="topicSelect">Topics: </label>
        <select id="topicSelect" value={currentState} onChange={handleSelectChange} >
        {options.map((option : {id : number, name: string}) => (
          <option key={option.id} value={option.id} disabled={questionCounter!=0}>
            {option.name}
          </option>
        ))}
      </select>  
      {
        questionCounter==0?<></>:
        <p className="grey-info">You can only change the topic when your streak is 0</p>
      }
      </>  )
}
