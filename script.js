const tasks = [];
const done = [];
let count = 1;

window.addEventListener("load", start);

function start() {
  document.querySelector(".send").addEventListener("click", addObject);
  document.querySelectorAll(".cat_btn button").forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      if (evt.target.dataset.cat == "work" || evt.target.dataset.cat == "study" || evt.target.dataset.cat == "home") {
        console.log("no");
        evt.target.setAttribute("data-cat", "");
      } else {
        evt.target.setAttribute("data-cat", `${evt.target.className}`);
      }
    });
  });
  document.querySelectorAll(".filter_cat").forEach((btn) => {
    btn.addEventListener("click", filtering);
  });
}

function addObject() {
  //   console.log("hej" + document.querySelector(".work").classList);
  let obj = {
    desc: "",
    id: "",
    cat: [],
  };
  let text = document.querySelector(".task_input").value;
  let id = count++;

  //clear the input
  document.querySelector(".task_input").value = "";

  //Clear the list
  document.querySelector("#list tbody").innerHTML = "";

  obj.desc = text;
  obj.id = id;
  //If any of the cat_btn has been clicked, then add to the cat array
  if (document.querySelector(".work").dataset.cat == "work") {
    console.log("work_clicked");
    obj.cat.push("work");
  }
  if (document.querySelector(".study").dataset.cat == "study") {
    console.log("study_clicked");
    obj.cat.push("study");
  }
  if (document.querySelector(".home").dataset.cat == "home") {
    console.log("home_clicked");
    obj.cat.push("home");
  }
  //makes the cat_btn buttons go back to default, ready for new making of task
  document.querySelector(".work").setAttribute("data-cat", "");
  document.querySelector(".study").setAttribute("data-cat", "");
  document.querySelector(".home").setAttribute("data-cat", "");
  //   console.log(obj);

  tasks.push(obj);

  //   console.log(obj.id);
  //forEach of the objects created, run the showObject
  tasks.forEach(showObject);
}

function showObject(task) {
  // create clone based of the template
  const clone = document.querySelector("template#task_template").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=desc]").textContent = task.desc;
  //   clone.querySelector("[data-field=work]").textContent = task.cat;
  //   const cats = task.cat.toString();
  //det er vores cat array
  //   console.log(cats);
  //   const cat = cats.split(",");
  //   console.log("hallo" + cat);

  console.log(task);
  console.log(task.cat);
  if (task.cat.includes("work")) {
    console.log("task.cat has work");
    // console.log(clone.querySelector(".work_cat"));
    clone.querySelector(".work_cat").classList.remove("hide");
  }
  if (task.cat.includes("study")) {
    console.log("task.cat has study");
    clone.querySelector(".study_cat").classList.remove("hide");
  }
  if (task.cat.includes("home")) {
    console.log("task.cat has home");
    clone.querySelector(".home_cat").classList.remove("hide");
  }
  //set an id, for later use when the task need to move or be deleted
  clone.querySelector(".checkbox").setAttribute("id", task.id);
  clone.querySelector(".trashicon").setAttribute("id", task.id);
  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
  //   console.log(task.cat);

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
  clone.querySelector(".trashicon").setAttribute("data-trash", "checked");
  // append clone to list
  document.querySelector("#done tbody").appendChild(clone);

  checkTask();
}

function deleteObject(evt) {
  if (evt.target.dataset.trash === "checked") {
    console.log("delete done task");
    const identifier = parseInt(evt.target.getAttribute("id"));
    // const index = done.map((e) => e.id);
    // console.log(index);
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
function filtering(evt) {
  document.querySelector(".filter_cat .work").classList.remove("work_active");
  document.querySelector(".filter_cat .study").classList.remove("study_active");
  document.querySelector(".filter_cat .home").classList.remove("home_active");
  console.log(evt.target);
  evt.target.classList.add(`${evt.target.className}_active`);
  const clicked = evt.target.dataset.filter;
  document.querySelector("#list tbody").innerHTML = "";
  document.querySelector("#done tbody").innerHTML = "";
  console.log(clicked);
  if (clicked !== "*") {
    let only = tasks.filter((task) => {
      if (task.cat.includes(`${clicked}`)) {
        return true;
      } else {
        return false;
      }
    });
    only.map((e) => showObject(e));
  } else {
    // console.log(tasks);
    tasks.forEach(showObject);
  }
}
