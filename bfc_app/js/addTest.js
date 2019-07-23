if (window.location.href == 'http://localhost:5000/addTest?') {
    window.location.replace("http://localhost:5000/addTest");
}


class Answer {
	constructor(answer, option) {
		this.answer = answer;
		this.option = option;
	}
	
	getAnswer() {
		return this.answer;
	}
	getOption() {
		return this.option;
	}
}

class QuestionList { 
	constructor(_id, idTest, testName, questionName, answers) {
		this._id = _id;  // id question in db
		this.idTest = idTest;  // id test in db
		this.testName = testName;  // название теста
		this.questionName = questionName;  //  вопрос
		this.answers = answers;  // ответы (class Answer)
	}
	
	addQuestion(answer) {
		this.answers.push(answer);
	}
	
	getTestID() {
		return this.idTest;
	}
	getQuestionID() {
		return this._id;
	}
	getTestName() {
		return this.testName;
	}
	getQuestionName() {
		return this.questionName;
	}
	getAnswers() {
		return this.answers;
	}
}


ifLogged();


function ifLogged() {
    if (sessionStorage.getItem('status') == null) {
        $('#userSettings').append('<a href="/signin" class="a2 mr-3">Войти</a>');
        $('#userSettings').append('<a href="/signup"  class="a2">Регистрация</a>');
    } 
    else {
    	const name = sessionStorage.getItem('name');
        $('#userSettings').append('<a href="/personalarea" class="a2 mr-3">' + name + '</a>');
        $('#userSettings').append('<a href="/" onclick="signOut()" id="signOut" class="a2">Выйти</a>');
        $('#tests').append('<a class="nav-link" href="/addtest">Добавить тест</a>');
        
		
		$.getJSON('/api/tests', function(content) {
			if ('create' != sessionStorage.getItem('helpStatusAddTest')) {
		 		$('#label').append('<input id="test_name"  type="text" placeholder="Пример: Сможете ли вы пройти тест на четкость зрения и мышления?" required>' +
        		'<button class="btn btn-primary btn-lg btn-block mx-auto mt-3" style="width:696px" onclick="addTest()">Утвердить</button>');
		 	}
		 	else {			
  				const testNameSession = sessionStorage.getItem('newTestName');
  			
  				for (var i = 0; i < content.length; i++) {
		 			if (content[i].name == name && content[i].testName == testNameSession) {
		 				sessionStorage.setItem('currentTest', content[i]._id);
		 				break;
		 			}
		 		}
  			
 				var userContent = [];
 				var tmp = 0;
 				const _currTestID = sessionStorage.getItem('currentTest');
 				for (var k = 0; k < content.length; k++) {
 					if (content[k].idTest == _currTestID && content[k].questionName != null) {
  						//  Получение вопросов
 						const answers = [];
 						for (var j = 0; j < 3; j++)
 						{
 							answers.push(new Answer(content[k].answers[j], content[k].options[j]));
 						}
 						userContent.push(new QuestionList(content[k]._id, content[k].idTest, content[k].testName, content[k].questionName, answers));	
 					}
 					// Отображение вопросов
 					for (var i = tmp; i < userContent.length; i++) {
 						// Отображение вопроса
 						$('#test').append('<div id="' + userContent[i].getQuestionID() + '"style="margin-bottom:30px; border: 1px double #ced4da;"><h4 class="text-h pl-4">Вопрос теста</h4><p class="text-h pl-4">' + userContent[i].getQuestionName() + '</p><h4 class="text-h pl-4 mt-5">Варианты ответов</h4></div>');
 						const answers = userContent[i].getAnswers();
 						for (var j = 0; j < 3; j++) {
 							// Отображение ответов
 							const answerText = answers[j].getAnswer();
 						
 							var answerOption = "✖";
 							if (answers[j].getOption() == "true")
 								answerOption = "✓        "; 							
 							$('#' + userContent[i].getQuestionID()).append('<p class="text-h pl-4">' + answerOption+ answerText + '</p>')
 						}
 						tmp ++;
 					}
 				}
 				$('#label').append('<h5 id="test_name" class="text-h pl-4">' + testNameSession + '</h5>');
				$('#test').append('<div style="margin-bottom:30px; border: 1px double #ced4da;">' +
    				'<h4 class="text-h pl-4">Вопрос теста</h4>' +
    				'<input id="test_question" type="text" placeholder="Пример: Какой из столбцов больший?">' +
    				
    				'<h4 class="text-h pl-4 mt-5">Варианты ответов</h4>' +
    					'<form>' +
    							'<div class="checkbox">' +
    								'<label class="row mx-4">' +
    									'<input id="option0" name="option1" class="col-md-1 my-2" style="position:absolute" type="checkbox" value="true">' +
    									'<input id="test_answers0" class="col-md-11 ml-4" type="text" placeholder="Пример: Левый" required>' +
    								'</label>' +
    							'</div>' +
    							'<div class="checkbox">' +
    								'<label class="row mx-4">' +
    									'<input id="option1" class="col-md-1 my-2" style="position:absolute" type="checkbox" value="option2">' +
    									'<input id="test_answers1" class="col-md-11 ml-4" type="text" placeholder="Пример: Правый">' +
    								'</label>' +
    							'</div>' +
    							'<div class="checkbox">' +
    								'<label class="row mx-4">' +
    									'<input id="option2" class="col-md-1 my-2" style="position:absolute" type="checkbox" value="option3">' +
    									'<input id="test_answers2" class="col-md-11 ml-4" type="text" placeholder="Пример: Одинаковые">' +
    								'</label>' +
    							'</div>' +
    				'	</form>' +
    			'</div>');
    			$('#buttonTest').append('<button class="btn btn-primary btn-lg btn-block mx-auto mt-3" style="width:696px" onclick="addQuestion()">Добавить вопрос</button>' +
    			'<button class="btn btn-primary my-4 mx-auto btn-lg btn-block" style="width:696px" type="submit" onclick="updateTest()">Добавить тест</button>');
 			}
 		});
    
    }
}

