import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { QuestionService } from "../service/question.service";
import { questionModel } from "../models/question.model";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements AfterViewInit, OnInit {
  constructor(private questionService: QuestionService) { }

  public questions: any[] = [];
  displayedColumns: string[] = ['id', 'question', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();
  searchId: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadQuestions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadQuestions() {
    this.questionService.getbackQuestion().subscribe(data => {
      console.log('Received data:', data);
      this.questions = data;
      this.dataSource.data = this.questions;
    }, error => {
      console.error('Error fetching questions:', error);
    });
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id).subscribe(
      () => {
        console.log(`Question with ID ${id} deleted successfully.`);
        this.loadQuestions();
      },
      (error) => {
        console.error('Error deleting question:', error);
      }
    );
  }

  applyFilter() {
    const filterValue = this.searchId.trim().toLowerCase();
    if (filterValue) {
      const filteredQuestions = this.questions.filter(question => question.id.toString() === filterValue);
      this.dataSource.data = filteredQuestions;
    } else {
      this.dataSource.data = this.questions;
    }
  }
}
