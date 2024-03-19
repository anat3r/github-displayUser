

let form = document.forms['github'];
form.addEventListener('submit',function(){
  let name = form['githubName'].value;
  if(name == null) {
    console.log('name should not be null');
    return false;
  }
  this.onload = loadGithubUser(name)
    .then(user => createForm([document.getElementById('gitHolder'),user]))
    .then(addAvatar)
    .then(addLogin)
    .then(addRealName)
    .then(addBio)
    .catch((e) => console.log(`${e.name}: ${e.message}`))
})
createForm.formCounter = -1;
function createForm([formHolder,githubUser]) {
  createForm.formCounter++;
  return new Promise(function (resolve, reject){
    let div = document.createElement('div');
    div.className = "github-form"
    div.id = `githubForm${createForm.formCounter}`
    formHolder.append(div);
    resolve([div,githubUser])
  })
}
function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function addRealName([githubForm,githubUser]) {
  return new Promise(function(resolve, reject) {
    let div = document.createElement('div');
    div.innerHTML = githubUser.name ?? '-';
    div.className = "github-name";
    githubForm.append(div);
    resolve([githubForm,githubUser]);
  });
}
function addLogin([githubForm,githubUser]) {
  return new Promise(function(resolve, reject) {
    let div = document.createElement('div');
    div.innerHTML= `<a target="_blank" href="${githubUser.html_url}">${githubUser.login}</a>` ?? 'Undefined';
    div.className = "github-login";
    githubForm.append(div);
    resolve([githubForm,githubUser]);
  });
}
function addBio([githubForm,githubUser]) {
  return new Promise(function(resolve, reject) {
    let div = document.createElement('div');
    div.innerHTML = githubUser.bio ?? '-';
    div.className = "github-bio";
    githubForm.append(div);
    resolve([githubForm,githubUser]);
  });
}
function addAvatar([githubForm,githubUser]) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url ?? 'https://i.stack.imgur.com/frlIf.png';
    img.className = "github-avatar";
    githubForm.append(img);
    resolve([githubForm,githubUser]);
  });
}
