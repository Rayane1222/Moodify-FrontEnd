import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {questionModel} from "../models/question.model";
import {QuestionService} from "../service/question.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.scss'
})
export class EditQuestionComponent implements OnInit{
  editForm: FormGroup;
  questionId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      question: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionId = +params['id'];
      this.questionService.getQuestionById(this.questionId).subscribe(
        (question: any) => {
          this.editForm.patchValue(question);
        },
        (error) => {
          console.error('Error fetching question:', error);
        }
      );
    });
  }

  onSubmit(): void {
    this.questionService.updateQuestion(this.questionId, this.editForm.value).subscribe(
      () => {
        console.log('Question updated successfully.');
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error updating question:', error);
      }
    );
  }
}
