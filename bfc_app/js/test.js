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
sessionStorage.setItem('currentTest', getIDFromURL());

function getIDFromURL() {
    const str = window.location.href;
    var id = '';
    var flag = false;
    for (var i = 0; i < str.length; ++i) {
        if (flag) {
            if (str[i] == '&')
                break;
            else
                id += str[i];
        }
        if (str[i] == '=') {
            flag = true;
        }
    }
    return id;
}

function ifLogged() {
    if (sessionStorage.getItem('status') == null) {
        $('#userSettings').append('<a href="/signin" class="a2 mr-3">Войти</a>');
        $('#userSettings').append('<a href="/signup"  class="a2">Регистрация</a>');
    } else {
        $('#userSettings').append('<a href="/personalarea" class="a2 mr-3">' + sessionStorage.getItem('name') + '</a>');
        $('#userSettings').append('<a href="/" onclick="signOut()" id="signOut" class="a2">Выйти</a>');
        $('#tests').append('<a class="nav-link" href="/addtest">Добавить тест</a>');
    }
    $.getJSON('/api/tests', function(content) {
        	const _currTestID = sessionStorage.getItem('currentTest');
        	
        	var userContent = [];
 			var tmp = 0;
 			var help = [];
 			var c = 0;
 			for (var k = 0; k < content.length; k++) {
 				if (content[k].idTest == _currTestID && content[k].questionName != null) {
  					//  Получение вопросов
 					const answers = [];
 					for (var j = 0; j < 3; j++) {
 						answers.push(new Answer(content[k].answers[j], content[k].options[j]));
 					}
 					userContent.push(new QuestionList(content[k]._id, content[k].idTest, content[k].testName, content[k].questionName, answers));	
 				}
 				
 				if (tmp == 1)
 					$('#label').append('<h1 class="text-h pl-4">' + userContent[0].getTestName() + '</h1>');
 				// Отображение вопросов
 				for (var i = tmp; i < userContent.length; i++) {
 					const answers = userContent[i].getAnswers();
					$('#test').append('<div id="' + userContent[i].getQuestionID() + '"style="margin-bottom:30px; border: 1px double #ced4da;">' +
 											'<h4 class="text-h pl-4">' + userContent[i].getQuestionName() + '</h4>' +
    				
    					'<h4 class="text-h pl-4 mt-3">Варианты ответов</h4>' +
    					'<form>' +
    						'<div class="checkbox">' +
    							'<label class="row mx-4">' +
    								'<input id="option' + c + '" name="option1" class="col-md-1 my-2" style="position:absolute" type="checkbox" value="true">' +
    								'<p class="text-h pl-4 pt-1">' + answers[0].getAnswer() + '<\p>' +
    							'</label>' +
    						'</div>' +
    						'<div class="checkbox">' +
    							'<label class="row mx-4">' +
    								'<input id="option' + (c+1) + '" class="col-md-1 my-2" style="position:absolute" type="checkbox" value="option2">' +
    								'<p class="text-h pl-4 pt-1">' + answers[1].getAnswer() + '<\p>' +
    							'</label>' +
    						'</div>' +
    						'<div class="checkbox">' +
    							'<label class="row mx-4">' +
    								'<input id="option' + (c+2) + '" class="col-md-1 my-2" style="position:absolute" type="checkbox" value="option3">' +
    								'<p class="text-h pl-4 pt-1">' + answers[2].getAnswer() + '<\p>' +
    							'</label>' +
    						'</div>' +
    					'	</form>' +
    				'</div>');
 					tmp ++;
 					c += 3;
 					for (var q = 0; q < 3; q++) {
 						help[i] = [];
 					}
 					for (var q = 0; q < 3; q++)
 						help[i][q] = answers[q].getOption();
 				}
 			}
 			var idQuestHelp = [];
 			for (var i = 0; i < userContent.length; i++)
 				idQuestHelp[i] = "\'" + userContent[i].getQuestionID() + "\'";
 			$('#buttonTest').append('<button class="btn btn-primary btn-lg btn-block mx-auto my-3" style="width:696px" onclick="completeTest([' + idQuestHelp + '],[' + help + '])">Завершить тест</button>');
        });
}

function signOut() {
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('name');
}

function completeTest(content, options) {
	const idTest = sessionStorage.getItem('currentTest');
	var ok = 0;
	var res = 0;
	for (var i = 0; i < content.length*3; i++) {
		if (options[i] == document.getElementById('option'+i).checked) {
			ok ++;
			if ((i+1) % 3 == 0 && ok == 3)
					res ++;
			
		}
		if ((i+1) % 3 == 0)
			ok = 0;
	}
	alert('Результат: ' + res);
	
	window.location.replace("/testspage");
}
















