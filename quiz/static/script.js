//config
const loadTime = 0;

// loader
var score;
const loader = document.querySelector('.loader');
const main = document.querySelector('.main');

// function load() {
//   loader.style.opacity = 1;
//   loader.style.display = 'block';
//   main.style.opacity = 0;
//   main.style.display = 'none'
//   setTimeout(() => {
//     loader.style.opacity = 0;
//     loader.style.display = 'none';

//     main.style.display = 'block';
//     setTimeout(() => main.style.opacity = 1, 50);
//   }, loadTime);
// };


var session = new Vue({
  el: '#sessionValues',
  delimiters: ['[[',']]'],
  data: {
    score: 0,
    lives: 3
  },
  methods: {
    removeScore: function (value) {
      this.score -= value;
    },
    addScore: function () {
      this.score += 100;
    },
    removeLife: function () {
      this.lives -= 1;
    },
    addLife: function () {
      this.lives += 1;
    },
    getLives: function (){
      return this.lives;
    }

  }
});

var startPage = new Vue({
  el: '#startQuiz',
  delimiters: ['[[',']]'],
  data: {
    visible: true
  },
  methods: {
    takeQuiz: function(){
      this.visible = false;
      getQuestion();
    }
  }
});

var question = new Vue({
  el: '#question',
  delimiters: ['[[',']]'],
  data: {
    message: 'kjhkjhkjh',
  },
  methods: {
    update: function (value) {
      this.message = value;
    },
    check: function (event) {
      const question = jsonObject.question;
      const answer = this.message;

      checkAnswer(question, answer);
    }
  }
});

var ans1 = new Vue({
  el: '#ans1',
  delimiters: ['[[',']]'],
  data: {
    message: '',
  },
  methods: {
    update: function (value) {
      this.message = value;
    },
    check: function (event) {
      const question = jsonObject.question;
      const answer = this.message;

      checkAnswer(question, answer);
    }
  }
});

var ans2 = new Vue({
  el: '#ans2',
  delimiters: ['[[',']]'],
  data: {
    message: '',
  },
  methods: {
    update: function (value) {
      this.message = value;
    },
    check: function (event) {
      const question = jsonObject.question;
      const answer = this.message;

      checkAnswer(question, answer);
    }
  }
});

var ans3 = new Vue({
  el: '#ans3',
  delimiters: ['[[',']]'],
  data: {
    message: '',
  },
  methods: {
    update: function (value) {
      this.message = value;
    },
    check: function (event) {
      const question = jsonObject.question;
      const answer = this.message;

      checkAnswer(question, answer);
    }
  }
});

var ans4 = new Vue({
  el: '#ans4',
  delimiters: ['[[',']]'],
  data: {
    message: '',
  },
  methods: {
    update: function (value) {
      this.message = value;
    },
    check: function (event) {
      const question = jsonObject.question;
      const answer = this.message;

      checkAnswer(question, answer);
    }
  }
});

//show loading animation
function startLoad() {
  loader.style.opacity = 1;
  loader.style.display = 'block';
  main.style.opacity = 0;
  main.style.display = 'none'
}

//hide loading animation
function endLoad() {
  loader.style.opacity = 0;
  loader.style.display = 'none';
  main.style.display = 'block';
  setTimeout(() => main.style.opacity = 1, 20);
}

// load();


//variable to store deserialized json data
var jsonObject;
var testjson = '{"question" : "what is the answer", "answers" : { "ans1":"this is not the answer", "ans2":"also not the answer", "ans3":"definitely not the answer", "ans4": "this is the answer"}}';


//shuffle function
var shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

//randomiser
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//get request to api to get questions and options
function getQuestion() {
  //list used to randomize choices
  var choices = [];
  //show loading animation 
  startLoad();
  //query api  
  fetch('http://quiz.sebbycake.com/api/question/')
    .then(res => res.json())
    .then(res => {
      jsonObject = JSON.parse(testjson);
      choices.push(jsonObject.answers.ans1);
      choices.push(jsonObject.answers.ans2);
      choices.push(jsonObject.answers.ans3);
      choices.push(jsonObject.answers.ans4);
      //randomise the list
      shuffle(choices);
      //update vue components to display data
      question.update(jsonObject.question);
      ans1.update(choices[0]);
      ans2.update(choices[1]);
      ans3.update(choices[2]);
      ans4.update(choices[3]);
      //remove loading screen 
      endLoad();
    });
}

function checkAnswer(ques, ans) {
  //create and populate form data 
  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'http';
  const q = document.createElement('input');
  q.type = 'hidden';
  q.name = 'question';
  q.value = ques;
  form.appendChild(q);
  const a = document.createElement('input');
  a.type = 'hidden';
  a.name = 'answer';
  a.value = ans;
  form.appendChild(a);

  //TODO remove when able to actually fetch stuffz
  getQuestion();
  session.addScore();
  switch (getRandomInt(10)) {
    case 1:
      //take away life cause why not
      alert("I'm taking one of your lives away cause why not");
      session.removeLife();
    case 2:
      alert("Here's an extra life for your efforts");
      session.addLife();
    case 3:
      var subtract = getRandomInt(300);
      alert("You're doing too well, I'm taking away " + subtract + " points.");
      session.removeScore(subtract);
  }

  //post request to api to check correctness of answer
  fetch(path, {
    method: "POST",
    body: form,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then((response) => {
    var result = false;
    if (response.status == 'ok') {
      //answer is correct therefore add to score
      session.addScore();
    } else {
      //wrong answer, take life away
      session.removeLife();
    }

    switch (getRandomInt(10)) {
      case 1:
        //take away life cause why not
        alert("I'm taking one of your lives away cause why not");
        session.removeLife();
      case 2:
        alert("Here's an extra life for your efforts");
        session.addLife();
      case 3:
        var subtract = getRandomInt(300);
        alert("You're doing too well, I'm taking away " + subtract + " points.");
        session.removeScore(subtract);
    }

    if(session.getLives()<=0){
      die();
    }else{
      //load new question    
      getQuestion();
    }
  });
}
getQuestion();
