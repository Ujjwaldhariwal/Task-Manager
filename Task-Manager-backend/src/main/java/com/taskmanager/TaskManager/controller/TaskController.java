package com.taskmanager.TaskManager.controller;

//TaskController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.TaskManager.entity.Task;
import com.taskmanager.TaskManager.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

 private final TaskService taskService;

 @Autowired
 public TaskController(TaskService taskService) {
     this.taskService = taskService;
 }

 @GetMapping
 public List<Task> getAllTasks() {
     return taskService.getAllTasks();
 }

 @PostMapping
 public Task addTask(@RequestBody Task task) {
     return taskService.addTask(task);
 }

 @PutMapping("/{id}/complete")
 public ResponseEntity<Task> completeTask(@PathVariable Long id) {
     Task completedTask = taskService.completeTask(id);
     return completedTask != null ?
             ResponseEntity.ok(completedTask) :
             ResponseEntity.notFound().build();
 }

 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
     taskService.deleteTask(id);
     return ResponseEntity.ok().build();
 }
}

