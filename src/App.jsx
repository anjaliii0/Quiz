import React ,{useState , useEffect }from 'react'
import  "./App.css";
function App() {

  const question=[
  {
    "question": "Which city is home to the Brandenburg Gate?",
    "option": ["Vienna", "Zurich", "Berlin", "Rome"],
    "answer": "Berlin"
  },
  {
    "question": "By what name is the patella bone more commonly known?",
    "option": ["Kneecap", "Shoulder blade", "Collarbone", "Heel"],
    "answer": "Kneecap"
  },
  {
    "question": "What Italian city is famous for its intricate system of canals?",
    "option": ["Rome", "Naples", "Venice", "Florence"],
    "answer": "Venice"
  },
  {
    "question": "In what year did the Battle of Hastings take place?",
    "option": ["1066", "1492", "1776", "1914"],
    "answer": "1066"
  },
  {
    "question": "Who discovered radium and polonium?",
    "option": ["Albert Einstein", "Marie Curie", "Isaac Newton", "Charles Darwin"],
    "answer": "Marie Curie"
  }
  ,{
    "question": "What is the currency used in Japan?",
    "option": ["Yuan", "Won", "Yen", "Baht"],
    "answer": "Yen"
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "option": ["Mercury", "Venus", "Mars", "Saturn"],
    "answer": "Mars"
  },
  {
    "question": "Who wrote the play 'Romeo and Juliet'?",
    "option": ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
    "answer": "William Shakespeare"
  },
  {
    "question": "What is the hardest natural substance on Earth?",
    "option": ["Gold", "Iron", "Diamond", "Quartz"],
    "answer": "Diamond"
  }
]
  const [currQuestion, setcurrQuestion] = useState(0);
  const [error , SetError]=useState(false);
  const [mark,setMark]=useState(0);
  const [chooseAns ,setChooseAns]=useState("");
  const [correctAns ,setCorrectAns]=useState(null);

  const [showAns , setShowAns]=useState(false);

  //new feature
  const [userAns,setUserAns]=useState([]);




  const handleAnswer=(option)=>{
    if(chooseAns) return;
    setChooseAns(option);

    setUserAns([

      ...userAns,{
        question:question[currQuestion].question,
        userAns:option,
        correctAns:question[currQuestion].answer,
        isCorr:option===question[currQuestion].answer,
      }
    ]);

    const correct= option === question[currQuestion].answer;
    setCorrectAns(correct);
    if(correct){
      setMark((prev)=> prev+1);

    }

    setTimeout(() => {
      if(currQuestion+1 < question.length){
        setcurrQuestion(currQuestion+1);
        setChooseAns("");
        setCorrectAns(null);
      }else{
        setShowAns(true);
      }
    }, 1500);



  };

  const restart=()=>{
    setcurrQuestion(0);
    setMark(0);
    setChooseAns("");
    setCorrectAns(null);
    setShowAns(false);
    setUserAns([]);
  };




  return (
    <>
    <h1>Quiz Platform</h1>  
    
   {showAns ? (
    <div>
      <h2> quiz completed!!!</h2>

      <h2> Marks : { mark} / {question.length} </h2>

      <button onClick ={restart}> Again </button>

     {userAns.map((ele,idx)=>{
      return <div>
        <h3>{idx+1}.{ele.question} </h3>
        <p>Overview:
        <span
          className={
            ele.isCorr ? "correct-text" : "wrong-text"
          }
          >
            {ele.userAns} 
        </span>

        </p>

        <p>
          Correct:
          <span className="correct-text">
            {ele.correctAns}
          </span>
        </p>

      </div>
     })}

  </div>

  ) : (

    <div>
      <h2> Question {currQuestion +1} </h2>
      <h3>{question[currQuestion].question}</h3>
      {question[currQuestion].option.map(
        (option, idx)=>{
          let className="opt-btn"
          if(chooseAns){
            if(option=== question[currQuestion].answer){
                className+=" correct";
            }else if(option=== chooseAns){
              className+=" wrong";
            }
          }
          return(
              <button key={idx}  className={className} onClick={ ()=>handleAnswer(option)} > {option}</button>

          );
        }
      )}

      {chooseAns && (

        <p
          className={
            correctAns ? "feedback correct-text" : "feedback wrong-text"
          } >
            {correctAns ? "Correct Answer " : "wrong Answer "}

        </p>
      )}

    </div>
   )}


    </>
  )
}

export default App
