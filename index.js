let myLibrary = [];
const modal = document.getElementsByClassName("input-modal")[0];

function Book({ author, title, pages, read }) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

let test = {
  author: "Scott Lynch",
  title: "The Lies of Locke Lamora",
  pages: 752,
  read: true,
};

let newBook = new Book(test);
console.log(newBook);
let values = [];
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
