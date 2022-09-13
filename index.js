let myLibrary = [];
const modal = document.getElementsByClassName("input-modal")[0];
const booksDiv = document.getElementById("books");
function Book({ author, title, pages, read }) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function createCard(bookObj, index) {
  let { author, title, pages, read } = bookObj;
  if (read) {
    read = "read";
  } else {
    read = "not read";
  }
  const newCard = document.createElement("div");
  newCard.classList.add("book-card");
  const innerHTML = `<div class="b-title">
  <span>${title}</span>
</div>
<div class="b-card-bottom">
  <div class="b-author"><span>by </span><span>${author}</span></div>
  <div class="b-page"><span>${pages}</span><span> pages</span></div>
  <div class="b-btn-div">
    <button class="b-btn read-btn"><span>${read}</span></button>
    <button class="b-btn delete-btn"><span>remove</span></button>
  </div>
</div>`;
  newCard.innerHTML = innerHTML;
  return newCard;
}

let test = {
  author: "Scott Lynch",
  title: "Red Seas Under Red Skies",
  pages: 578,
  read: false,
};

const testArr = document.querySelectorAll(".book-card");
testArr.forEach((e) => {
  console.log("e", e);
});

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
    addBook();
    modal.classList.toggle("on-screen");
  }
}

function addBook() {
  //get index of last element of myLibrary
  const index = myLibrary.length - 1;
  //make an element out of it
  const newBook = createCard(new Book(myLibrary[index]));
  //add element into books
  booksDiv.insertAdjacentElement("beforeend", newBook);
  updateIndex();
}

function updateIndex() {
  //get collection of both buttons
  const readBtns = document.querySelectorAll(".read-btn");
  const deleteBtns = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < readBtns.length; i++) {
    readBtns[i].setAttribute("data-index", i);
    deleteBtns[i].setAttribute("data-index", i);
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
