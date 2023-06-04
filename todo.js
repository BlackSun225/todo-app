document.addEventListener("DOMContentLoaded", ()=>{
  var sun = document.getElementById("sun");
  var moon = document.getElementById("moon");
  var todo = document.getElementsByClassName("todo");
  var active = document.getElementsByClassName("active");
  var completed = document.getElementsByClassName("completed");
  var bcircle = document.getElementsByClassName("bcircle");
  var close = document.getElementsByClassName("close");
  var countItem = document.getElementById("items");
  var all = document.getElementById("all");
  var activeBtn = document.getElementById("active");
  var completedBtn = document.getElementById("completed");
  var clear = document.getElementById("clear");
  var stateBtn = document.querySelectorAll("#state button");
  var r = document.querySelector(":root");

  function setDark() {
    if(localStorage.getItem("todoTheme") === "dark") {
      moon.style.display = "none";
      sun.style.display = "block";
      r.style.setProperty("--mainBack", "hsl(235, 21%, 11%)");
      r.style.setProperty("--listBack", "hsl(235, 24%, 19%)");
      r.style.setProperty("--gray", "hsl(233, 14%, 35%)");
      r.style.setProperty("--bordergray", "hsl(237, 14%, 26%)");
      r.style.setProperty("--infosgray", "hsl(234, 11%, 52%)");
      r.style.setProperty("--paragraph", "hsl(236, 33%, 92%)");
      r.style.setProperty("--defColor", "white");
      if(window.innerWidth >= 750) {
        document.querySelector("main").style.backgroundImage = "url('images/bg-desktop-dark.jpg')";
      }else{
        document.querySelector("main").style.backgroundImage = "url('images/bg-mobile-dark.jpg')";
      }  
    }
  }

  function setLight() {
    if(localStorage.getItem("todoTheme") === "light") {
      sun.style.display = "none";
      moon.style.display = "block";
      r.style.setProperty("--mainBack", "hsl(0, 0%, 98%)");
      r.style.setProperty("--listBack", "white");
      r.style.setProperty("--gray", "hsl(236, 33%, 92%)");
      r.style.setProperty("--bordergray", "hsl(233, 11%, 84%)");
      r.style.setProperty("--infosgray", "hsl(236, 9%, 61%)");
      r.style.setProperty("--paragraph", "hsl(235, 19%, 35%)");
      r.style.setProperty("--defColor", "hsl(235, 19%, 35%)")
      if(window.innerWidth >= 750) {
        document.querySelector("main").style.backgroundImage = "url('images/bg-desktop-light.jpg')";
      }else{
        document.querySelector("main").style.backgroundImage = "url('images/bg-mobile-light.jpg')";
      }
          
    }
  }

  function handleItems() {
    countItem.innerHTML = `${Array.from(active).length} items left`;
  }

  function addTodo() {
    if(document.getElementById("ntodo").value.length > 0) {
      let newTodo = document.createElement("div");
      newTodo.setAttribute("class", "todo active");
      let nbcircle = document.createElement("div");
      nbcircle.setAttribute("class", "bcircle");
      let ncircle = document.createElement("div");
      ncircle.setAttribute("class","circle");
      nbcircle.appendChild(ncircle);
      nbcircle.addEventListener("mouseenter", (event) => {
        bcircleMouseEnter(event);
      });
      nbcircle.addEventListener("mouseleave", (event) => {
        bcircleMouseLeave(event);
      });
      nbcircle.addEventListener("click", function() {
        bcircleClick(this);
      });
      newTodo.appendChild(nbcircle);
      let np = document.createElement("p");
      let ptextnode = document.createTextNode(`${document.getElementById("ntodo").value}`);
      np.appendChild(ptextnode);
      newTodo.appendChild(np); 
      let nimg = document.createElement("img");
      nimg.setAttribute("class", "close");
      nimg.setAttribute("src", "images/icon-cross.svg");
      nimg.addEventListener("click", function() {
        clickClose(this);
      })
      newTodo.appendChild(nimg);
      newTodo.setAttribute("draggable","true");
      newTodo.addEventListener("mouseenter", (event) => {
        event.target.lastElementChild.style.display = "block";
      });
      newTodo.addEventListener("mouseleave", (event) => {
        event.target.lastElementChild.style.display = "none";
      });
      document.getElementById("todobox").insertAdjacentElement("beforeend", newTodo);
      handleItems();
      document.getElementById("ntodo").value = "";
    } 
  }
  
  function clickClose(a) {
    a.parentElement.classList.remove("active");
    a.parentElement.classList.remove("completed");
    a.parentElement.style.display = "none";
    handleItems();
  }

  function bcircleMouseEnter(a) {
    a.target.firstElementChild.style.width = "18px";
    a.target.firstElementChild.style.height = "18px";
    a.target.firstElementChild.style.left = "1px";
    a.target.firstElementChild.style.top = "1px";
  }

  function bcircleMouseLeave(a) {
    a.target.firstElementChild.style.width = "20px";
    a.target.firstElementChild.style.height = "20px";
    a.target.firstElementChild.style.left = "0";
    a.target.firstElementChild.style.top = "0";
  }

  function bcircleClick(a) {
    a.parentElement.classList.toggle("completed");
    a.parentElement.classList.toggle("active");
    handleItems();
  }

  setDark();
  setLight();
  window.addEventListener("resize", function() {
    if(localStorage.getItem("todoTheme") === "dark") {
      if(window.innerWidth >= 750) {
        document.querySelector("main").style.backgroundImage = "url('images/bg-desktop-dark.jpg')";
      }else{
        document.querySelector("main").style.backgroundImage = "url('images/bg-mobile-dark.jpg')";
      }
    }
    if(localStorage.getItem("todoTheme") === "light") {
      if(window.innerWidth >= 750) {
        document.querySelector("main").style.backgroundImage = "url('images/bg-desktop-light.jpg')";
      }else{
        document.querySelector("main").style.backgroundImage = "url('images/bg-mobile-light.jpg')";
      }
    }
  });
  sun.addEventListener("click", (event)=>{
    event.target.style.display = "none";
    moon.style.display = "block";
    localStorage.setItem("todoTheme","light");
    setLight();
  });
  moon.addEventListener("click", (event)=>{
    event.target.style.display = "none";
    sun.style.display = "block";
    localStorage.setItem("todoTheme","dark");
    setDark();
  });
  document.getElementById("add").addEventListener("click", function() {
    addTodo();
  })
  function allowDrop(ev) {
    ev.preventDefault();
  };
  function drag(ev) {
    let a = ev.target;
    a.setAttribute("id", "hxh");
    ev.dataTransfer.setData("text", a.id);
  }
  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let a = ev.target;
    if(!a.classList.contains("todo")) {
      if(a.classList.contains("circle")) {
        a = ev.target.parentElement.parentElement;
      }else{
        a = ev.target.parentElement;
      }  
    }
    a.insertAdjacentElement("afterend", document.getElementById(data));
    document.getElementById("hxh").removeAttribute("id");
  }
  Array.from(todo).forEach(elem => {
    elem.setAttribute("draggable", "true");
    elem.addEventListener("mouseenter", (event) => {
      event.target.lastElementChild.style.display = "block";
    });
    elem.addEventListener("mouseleave", (event) => {
      event.target.lastElementChild.style.display = "none";
    });
  });
  document.addEventListener("dragstart", function(event) {
    drag(event);
  });
  document.addEventListener("dragover", function(event) {
    allowDrop(event);
  });
  document.addEventListener("drop", function(event) {
    drop(event);
  });
  Array.from(bcircle).forEach(elem => {
    elem.addEventListener("mouseenter", (event) => {
      bcircleMouseEnter(event);
    });
    elem.addEventListener("mouseleave", (event) => {
      bcircleMouseLeave(event);
    });
    elem.addEventListener("click", function() {
      bcircleClick(this);
    });
  });
  Array.from(close).forEach(elem => {
    elem.addEventListener("click", function() {
      clickClose(this);
    });
  });
  Array.from(stateBtn).forEach(elem => {
    elem.addEventListener("click", function() {
      Array.from(stateBtn).forEach(elem => {
        elem.classList.remove("selected");
      });
      this.classList.add("selected");
    })
  });
  all.addEventListener("click", function() {
    Array.from(todo).forEach(elem => {
      if(elem.classList.contains("active") || elem.classList.contains("completed")) {
        elem.style.display = "flex";
      }
    })
  });
  activeBtn.addEventListener("click", function() {
    Array.from(todo).forEach(elem => {
      if(elem.classList.contains("active")) {
        elem.style.display = "flex";
      }
      if(elem.classList.contains("completed")) {
        elem.style.display = "none";
      }
    });
  });
  completedBtn.addEventListener("click", function() {
    Array.from(todo).forEach(elem => {
      if(elem.classList.contains("completed")) {
        elem.style.display = "flex";
      }
      if(elem.classList.contains("active")) {
        elem.style.display = "none";
      }
    });
  });
  clear.addEventListener("click", function() {
    Array.from(completed).forEach(elem => {
      elem.classList.remove("completed");
      elem.style.display = "none";
    });
  });
});