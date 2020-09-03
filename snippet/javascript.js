//Maket post request with data
let dangki = async ()=> {
  let email = document.getElementById('email-reg').value;
  let pass = document.getElementById('pass-reg').value;
  let res = await fetch('/user', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `email=${email}&pass=${pass}`
  })
  let obj = await res.json();
  alert (obj.msg);
}


//Make post request with no data
let dangki = async () => {
  let res = await fetch ('/user1', {method: 'post'})
}
