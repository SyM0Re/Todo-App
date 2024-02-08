let c ;
let ul1 = document.getElementById("Tor");
let ul2 = document.getElementById("Tod");

const url = 'https://crudcrud.com/api/ad77dae2de68466386ba8a5379341657/Todo/' ;

// creating an object
function handleFormSubmit(event) {
  event.preventDefault();
  c++;
  let li = document.createElement("li");
  let todoname  = document.getElementById("todoname").value;
  let Description  = document.getElementById("Des").value;
  let obj = {
    todoname : todoname,
    Description : Description,
    isDone : false
  }
  axios
  .post(url,obj)
  .then(res => {
    c = res.data._id;
    li.id = `${c}`;
  });
  li.innerHTML =  `${todoname}    : ${Description}  ` + `<button onclick = "done(event)"> Done </button>      <button onclick = "del(event)" id = ${c} > Delete </button>` ;
  adding(li);
}



// done with the task
function done(event) {
  let l = event.target.parentNode;
  axios
  .get(`${url}${l.id}`)
  .then(res => {
    let obj = {
      todoname : res.data.todoname,
      Description : res.data.Description,
      isDone : true
    }
    axios
    .put(`${url}${l.id}`, obj)
    .then(res => {
    let ele = document.createElement("li")
    let content = l.innerHTML;
    ele.innerHTML = content.substring(0, content.indexOf('<button'));
      ul2.appendChild(ele);
      ul1.removeChild(l);
    })
  });
}

// Delete
function del(event) {
  let liId = event.target.parentNode.id;
  axios
  .delete(`${url}${liId}`)
  .then(ul1.removeChild(event.target.parentNode));
}



// display user details
function adding(li){
  ul1.appendChild(li);
}

// clearing the servers data
function dd() {
  axios
  .get(url)
  .then(res => {
    for (let i = 0; i < res.data.length; i++) {
      ul2.innerHTML = "";
      axios
      .delete(`${url}${res.data[i]._id}`)
      .then(res => console.log(res))
    }
  })

}
