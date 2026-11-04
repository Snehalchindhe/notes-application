const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const formContainer = document.getElementById("formContainer");
const formHeading = document.getElementById("formHeading");
const noteCount = document.getElementById("noteCount");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");

const newNoteBtn = document.getElementById("newNoteBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const cancelBtn = document.getElementById("cancelBtn");

let editingNoteId = null;
let allNotes = [];

// Load notes from Spring Boot backend
async function loadNotes() {
    try {
        const response = await fetch("/api/notes");

        if (!response.ok) {
            throw new Error("Unable to load notes");
        }

        allNotes = await response.json();

        noteCount.textContent = allNotes.length;
        displayNotes();

    } catch (error) {
        console.error(error);
        notesContainer.innerHTML =
            "<p>Unable to load notes. Please check your server.</p>";
    }
}

// Display notes on the page
function displayNotes() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredNotes = allNotes.filter(note =>
        note.title.toLowerCase().includes(searchText) ||
        note.content.toLowerCase().includes(searchText)
    );

    notesContainer.innerHTML = "";

    emptyState.hidden = filteredNotes.length !== 0;

    filteredNotes.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        const heading = document.createElement("h3");
        heading.textContent = note.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = note.content;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => editNote(note));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => deleteNote(note.id));

        noteDiv.append(heading, paragraph, editBtn, deleteBtn);
        notesContainer.appendChild(noteDiv);
    });
}

// Open the note form
function openForm() {
    formContainer.classList.add("show");
    titleInput.focus();
}

// Close and reset the form
function closeForm() {
    formContainer.classList.remove("show");
    resetForm();
}

function resetForm() {
    titleInput.value = "";
    contentInput.value = "";
    editingNoteId = null;

    formHeading.textContent = "Create a new note";
    addNoteBtn.textContent = "Save Note";
}

// New note button
newNoteBtn.addEventListener("click", () => {
    resetForm();
    openForm();
});

// Close and cancel buttons
closeFormBtn.addEventListener("click", closeForm);
cancelBtn.addEventListener("click", closeForm);

// Add or update note
addNoteBtn.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert("Please enter both title and content.");
        return;
    }

    const note = { title, content };

    try {
        let response;

        if (editingNoteId === null) {
            response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            });
        } else {
            response = await fetch(`/api/notes/${editingNoteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            });
        }

        if (!response.ok) {
            throw new Error("Unable to save note");
        }

        closeForm();
        await loadNotes();

    } catch (error) {
        console.error(error);
        alert("Could not save the note. Please try again.");
    }
});

// Edit note
function editNote(note) {
    editingNoteId = note.id;

    titleInput.value = note.title;
    contentInput.value = note.content;

    formHeading.textContent = "Edit your note";
    addNoteBtn.textContent = "Update Note";

    openForm();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Delete note
async function deleteNote(id) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`/api/notes/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete note");
        }

        await loadNotes();

    } catch (error) {
        console.error(error);
        alert("Could not delete the note. Please try again.");
    }
}

// Search notes
searchInput.addEventListener("input", displayNotes);

// Load notes when page opens
loadNotes();