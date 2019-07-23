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
}

function signOut() {
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('name');
}