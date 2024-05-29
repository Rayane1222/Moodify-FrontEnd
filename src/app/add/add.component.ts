import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { QuestionService } from "../service/question.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  question = { id: null, question: '' };

  constructor(private questionService: QuestionService, private router: Router) {}

  addQuestion() {
    this.questionService.createQuestion(this.question).subscribe(
      (data) => {
        console.log('Created new question:', data);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error creating question:', error);
      }
    );
  }
}
