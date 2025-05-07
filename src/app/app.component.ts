import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarefaListaComponent } from './components/tarefa/tarefa-lista/tarefa-lista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TarefaListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'João';
}
