const tasks = [];
const done = [];
let count = 1;

window.addEventListener("load", start);
function start() {
  document.querySelector(".send").addEventListener("click", addObject);
}

function addObject() {
  let obj = {
    desc: "",
    id: "",
    cat: ["work", "studie"],
  };
  let text = document.querySelector(".task_input").value;
  let id = count++;
  //clear the input
  document.querySelector(".task_input").value = "";

  //Clear the list
  document.querySelector("#list tbody").innerHTML = "";

  obj.desc = text;
  obj.id = id;

  console.log(obj);

  tasks.push(obj);

  console.log(obj.id);
  //forEach of the objects created, run the showObject
  tasks.forEach(showObject);
}

function showObject(task) {
  // create clone based of the template
  const clone = document.querySelector("template#task_template").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=desc]").textContent = task.desc;
  //set an id, for later use when the task need to move or be deleted
  clone.querySelector(".checkbox").setAttribute("id", task.id);
  clone.querySelector(".trashicon").setAttribute("id", task.id);

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);

  //Go to checkTask to make the checkbox eventhandlers
  checkTask();
}

function checkTask() {
  //If there is more than 1 task, then .querySelectorAll is in use
  if (tasks.length + done.length > 1) {
    console.log("over 1");
    document.querySelectorAll(".checkbox").forEach((check) => {
      check.addEventListener("click", moveObject);
    });
    document.querySelectorAll(".trashicon").forEach((trash) => {
      trash.addEventListener("click", deleteObject);
    });
  } else {
    document.querySelector(".checkbox").addEventListener("click", moveObject);
    document.querySelector(".trashicon").addEventListener("click", deleteObject);
  }
}

function moveObject(evt) {
  console.log(evt);
  //If the task have been checked already, and is clicked again then put it back to the todo-part
  if (evt.target.dataset.check === "checked") {
    console.log("not checked");
    //take the id from the checkbox who has been clicked. (parseInt makes the stringed number to an actual number)
    const identifier = parseInt(evt.target.getAttribute("id"));
    //map through the done array, and find the place of the object with the same id as the clicked checkbox.
    const index = done.map((e) => e.id).indexOf(identifier);
    //splice the done array where the right object is and take it out
    const completed = done.splice(index, 1);
    //Here we push the new completed arrays objects into the tasks array
    // tasks.push.apply(tasks, completed);
    //or like this:
    tasks.push(...completed);
    //clear the lists
    document.querySelector("#list tbody").innerHTML = "";
    document.querySelector("#done tbody").innerHTML = "";
    //show the remaining tasks in both the todo-part and the done-part
    tasks.forEach(showObject);
    done.forEach(showDone);
  } else {
    console.log("checked");
    const identifier = parseInt(evt.target.getAttribute("id"));
    console.log(identifier);
    const index = tasks.map((e) => e.id).indexOf(identifier);
    const completed = tasks.splice(index, 1);
    done.push.apply(done, completed);
    document.querySelector("#list tbody").innerHTML = "";
    document.querySelector("#done tbody").innerHTML = "";
    tasks.forEach(showObject);
    done.forEach(showDone);
  }
}

function showDone(done) {
  // create clone
  const clone = document.querySelector("template#task_template").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=desc]").textContent = done.desc;
  clone.querySelector(".checkbox").setAttribute("id", done.id);
  clone.querySelector(".trashicon").setAttribute("id", done.id);

  clone.querySelector(".checkbox").setAttribute("data-check", "checked");
  clone.querySelector(".trashicon").setAttribute("data-check", "checked");
  // append clone to list
  document.querySelector("#done tbody").appendChild(clone);

  checkTask();
}

function deleteObject(evt) {
  if (evt.target.dataset.check === "checked") {
    console.log("delete done task");
    const identifier = parseInt(evt.target.getAttribute("id"));
    const index = done.map((e) => e.id).indexOf(identifier);
    done.splice(index, 1);
    document.querySelector("#list tbody").innerHTML = "";
    document.querySelector("#done tbody").innerHTML = "";
    tasks.forEach(showObject);
    done.forEach(showDone);
  } else {
    console.log("delete not done task");
    const identifier = parseInt(evt.target.getAttribute("id"));
    console.log(identifier);
    const index = tasks.map((e) => e.id).indexOf(identifier);
    tasks.splice(index, 1);
    console.log(tasks);
    document.querySelector("#list tbody").innerHTML = "";
    document.querySelector("#done tbody").innerHTML = "";
    tasks.forEach(showObject);
    done.forEach(showDone);
  }
}
