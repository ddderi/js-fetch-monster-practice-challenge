window.addEventListener('DOMContentLoaded', e => {

const nameInput = document.createElement('input')
const ageInput = document.createElement('input')
const descriInput = document.createElement('input')
const divparent = document.getElementById('create-monster')
const button = document.createElement('button')
divparent.append(nameInput, ageInput, descriInput, button)
const divmonster = document.getElementById('monster-container')
const ul = document.createElement('ol')
let count = 1 // for URL page

button.textContent = 'Search'
nameInput.placeholder = 'Name...'
ageInput.placeholder = 'age...'
descriInput.placeholder = 'description...'


const fetchMonster = function(){
 fetch('http://localhost:3000/monsters/?_limit=40&_page=1')
 .then(resp => resp.json())
 .then(data => displayMonster(data))
 .catch(err => console.log(err))
}

const displayMonster = function(data){

data.forEach(element => {
    const li = document.createElement('li')
    divmonster.append(ul)
    ul.append(li)
    li.innerHTML = element.name + `<br>` + `Age : ${element.age}` + `<br>` + `Bio : ${element.description}`
    
});
}


button.addEventListener('click', function(e){
    postMonster() 
})


const postMonster = function(){
    let dataa = {
        name: nameInput.value,
        Age: ageInput.value,
        Bio: descriInput.value
    }
    
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        body: JSON.stringify(dataa),
        headers: {
                "Content-Type": "application/json",
                    Accept: "application/json"
                }
    })
    .then(response => console.log(response)) 
    .then(json => console.log(json));
}

const fetchMonsterFWD = function(){
    count+=1
    fetch(`http://localhost:3000/monsters/?_limit=40&_page=${count}`)
    .then(resp => resp.json())
    .then(data => displayMonster(data))
    .catch(err => console.log(err))
   }

   const fetchMonsterBCK = function(){
    count-=1
    fetch(`http://localhost:3000/monsters/?_limit=40&_page=${count}`)
    .then(resp => resp.json())
    .then(data => displayMonster(data))
    .catch(err => console.log(err))
   }



fetchMonster()

document.getElementById('forward').addEventListener('click', function(e){
    while(ul.firstChild){
        ul.removeChild(ul.firstChild)
    }
    fetchMonsterFWD()
})
document.getElementById('back').addEventListener('click', function(e){
    while(ul.firstChild){
        ul.removeChild(ul.firstChild)
    }
    fetchMonsterBCK()
})




})