function signOut() {
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('name');
}

function stringWithoutSpaces(str) {
    return str.split(' ');
}

function updateTest() {
	sessionStorage.setItem('helpStatusAddTest', null);
	sessionStorage.setItem('newTestName', null);
	sessionStorage.setItem('currentTest', null);
	window.location.replace("/testsPage");
}

function addQuestion () {
	var answers = [];
	var options = [];
	for (var i = 0; i < 3; i++) {
		answers.push(document.getElementById('test_answers'+i).value);
		options.push(document.getElementById('option'+i).checked);
	}
	const params = 'idtest=' + sessionStorage.getItem('currentTest') + '&testname=' + sessionStorage.getItem('newTestName') +
		'&questioname=' + document.getElementById('test_question').value + 
		'&options0=' + options[0] + '&options1=' + options[1] + '&options2=' + options[2] + 
		'&answers0=' + answers[0] + '&answers1=' + answers[1] + '&answers2=' + answers[2] + 
		'&name=' + sessionStorage.getItem('name') + '&newquestion=true';
	var xhr = new XMLHttpRequest();
	xhr.open("GET", '/addTest?' + params, true);
	xhr.send();
	alert("send params");
	window.location.replace("/addtest");
}

function addTest() {
	const testName = document.getElementById('test_name').value;
	const params = 'testname=' + testName + '&name=' + sessionStorage.getItem('name');
	var xhr = new XMLHttpRequest();
	xhr.open("GET", '/addTest?' + params, true);
	xhr.send();
	alert("Success");
	sessionStorage.setItem('helpStatusAddTest', 'create');
	sessionStorage.setItem('newTestName', testName);
	window.location.replace("/addtest");
}
