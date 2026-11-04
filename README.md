# Notes Application

A simple and user-friendly Notes Application developed using **Java, Spring Boot, MySQL, HTML, CSS, and JavaScript**.

## About the Project

The Notes Application allows users to create, view, edit, delete, and search their personal notes. It provides a clean and responsive interface to manage notes easily.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java, Spring Boot
- **Database:** MySQL
- **ORM:** Spring Data JPA
- **Build Tool:** Maven

## Features

- Create new notes with a title and content.
- View all saved notes.
- Edit existing notes.
- Delete notes.
- Search notes by title or content.
- Store notes permanently in a MySQL database.
- Responsive and user-friendly interface.

## Project Structure

```text
notesapp/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/notes/notesapp/
│   │   │       ├── NotesappApplication.java
│   │   │       ├── Note.java
│   │   │       ├── NoteRepository.java
│   │   │       └── NoteController.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── style.css
│   │       │   └── script.js
│   │       └── application.properties
├── pom.xml
└── README.md
```

## How to Run the Project

1. Install Java 21 and MySQL.
2. Create a MySQL database named `notes_db`.
3. Configure your local database username and password in `application.properties`.
4. Open the project folder in VS Code.
5. Run the following command in the terminal:

```powershell
.\mvnw.cmd spring-boot:run
```

6. Open your browser and visit:

`http://localhost:8080/`

## Author

Snehal Chindhe