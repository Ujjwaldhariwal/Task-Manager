package com.taskmanager.TaskManager.service;

//TaskService.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.TaskManager.entity.Task;
import com.taskmanager.TaskManager.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {

 private final TaskRepository taskRepository;

 @Autowired
 public TaskService(TaskRepository taskRepository) {
     this.taskRepository = taskRepository;
 }

 public List<Task> getAllTasks() {
     return taskRepository.findAll();
 }

 public Task addTask(Task task) {
     return taskRepository.save(task);
 }

 public Task completeTask(Long id) {
     Task task = taskRepository.findById(id).orElse(null);
     if (task != null) {
         task.setCompleted(true);
         taskRepository.save(task);
     }
     return task;
 }

 public void deleteTask(Long id) {
     taskRepository.deleteById(id);
 }
}

