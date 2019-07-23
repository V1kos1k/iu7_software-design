if (window.location.href == 'http://localhost:5001/signup?') {
    window.location.replace("http://localhost:5001/signup");
}

ifLogged()

sessionStorage.setItem('currentTest', null);
sessionStorage.setItem('helpStatusAddTest', null);

function ifLogged() {
    $('#userSettings').append('<a href="/signin" class="a2 mr-3">Войти</a>');
}

// Возвращает совпадения из db
function userExist(name, email, pass, users) {
	FLAG_NAME = false;
	FLAG_EMAIL = false;
	FLAG_PASS = false;
	
	for (var i = 0; i < users.length; i++) {
		if (users[i].name == name) {
			FLAG_NAME = true;
		}
		if (users[i].email == email) {
			FLAG_EMAIL = true;
		}
		if (users[i].pass == pass) {
			FLAG_PASS = true;
		}
	}
	
	return [FLAG_NAME, FLAG_EMAIL, FLAG_PASS];
}


function add() {
	// Получение параметров
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const pass = document.getElementById('password').value;
	
	// Получение JSON из API(MongoDB)
	const users = $.getJSON('/api/users', function(data) {
        return data;
    })
    .catch(function(err) {
    	console.log(err);
    });  
    
    users.then(function(data) {
    	FLAG_NAME = false;
		FLAG_EMAIL = false;
	
		for (var i = 0; i < data.length; i++) {
			if (data[i].name == name) {
				FLAG_NAME = true;
			}
			if (data[i].email == email) {
				FLAG_EMAIL = true;
			}
		}
		
		if (FLAG_NAME == true) {
			alert("Данный логин занят.");
		} else if (FLAG_EMAIL == true) {
			alert("Данный email занят.");
		} else {
            const params = 'email=' + email + '&name=' + name + '&pass=' + pass;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", '/signup?' + params, true);
            xhr.send();
            window.location.replace("/signin");
        }
		
    });
    
	

}














