import './App.css';
import React from 'react';

function App() {
  const [birthDay, setBirthDay] = React.useState('');
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  //to convert date string to object with added zeroes to suffix 
  const dateConverter = (bday) => {
    let date = {};
      if(bday.length === 10 ){
        const dateArray = bday.split("-");
        date = {
          year : dateArray[0],
          month : dateArray[1],
          day : dateArray[2]
        }
      }
      else{
        const dateArray = bday.split("-");
        //console.log(dateArray)
        date = {
          year : dateArray[0],
          month : dateArray[1].length !== 2 ? '0'+dateArray[1] : dateArray[1],
          day : dateArray[2].length !== 2 ? '0'+dateArray[2] : dateArray[2]
        }
      }
    return date
  }

  //to return date in different formats (ddmmyy, mmddyy ...)
  const getFormats = (userDate) => {
    
    let ddmmyyyy = userDate.day + userDate.month + userDate.year;
    let mmddyyyy = userDate.month + userDate.day + userDate.year;
    let yyyymmdd = userDate.year + userDate.month + userDate.day;
    let ddmmyy = userDate.day + userDate.month + userDate.year.slice(-2);
    let mmddyy = userDate.month + userDate.day + userDate.year.slice(-2);
    let yymmdd = userDate.year.slice(-2) + userDate.month + userDate.day; 

    let formats= [ ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    //console.log('formats ', formats)
    return formats
  }

  //to check if the date is palindrome or not
  const isPalindrome = (dateFormats) => {
    for(var i=0;i<dateFormats.length;i++){
       if(dateFormats[i].split("").reverse().join("") === dateFormats[i]){
         return true
       }
    }
    return false
  }

  //to increment the given date by 1 day
  const dateIncrementer = (bday) => { 
    var nextDate = new Date(bday);
    //  console.log(bday,nextDate)
    nextDate.setDate(nextDate.getDate()+1);
    let nextDateStr = nextDate.getFullYear()+'-'+(nextDate.getMonth() + 1)+'-'+nextDate.getDate();
    return nextDateStr
  }

  //checks for the next palindrome
  const nextPalindrome = (bday) => {
    let currentDate = bday;
    let newDate = {};
    let newDateStr = '';
    while(true){
      newDate = dateConverter(dateIncrementer(currentDate))
      newDateStr = newDate.year+'-'+ newDate.month + '-' +newDate.day;
      //console.log(currentDate,newDate)
      let dateFormats = getFormats(newDate)
      if(isPalindrome(dateFormats)){
        let d1 = new Date(newDateStr)
        let d2 =new Date(bday)
        let diff = (d1-d2)/(1000*60*60*24)
        return 'Oops! your birthday is not a palindrome , next palindrome at '+newDate.day+'-'+ newDate.month + '-' +newDate.year +', you have missed it by '+diff+' days';
      }
      currentDate = newDateStr;
    }
        
  }

  const handler = (bday,event) => {
    event.preventDefault();
    if(bday){
      setLoading(true);
      let userDate = dateConverter(bday)
      let dateFormats = getFormats(userDate)
      setResult(isPalindrome(dateFormats) ? 'Yosssh!! Your birthday is a palindrome' : nextPalindrome(bday));
      setTimeout(()=>setLoading(false),2000)
    }
  }

  return (
    <div className="App">
      <div>
        <header style={{color: '#ece6e6'}}>
          <h1>Palindrome Birthday</h1>
          <p>A palindrome birthday checker that will also show the 
            nearest palindrome date and how many days missed</p>
        </header>
        <p>Enter your birthday</p>
        <form>
          <input type="date" onChange={(event)=>setBirthDay(event.target.value)} required ></input>
          <button onClick={(event)=>handler(birthDay,event)}>Check</button>
        </form>  
      </div>
      <div>
        {
          loading ? 'Checking....' : (result !== '' ? result : null) 
        }
      </div>
    </div>
  );
}

export default App;
