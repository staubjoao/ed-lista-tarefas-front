import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../../models/tarefa';
import { TarefaService } from '../../../services/tarefa/tarefa.service';
import { TarefaDto } from '../../../models/tarefa-dto';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tarefa-form.component.html',
  styleUrl: './tarefa-form.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TarefaFormComponent implements OnChanges {
  @Input() tarefaEntrada: Tarefa | null = null;
  @Output() tarefaSaida = new EventEmitter<Tarefa>();

  tarefa: string = '';
  dataFinal: string = '';
  descricao: string = '';
  status: string = '';
  modoEdicao: boolean = false;

  constructor(private service: TarefaService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarefaEntrada']) {
       this.carregarDadosParaEdicao();
    }
  }

  carregarDadosParaEdicao(): void {
    if (this.tarefaEntrada) {
      this.tarefa = this.tarefaEntrada.tarefa;
      this.dataFinal = this.tarefaEntrada.dataFinal;
      this.descricao = this.tarefaEntrada.descricao;
      this.status = this.tarefaEntrada.status;
      this.modoEdicao = true;
    } else {
      this.limparCampos();
    }
  }

  limparCampos(): void {
    this.tarefa = '';
    this.dataFinal = '';
    this.descricao = '';
    this.status = '';
    this.modoEdicao = false;
  }

  salvarNovaTarefa(tarefaDto: TarefaDto) {
    this.service.salvarNovaTarefa(tarefaDto).subscribe({
      next: (tarefa) => {
        console.log(tarefa);
        this.tarefaSaida.emit(tarefa);
      }
    });
  }

  editarTarefa(tarefaDto: TarefaDto, id: number) {
    this.service.alterarTarefa(tarefaDto, id).subscribe({
      next: (tarefa) => {
        console.log(tarefa);
        this.tarefaSaida.emit(tarefa);
      }
    });
  }

  private formatarDataComOuSemSegundos(dateString: string): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Data inválida:', dateString);
      return '';
    }

    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
  }

  preparaDTO(): TarefaDto {
    return {
      tarefa: this.tarefa,
      dataFinal: this.dataFinal ? this.formatarDataComOuSemSegundos(this.dataFinal) : '',
      descricao: this.descricao,
      status: this.status
    }
  }

  salvar() {
    const tarefaDto = this.preparaDTO();

    if (this.modoEdicao) {
      this.editarTarefa(tarefaDto, this.tarefaEntrada!.id);
    } else {
      this.salvarNovaTarefa(tarefaDto);
    }

    this.limparCampos();
  }

}
