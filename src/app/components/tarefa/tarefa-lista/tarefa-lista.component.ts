import { Component, OnInit } from '@angular/core';
import { TarefaFormComponent } from '../tarefa-form/tarefa-form.component';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../../models/tarefa';
import { TarefaService } from '../../../services/tarefa/tarefa.service';
import { FormatarTextoPipe } from "../../../pipes/formatar-texto/formatar-texto.pipe";
import { FormatarDataPipe } from '../../../pipes/formatar-data/formatar-data.pipe';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [
    TarefaFormComponent,
    CommonModule,
    FormatarTextoPipe,
    FormatarDataPipe
],
  templateUrl: './tarefa-lista.component.html',
  styleUrl: './tarefa-lista.component.css'
})
export class TarefaListaComponent implements OnInit {

  tarefas: Tarefa[] = []
  tarefaEntrada: Tarefa | null = null;

  loading: boolean = true;

  constructor(private service: TarefaService) { }

  ngOnInit(): void {
    this.carregarTodasTarefas();
  }

  carregarTodasTarefas(): void {
    this.loading = true;
    this.service.obterTodasTarefas().subscribe(
      (tarefas: Tarefa[]) => {
        this.loading = false;
        this.tarefas = tarefas;
        console.log(tarefas);
      }
    )
  }

  onTarefaSaida(tarefaAtualizada: Tarefa): void {
    this.tarefas.push(tarefaAtualizada);
  }

  editarTarefa(tarefa: Tarefa) {
    this.tarefaEntrada = tarefa;
    this.tarefas = this.tarefas.filter(t => t.id !== tarefa.id);
  }

  excluirTarefa(tarefaId: number) {
    this.service.deletarTarefa(tarefaId).subscribe(
      () => {
        this.tarefas = this.tarefas.filter(t => t.id !== tarefaId);
      }
    )
  }

  formatarStatus(status: string): string {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'em_andamento':
        return 'Em Andamento';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  }
}
