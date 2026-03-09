document.getElementById('btn-sign-in').addEventListener('click', function(){
    const userNameField = document.getElementById('username');
    const userInfo = userNameField.value;
    const passwordField = document.getElementById('password');
    const passInfo = passwordField.value;
    console.log(userInfo, passInfo);

    if(userInfo === "admin" && passInfo === "admin123"){
        window.location.href= './design.html'
        
        console.log('hello');
    }else{
        alert('Plese enter default user and password');
        return;
    }
})