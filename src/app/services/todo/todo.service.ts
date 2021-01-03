import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { LocalStorageService } from './local-storage.service';
import { UUIDService } from './uuid.service';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  config: any;

  constructor(private localStorageService: LocalStorageService, private uUIDService: UUIDService) {
    this.config = this.localStorageService.getConfig();
  }


  addTodo(todo: Todo): void {
    // check if entry is in config
    // add entry if it doesn't exist
    if(!this.config.todo){
      this.config["todo"] = [];
    }

    // add the todo to the config
    this.config.todo.push(this.convertToLsObject(todo));

    // save the config
    this.localStorageService.saveConfig(this.config);

  }
  
  updateTodo(updatedTodo: Todo): void {
    let todos: Array<Todo> = this.getTodos();
    todos.forEach(todo => {
      if(updatedTodo.getUuid() === todo.getUuid()){
        todo.setTitle(updatedTodo.getTitle());
        todo.setDescription(updatedTodo.getDescription());
        todo.setPrio(updatedTodo.getPrio());
      }
    });
    let lsArr = Array<Object>(); 
    todos.forEach(todo => {
      const obj = this.convertToLsObject(todo);
      lsArr.push(obj);
    });

    this.config.todo = lsArr;
    this.localStorageService.saveConfig(this.config);
  }
  
  removeTodo(uuid: String): void {
    let lsTodo: Array<Object> = [];
    this.config.todo.forEach(todo => {
      if(todo.uuid != uuid){
        lsTodo.push(todo);
      } 
    });
    this.config.todo = lsTodo;
    this.localStorageService.saveConfig(this.config);
  }

  getEmptyTodo() {
    return new Todo(
      null, // title
      null, // description
      3, // prio
      new Date(), // updated
      this.uUIDService.UUID() // uuid
    );
  }

  getTodos(): Array<Todo> {
    if(!this.config.todo) {
      this.config["todo"] = [];
    }
    return this.convertLSToTodos(this.config.todo); 
  }

  convertLSToTodos(localStorageTodos: Array<any>): Array<Todo>{
    const todos = new Array<Todo>();
    for (const obj of localStorageTodos) {
      let todo = new Todo(obj.title, obj.description, obj.prio, obj.updated, obj.uuid);
      todo.setUpdated(new Date(todo.getUpdated()));
      todos.push(todo);
    }
    return todos;
  }

  convertToLsObject(todo: Todo): Object {
      const po = Object.assign({}, todo);
      return po;
  }

}
