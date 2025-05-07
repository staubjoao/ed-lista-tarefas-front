import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefa } from '../../models/tarefa';
import { Observable } from 'rxjs';
import { TarefaDto } from '../../models/tarefa-dto';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = "http://localhost:8080/tarefa";

  constructor(private http: HttpClient) { }

  obterTarefaPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(this.apiUrl + "/" + id);
  }

  obterTodasTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  salvarNovaTarefa(tarefaDto: TarefaDto): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefaDto);
  }

  alterarTarefa(tarefaDto: TarefaDto, id: number): Observable<Tarefa> {
    return this.http.put<Tarefa>(this.apiUrl + "/" + id, tarefaDto);
  }

  deletarTarefa(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id);
  }

}
