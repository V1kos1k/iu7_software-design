ifLogged();

sessionStorage.setItem('currentTesk', null);
sessionStorage.setItem('helpStatusAddTest', null);

function ifLogged() {
    if (sessionStorage.getItem('status') == null) {
        $("html").remove();
        alert("You are not logged in!");
    } else {
        $('#userSettings').append('<a href="/personalarea" class="a2 mr-3">' + sessionStorage.getItem('name') + '</a>');
        $('#userSettings').append('<a href="/" onclick="signOut()" id="signOut" class="a2">Выйти</a>');
        $('#tests').append('<a class="nav-link" href="/addtest">Добавить тест</a>');
        
        $.getJSON('/api/users', function(data) {
        	var idTestLater = [];
        	
        	 for (var i = 0; i < data.length; i++) {
         		if (data[i].name == sessionStorage.getItem('name')) {
         			idTestLater = data[i].idTestLater;
         		}
         	}
         	
         	$('#label').append('<h1 class="text-h pl-4">Избранные тесты<h1>');
         	displayTests(idTestLater);
        });
    }
}

function signOut() {
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('name');
}

function displayTests(idTests) {
	const tests = $.getJSON('/api/tests', function(content) {
		return content;
	})
	.catch(function(err) {
		console.log(err);
	});
	
	tests.then(function(content) {
		var k = 0;
		for (var i = 0; i < idTests.length; i++) {
			for (var j = 0; j < content.length; j++) {
				if (idTests[i] == content[j]._id && content[j].questionName == undefined) {
					$('#test-list').append('<div id="' + idTests[i] +'" class="test container mt-5 mb-3">' +
											'<p class="text-test text-center" onclick=openTest("' + idTests[i] +'")>' + content[j].testName + '</p>' +
        								  '</div>');
				}
			}
		}
	});
}


function openTest(_id) {
	sessionStorage.setItem('currentTest', _id);
	window.location.replace("/test?id=" + _id);
}










