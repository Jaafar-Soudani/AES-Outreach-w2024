"use client"

import Image from 'next/image'
import { useRef, useState , useEffect, ChangeEvent } from 'react';
import {decode} from 'html-entities';


type QApair = {
  question : string;
  answer: boolean;
};

type Notification = {
  message : string;
  style : string;
  visible : boolean;
}

/**
 * Returns question-answer pair i n an array [question, answer]
 */
async function  fetchQuestion() : Promise<QApair> {
  //define API route
  const URI = 'https://opentdb.com/api.php?';

  //define API params
  const amount = 1;
  const difficulty = 'easy';
  const type = 'boolean';
  const category = 9;

  const fullURIString = `${URI}amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`;
  let toRet: QApair = {question: 'Loading...', answer: false};
  //Fetch
  await fetch(fullURIString)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error while calling API");
      }
      return response.json();
    }).then((data) => {
      //Check the inner status code
      if (data.response_code != 0) {
        throw new Error("API did not return desired result");
      }
      //get question and answer and print them
      const question = data.results[0].question;
      const answer = data.results[0].correct_answer;
      console.log(question, answer);
      toRet = {question:question, answer: answer};
    })//error handling
    .catch((err) => { console.error(err); 
    })
    return toRet;
    
}

export default function Home() {
  const [question, setQuestion] = useState('Loading...');
  const [answerTrue, setAnswerTrue] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [notification, setNotification] = useState<Notification>({message: '', style:'',visible:false})
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  

  const TIMEOUT = 3000;
  
  //fetch a question when the page is first loaded
  useEffect( ()=>{
    const qna = fetchQuestion();
    if(inputRef1.current)
      inputRef1.current.checked = false;
    if(inputRef2.current)
      inputRef2.current.checked = false;
    qna.then((val:QApair)=>{
      setQuestion(val?.question);
      setAnswerTrue(val?.answer);
    })
  }, [questionCounter]);

  //user respones handling
  const handleAnswer = (event: ChangeEvent<HTMLInputElement>)=>{
    const UserAnswer = event.target.value;
    console.log(UserAnswer, "vs", answerTrue);
    if(UserAnswer.toLowerCase() === answerTrue.toString().toLowerCase()){
      setNotification({
        message: "Correct!",
        style:"green",
        visible: true   
      })
      setTimeout(()=>{setNotification({
        message: "",
        style:"",
        visible: false   
      })}, TIMEOUT)
    }else{
      setNotification({
        message: "Incorrect!",
        style:"red",
        visible: true   
      })
      setTimeout(()=>{setNotification({
        message: "",
        style:"",
        visible: false   
      })}, TIMEOUT)
    }

    setTimeout(()=>{setQuestionCounter(questionCounter+1)}, TIMEOUT)
  }


  return (
    <div className="card rounded">
        <h1>Open Trivia!</h1>
        <span id="qBox">
            <span>Question: </span><label id="question">{decode(question.toString())}</label>
        </span>
        <span id="aBox">
            <label htmlFor="Atrue">True</label>
            <input ref={inputRef1} type="radio" name="answer" id="Atrue" className="radioButton" onChange={handleAnswer} value="true"/>
            
            <label htmlFor="Afalse">False</label>
            <input ref={inputRef2} type="radio" name="answer" id="Afalse" className="radioButton" onChange={handleAnswer} value="false"/>
        </span>
        {notification.visible?<div className={`${notification.style} notifMessage`}>{notification.message}</div>: <></>}
    </div>
  )
}
