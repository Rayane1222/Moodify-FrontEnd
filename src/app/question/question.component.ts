import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import {MoodService} from "../service/mood/mood.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter: number = 20;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  mood: string = "";
  moodCount: { [key: string]: number } = { "happy": 0, "sad": 0, "angry": 0, "neutral": 0 };

  constructor(private questionService: QuestionService, private moodService: MoodService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("user")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
        console.log(this.questionList);
      });
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {
    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
      this.calculateMood();
    }

    if (option.correct) {
      this.points += 1;
      this.correctAnswer++;
    } else {
      this.points -= 1;
      this.inCorrectAnswer++;
    }

    this.moodCount[option.mood]++;

    setTimeout(() => {
      this.currentQuestion++;
      this.resetCounter();
      this.getProgressPercent();
    }, 1000);
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 20;
          this.points -= 1;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 20;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 20;
    this.currentQuestion = 0;
    this.progress = "0";
    this.moodCount = { "happy": 0, "sad": 0, "angry": 0, "neutral": 0 };
    this.isQuizCompleted = false;
    this.mood = "";
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  calculateMood() {
    let maxCount = 0;
    for (let mood in this.moodCount) {
      if (this.moodCount[mood] > maxCount) {
        maxCount = this.moodCount[mood];
        this.mood = mood;
      }
    }
    // Save the mood to the backend
    this.moodService.saveUserMood(this.name, this.mood).subscribe();
  }
}
