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
  tasks.forEach(showObject);
}

function showObject(task) {
  // create clone
  const clone = document.querySelector("template#task_template").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=desc]").textContent = task.desc;
  clone.querySelector(".checkbox").setAttribute("id", task.id);

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);

  //   if (tasks.length > 1) {
  //     document.querySelectorAll(".checkbox").forEach(moveObject);
  //   } else {
  //     document.querySelector(".checkbox").addEventListener("change", moveObject);
  //   }
  checkTask();
}

function checkTask() {
  if (tasks.length + done.length > 1) {
    console.log("over 1");
    document.querySelectorAll(".checkbox").forEach((check) => {
      check.addEventListener("click", moveObject);
    });
  } else {
    document.querySelector(".checkbox").addEventListener("click", moveObject);
  }
}

function moveObject(evt) {
  console.log(evt);
  //   if (evt.target.checked) {
  //     console.log("checked");
  //     const identifier = evt.target.getAttribute("id");
  //     const index = tasks.map((e) => e.id).indexOf(identifier);
  //     const completed = tasks.splice(index, 1);
  //     done.push.apply(done, completed);
  //     document.querySelector("#list tbody").innerHTML = "";
  //     document.querySelector("#done tbody").innerHTML = "";
  //     evt.target.checked = false;
  //     tasks.forEach(showObject);
  //     done.forEach(showDelete);
  //   } else {
  //     console.log("not checked");
  //   }

  if (evt.target.dataset.check === "checked") {
    console.log("not checked");
    const identifier = parseInt(evt.target.getAttribute("id"));
    const index = done.map((e) => e.id).indexOf(identifier);
    const completed = done.splice(index, 1);
    tasks.push.apply(tasks, completed);
    document.querySelector("#list tbody").innerHTML = "";
    document.querySelector("#done tbody").innerHTML = "";
    tasks.forEach(showObject);
    done.forEach(showDelete);
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
    done.forEach(showDelete);
  }
}

function showDelete(done) {
  // create clone
  const clone = document.querySelector("template#task_template").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=desc]").textContent = done.desc;
  clone.querySelector(".checkbox").setAttribute("id", done.id);

  clone.querySelector(".checkbox").setAttribute("data-check", "checked");
  // append clone to list
  document.querySelector("#done tbody").appendChild(clone);

  checkTask();
  //   done.classList.add("checked");

  //   if (tasks.length > 1) {
  //     document.querySelectorAll(".checkbox").forEach(moveObject);
  //   } else {
  //     document.querySelector(".checkbox").addEventListener("change", moveObject);
  //   }
}
// if (tasks.length > 1) {
//     console.log("over 1");
//     document.querySelectorAll(".checkbox").forEach((check) => {
//       check.addEventListener("click", (evt) => {
//         if (evt.target.className === "checkbox checked") {
//           console.log("second time");
//           document.querySelector(".checkbox").classList.remove("checked");
//         } else {
//           document.querySelector(".checkbox").classList.add("checked");
//         }
//       });
//     });
//   } else {
//     document.querySelector(".checkbox").addEventListener("click", (evt) => {
//       if (evt.target.className === "checkbox checked") {
//         console.log("second time");
//         document.querySelector(".checkbox").classList.remove("checked");
//       } else {
//         document.querySelector(".checkbox").classList.add("checked");
//       }
//       console.log(document.querySelector(".checkbox").className);
//     });
//   }
