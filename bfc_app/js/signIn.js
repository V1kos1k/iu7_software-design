ifLogged();

sessionStorage.setItem('currentTest', null);
sessionStorage.setItem('helpStatusAddTest', null);

function ifLogged() {
    $('#userSettings').append('<a href="/signup"  class="a2">Регистрация</a>');
}

function initialization() {
	var FLAG = false;
	const name = document.getElementById('name').value;
	const pass = document.getElementById('password').value;
	
	// Получение JSON из API(MongoDB)
	const users = $.getJSON('/api/users', function(data) {
        return data;
    })
    .catch(function(err) {
    	console.log(err);
    }); 
    
    users.then(function(data) {
    	for (var i = 0; i < data.length; i++) {
    		if (data[i].name == name && data[i].pass == pass) {
    			FLAG = true;
    			sessionStorage.setItem('status', 'loggedIn');
    			sessionStorage.setItem('name', data[i].name);
    			break;
    		}
    	}
    	if (!FLAG)
    		alert("Некорректный логин или пароль.");
    	else
    		window.location.href="/"; // адрес следующей страницы
    });
}