import {Component, OnInit} from '@angular/core';
import {MoodService} from "../service/mood/mood.service";
import {CommonModule, DatePipe} from "@angular/common";

@Component({
  selector: 'app-mood-history',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './mood-history.component.html',
  styleUrl: './mood-history.component.scss'
})
export class MoodHistoryComponent implements OnInit {

  public moodHistory: any[] = [];
  public username: string = "";

  constructor(private moodService: MoodService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("user")!;
    this.getMoodHistory();
  }

  getMoodHistory() {
    this.moodService.getUserMoods(this.username).subscribe(res => {
      this.moodHistory = res;
    });
  }
}
