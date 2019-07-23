ifLogged();

sessionStorage.setItem('currentTest', null);
sessionStorage.setItem('helpStatusAddTest', null);

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
        	var testName = [];
        	var _id = [];
        	
        	for (var i = 0; i < content.length; i++) {
        		if (content[i].questionName == null) {
        			testName.push(content[i].testName);
        			_id.push(content[i]._id);
        		}
        	}
        	for (var i = 0; i < testName.length; i++) {
        			$('#test-list').append('<div id="' + _id[i] +'" class="test container mt-5 mb-3">' +
        				'<p class="text-test text-center" onclick=openTest("' + _id[i] +'")>' + testName[i] + '</p>' +
        			'</div>');
        			if (sessionStorage.getItem('name') != null)
        				$('#'+_id[i]).append('<button style="margin-left:92%; margin-top:6%; background-color: #F1D1FA;" onclick="addFavorites(\'' + _id[i] +'\')">★</button>');
        	}
        });
}

function signOut() {
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('name');
}

function openTest(_id) {
	sessionStorage.setItem('currentTest', _id);
	window.location.replace("/test?id=" + _id);
}


function addFavorites(id) {
	const users = $.getJSON('/api/users', function(data) {
        return data;
    })
    .catch(function(err) {
    	console.log(err);
    }); 
    
    users.then(function(data) {
    	var idName;
    	for (var i = 0; i < data.length; i++) {
			if (data[i].name == sessionStorage.getItem('name')) {
				idName = data[i]._id;
			}
		}
		const params = 'idTest=' + id + '&idName=' + idName;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", '/testsPage?' + params, true);
		xhr.send();
		
		window.location.replace("/testsPage");
    });
}

















