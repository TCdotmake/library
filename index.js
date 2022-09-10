let myLibrary = [];

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
console.table(newBook);
