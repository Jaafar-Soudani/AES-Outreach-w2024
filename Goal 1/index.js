//define API route
const URI = 'https://opentdb.com/api.php?';

//define API params
const amount=1;
const difficulty='easy';
const type='boolean';
const category=9;

const fullURIString = `${URI}amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`;

//Fetch
fetch(fullURIString)
.then((response)=>{
    if(!response.ok){
        throw new Error("Error while calling API");
    }
    return response.json();
    }).then((data)=>{
        //Check the inner status code
        if(data.response_code != 0){
            throw new Error("API did not return desired result");
        }

        //get question and answer and print them
        const question = data.results[0].question;
        const answer = data.results[0].correct_answer;
        console.log("True or false:",question);
        console.log("Answer:", answer);
    })//error handling
    .catch((err)=>{console.error(err);})