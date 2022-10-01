let myLibrary = [];
const modal = document.getElementsByClassName("input-modal")[0];
const booksDiv = document.getElementById("books");
const dummyBook = document.getElementById("dummy-new-book");
function Book({ author, title, pages, read }) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

class BOOK {
  constructor({ author, title, pages, read }) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

function createCard(bookObj, index) {
  let { author, title, pages, read } = bookObj;
  let readClass = "";
  if (read) {
    readClass = "read";
  }
  read = parseRead(read);
  const newCard = document.createElement("div");
  newCard.classList.add("book-card");
  const innerHTML = `<div class="b-title"><span>${title}</span></div>
  <div class="b-card-bottom">
    <div class="b-author"><span>by </span><span>${author}</span></div>
    <div class="b-page"><span>${pages}</span><span> pages</span></div>
    <div class="b-btn-div">
      <button class="b-btn read-btn ${readClass}">${read}</button>
      <button class="b-btn delete-btn">remove</button>
    </div>
  </div>`;
  newCard.innerHTML = innerHTML;
  return newCard;
}

function parseRead(read) {
  if (read) {
    return "read";
  } else return "not read";
}

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
    myLibrary.push(new BOOK({ title, author, pages, read }));
    addBook();
    // modal.classList.toggle("on-screen");
  }
}

function addBook() {
  //get index of last element of myLibrary
  const index = myLibrary.length - 1;
  //make an element out of it
  const newBook = createCard(new BOOK(myLibrary[index]));
  //add element into books
  // booksDiv.insertAdjacentElement("beforeend", newBook);
  dummyBook.insertAdjacentElement("beforebegin", newBook);
  //add event listener
  const deleteBtn = document.querySelectorAll(".delete-btn");
  const readBtn = document.querySelectorAll(".read-btn");
  readBtn[readBtn.length - 1].addEventListener("click", (e) => {
    handleReadToggle(e);
  });
  deleteBtn[deleteBtn.length - 1].addEventListener("click", (e) => {
    handleDelete(e);
  });
  updateIndex();
  console.log("myLibrary", myLibrary);
}

function handleReadToggle(e) {
  const index = e.target.dataset.index;

  //change myLibrary first
  myLibrary[index].read = !myLibrary[index].read;
  e.target.innerText = parseRead(myLibrary[index].read);
  e.target.classList.toggle("read");
}

function handleDelete(e) {
  const index = e.target.dataset.index;
  const books = document.querySelectorAll(".book-card");
  books[index].remove();
  myLibrary.splice(index, 1);
  updateIndex();
  console.log("myLibrary", myLibrary);
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

const cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modalBG.style.display = "none";
  modal.classList.toggle("on-screen");
});

// -----modal-----
const modalBG = document.getElementById("modal");
const modalBtn = document.getElementById("toggle-modal");
dummyBook.addEventListener("click", (e) => {
  modalBG.style.display = "block";
  modal.classList.toggle("on-screen");
});
modalBtn.addEventListener("click", (e) => {
  modalBG.style.display = "block";
  modal.classList.toggle("on-screen");
});
modalBG.addEventListener("click", (e) => {
  if (e.target === modalBG) {
    modalBG.style.display = "none";
    modal.classList.toggle("on-screen");
  }
});
// load smapleBooks if myLibrary is empty

let sampleBooks = [
  {
    author: "Scott Lynch",
    title: "The Lies of Locke Lamora",
    pages: 752,
    read: true,
  },
  {
    author: "Scott Lynch",
    title: "The Bastards and the Knives",
    pages: 336,
    read: true,
  },
  {
    author: "Scott Lynch",
    title: "Red Seas Under Red Skies",
    pages: 578,
    read: false,
  },
  {
    author: "Scott Lynch",
    title: "The Republic of Thieves",
    pages: 650,
    read: false,
  },
];

window.addEventListener("load", (e) => {
  if (myLibrary.length === 0) {
    sampleBooks.forEach((book) => {
      myLibrary.push(new BOOK(book));
      addBook();
    });
  }
});
