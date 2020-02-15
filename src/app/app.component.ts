import { Component } from '@angular/core';
import { Todo } from 'src/models/todo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: string = 'Minhas tarefas';
  public todoForm: FormGroup;
  public mode = 'list';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]]
    });

    this.load();
  }

  addTodo() {
    const title = this.todoForm.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.toastr.success('Evento adicionado com sucesso!');
    this.salvar();
    this.clearInput();
  }

  salvar() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    if(data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  clearInput() {
    this.todoForm.reset();
  }

  alteraTexto() {
    this.title = 'Teste';
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.salvar();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.salvar();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.salvar();
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
