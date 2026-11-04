
package com.notes.notesapp;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteRepository repository;

    public NoteController(NoteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Note> getAllNotes() {
        return repository.findAll();
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return repository.save(note);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note note) {
        Note existing = repository.findById(id).orElseThrow();
        existing.setTitle(note.getTitle());
        existing.setContent(note.getContent());
        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

