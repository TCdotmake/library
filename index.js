let myLibrary = [];
const modal = document.getElementsByClassName("input-modal")[0];

function Book({ author, title, pages, read }) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function createCard(bookObj) {
  const { author, title, pages, read } = bookObj;
  const newCard = document.createElement("div");
  newCard.classList.add("card");
}

function handleSubmit(e) {
  e.preventDefault();
  const inputValues = document.querySelectorAll("input");

  let valid = true;
  for (let ele of inputValues) {
    if (ele.type === "text" || ele.type === "number") {
      if (ele.value === "") {
        valid = false;
      }
    }
  }
  if (valid) {
    let values = [];
    for (let ele of inputValues) {
      if (ele.type === "checkbox") {
        values.push(ele.checked);
        ele.checked = false;
      } else {
        values.push(ele.value);
        ele.value = "";
      }
    }
    [title, author, pages, read] = values;
    myLibrary.push(new Book({ title, author, pages, read }));
    console.log("myLibrary", myLibrary);
    modal.classList.toggle("on-screen");
  }
}

const submitBtn = document.getElementById("submit-new");
submitBtn.addEventListener("click", (e) => {
  handleSubmit(e);
});

const addBtn = document.getElementById("add-book");

addBtn.addEventListener("click", () => {
  modal.classList.toggle("on-screen");
  addBtn.classList.toggle("rotate");
});
