"use client"

import { useRef, useState , useEffect, ChangeEvent, RefObject } from 'react';
import {decode} from 'html-entities';
import Answer from '@/components/Answer';
import DifficultySelect from '@/components/DifficultySelect';

type QApair = {
  question : string;
  answer: string;  
  falseAnswers: string[];
};

type Notification = {
  message : string;
  style : string;
  visible : boolean;
}

//Function to shuffle any array
function shuffleArray(array: any[], seed : any) : any[]{

  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.abs(Math.sin(seed)) * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

/**
 * Returns question-answer pair i n an array [question, answer]
 */
async function  fetchQuestion(diff: string) : Promise<QApair> {
  //define API route
  const URI = 'https://opentdb.com/api.php?';

  //define API params
  const amount = 1;
  const difficulty = diff;
  const type = 'multiple';
  const category = 9;

  const fullURIString = `${URI}amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`;
  let toRet: QApair = {question: 'Loading...', answer: '', falseAnswers: []};
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
      const falseAnswers = data.results[0].incorrect_answers;
      console.log(question, answer, falseAnswers);
      toRet = {question:question, answer: answer, falseAnswers: falseAnswers};
    })//error handling
    .catch((err) => { console.error(err); 
    })
    return toRet;
    
}

export default function Home() {
  const TIMEOUT = 3000;
  const EXPECTED_NUM_ANSWERS = 4;
  const DIFFICULTY_OPTIONS = ['easy', 'medium', 'hard'];
  const QUESTIONS_TO_WIN = 2;

  let inputReferences : React.RefObject<HTMLInputElement>[]= [];
  for(let i=0; i<EXPECTED_NUM_ANSWERS; i++){
    inputReferences[i] = useRef<HTMLInputElement>(null);
  }


  const [question, setQuestion] = useState('Loading...');
  const [answerTrue, setAnswerTrue] = useState<String>('');
  const [answerFalse, setAnswerFalse] = useState<String[]>([]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [notification, setNotification] = useState<Notification>({message: '', style:'',visible:false})
  const [lastCorrect, setLastCorrect] = useState(false);
  const [firstQuestionSetter, setFirstQuestionSetter] = useState(false);
  const [difficulty, setDifficulty] = useState<string>(DIFFICULTY_OPTIONS[0]);
  

  
  //fetch a question when the page is first loaded
  useEffect( ()=>{
    const qna = fetchQuestion(difficulty);
    inputReferences.forEach((input:RefObject<HTMLInputElement>)=>{
      if(input.current)
        input.current.checked = false;
    })
   
    qna.then((val:QApair)=>{
      setQuestion(val?.question);
      setAnswerTrue(val?.answer);
      setAnswerFalse(val?.falseAnswers);
    })
  }, [questionCounter, firstQuestionSetter, difficulty]);

  //check if game was won, and redirect to congrats page if yes
  useEffect(()=>{
    if(questionCounter>=QUESTIONS_TO_WIN){
      console.log("routing");
      window.location.href = '/congrats';
      
    }else{
      console.log('not yet');
    }

  },[questionCounter] );


  //user respones handling
  const handleAnswer = (event: ChangeEvent<HTMLInputElement>)=>{
    const UserAnswer = event.target.value;
    console.log(UserAnswer, "vs", answerTrue);
    if(UserAnswer.toLowerCase() === decode(answerTrue.toString()).toString().toLowerCase()){
      setNotification({
        message: "Correct!",
        style:"green",
        visible: true   
      })
      setLastCorrect(true);
      
    }else{
      setNotification({
        message: `Incorrect! The correct answer was ${answerTrue}`,
        style:"red",
        visible: true   
      })
      setLastCorrect(false);
    }

  }
  
  //Handlers for next and reset buttons
  const nextClick = ()=>{
    setNotification({
      message: "",
      style:"",
      visible: false   
    })
    setQuestionCounter(questionCounter+1)
  }
    //setNextButton(invisible)
  const resetClick = ()=>{
    setNotification({
      message: "",
      style:"",
      visible: false   
    })
    if(questionCounter === 0){
      setFirstQuestionSetter(!firstQuestionSetter);
    }else{
      setQuestionCounter(0)
    }
  }

  return (
    <div className="card rounded">

        <h1>Open Trivia!</h1>
        <span>Current Streak: {questionCounter}</span>
        <span id="qBox">
            <span>Question: </span><span id="question">{decode(question.toString())}</span>
        </span>
        <span id="aBox">
            { shuffleArray([...answerFalse, answerTrue], questionCounter).map((value:any, index:number)=>{
              return <Answer key={index} inputRef={inputReferences[index]} handleAnswer={handleAnswer} answerText={decode(value)} id={`Answer${index}`}></Answer>
            })}
        </span>
        {notification.visible?
          <div>
            <div className={`${notification.style} notifMessage`}>
              {notification.message}
            </div>
            <div>
              {lastCorrect?
                  <button className="NRbutton green" onClick={nextClick}>Next</button>
              :   <button className="NRbutton red" onClick={resetClick}>Restart</button>
              }
            </div>
          </div>
          
        : 
          <>
          </>}
        
        <DifficultySelect questionCounter={questionCounter} currentState={difficulty} onChange={setDifficulty} options={DIFFICULTY_OPTIONS}></DifficultySelect>

    </div>
  )
}
