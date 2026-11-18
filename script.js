
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    if (title === "" || description === "") {
        alert("Please enter both title and description!");
        return;
    }

    let note = {
        id: Date.now(),
        title: title,
        description: description
    };

    notes.push(note);

    saveNotes();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    displayNotes();
}

function displayNotes() {

    let notesContainer = document.getElementById("notes");
    let search = document.getElementById("search").value.toLowerCase();

    notesContainer.innerHTML = "";

    let filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search) ||
        note.description.toLowerCase().includes(search)
    );

    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = "<p>No notes found!</p>";
        return;
    }

    filteredNotes.forEach(note => {

        let div = document.createElement("div");
        div.className = "note";

        let heading = document.createElement("h3");
        heading.textContent = note.title;

        let paragraph = document.createElement("p");
        paragraph.textContent = note.description;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editNote(note.id);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = function() {
            deleteNote(note.id);
        };

        div.appendChild(heading);
        div.appendChild(paragraph);
        div.appendChild(editButton);
        div.appendChild(deleteButton);

        notesContainer.appendChild(div);
    });
}

function editNote(id) {

    let note = notes.find(note => note.id === id);

    let newTitle = prompt("Enter new title:", note.title);
    if (newTitle === null) return;

    let newDescription = prompt("Enter new description:", note.description);
    if (newDescription === null) return;

    if (newTitle.trim() === "" || newDescription.trim() === "") {
        alert("Title and description cannot be empty!");
        return;
    }

    note.title = newTitle;
    note.description = newDescription;

    saveNotes();
    displayNotes();
}

function deleteNote(id) {

    let confirmDelete = confirm("Are you sure you want to delete this note?");

    if (confirmDelete) {
        notes = notes.filter(note => note.id !== id);

        saveNotes();
        displayNotes();
    }
}

displayNotes();
