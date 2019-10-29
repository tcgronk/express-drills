console.log("Hello World")
const express = require('express');

const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    console.log('The root path was called');
    res.send('Hello Express from Tess!')
})

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});


app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });

  app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
  })

  app.get('/pizza/pepperoni', (req,res)=>{
      res.send("Your pizza is on the way!");
  })

  app.get('/pizza/pineapple', (req,res)=>{
    res.send("We don't serve that here. Never call again!");
})

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/sum', (req, res) => {
  //1. get values from the request
  const a = req.query;
  const b = req.query;

//   //2. validate the values
//   if(!a) {
//     //3. name was not provided
//     return res.status(400).send('Please provide a');
//   }

//   if(!b) {
//     //3. race was not provided
//     return res.status(400).send('Please provide b');
//   }

//   //4. and 5. both name and race are valid so do the processing.
//   const sum = `The sum of ${a} the ${b} is ${c}.`;

//   //6. send the response 
//   res.send(sum);
// });

const numA = parseFloat(a);
  const numB = parseFloat(b);

  if(Number.isNaN(numA)) {
    return res
          .status(400)
          .send('a must be a number');
  }

  if(Number.isNaN(numB)) {
    return res
          .status(400)
          .send('b must be a number');
  }

  // validation passed so perform the task
  const c = numA + numB;

  // format the response string
  const responseString = `The sum of ${numA} and ${numB} is ${c}`;

  // send the response
  res
    .status(200)
    .send(responseString);
});


app.get('/cipher', (req, res) => {
  //1. get values from the request
  const text = req.query;
  const shift = req.query;

  if(!text) {
    return res
          .status(400)
          .send('text is required');
  }

  if(!shift) {
    return res
          .status(400)
          .send('shift is required');
  }

  const numShift = parseFloat(shift);

  if(Number.isNaN(numShift)) {
    return res
          .status(400)
          .send('shift must be a number');
  }
  const base = 'A'.charCodeAt(0);  // get char code 

  const cipher = text
    .toUpperCase()
    .split('') // create an array of characters
    .map(char => { // map each original char to a converted char
      const code = char.charCodeAt(0); //get the char code

      // if it is not one of the 26 letters ignore it
      if(code < base || code > (base + 26)) {
        return char;
      }
      
      // otherwise convert it
      // get the distance from A
      let diff = code - base;
      diff = diff + numShift; 
      
      // in case shift takes the value past Z, cycle back to the beginning
      diff = diff % 26;

      // convert back to a character
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(''); // construct a String from the array

  // Return the response
  res
    .status(200)
    .send(cipher);  
});


app.get('/lotto', (req, res) => {
  const { numbers } = req.query; 

  // validation: 
  // 1. the numbers array must exist
  // 2. must be an array
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20

  if(!numbers) {
    return res
      .status(200)
      .send("numbers is required");
  }

  if(!Array.isArray(numbers)) {
    return res
      .status(200)
      .send("numbers must be an array");
  }

  const guesses = numbers
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
  
  if(guesses.length != 6) {
    return res
      .status(400)
      .send("numbers must contain 6 integers between 1 and 20");
  }      

  // fully validated numbers

  // here are the 20 numbers to choose from
  const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !guesses.includes(n));

  // construct a response
  let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }


  // uncomment below to see how the results ran

  // res.json({
  //   guesses,
  //   winningNumbers,
  //   diff,
  //   responseText
  // });

  res.send(responseText);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});