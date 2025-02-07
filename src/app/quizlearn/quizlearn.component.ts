import { Component, OnInit } from '@angular/core';
import { AIService } from '../ai.service';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';


interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}
interface Course {
  id: string;
  title: string;
  description: string;
}


@Component({
  selector: 'app-quizlearn',
  standalone: false,
  templateUrl: './quizlearn.component.html',
  styleUrls: ['./quizlearn.component.css']
})
export class QuizLearnComponent implements OnInit {
  topic: string = '';

  courses: Course[] = []; 
  selectedCourse: string = '';
  quizQuestions: QuizQuestion[] = [];
  userAnswers: string[] = [];
  loading = false;

  feedback = '';
  showResults = false;
  score: number = 0;
  answerStatus: string[] = [];
  showDialog: boolean = false; // Control dialog visibility


  constructor(private aiService: AIService, private dataService: DataService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchCourses(); 
  }
  fetchCourses() {
    this.dataService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses; // Store courses for dropdown
      },
      error: (err) => console.error('Error fetching courses:', err),
    });
  }

  generateQuiz() {
      if (!this.selectedCourse) {
        this.toastr.warning('Please select a topic!', 'Warning');

      this.feedback = 'Please select a topic!';
      return;
    }

    this.loading = true;
    this.feedback = '';
    

    this.aiService.getCourseQuizzes(this.selectedCourse).then(({ quizzes }) => { 
      this.quizQuestions = quizzes;
      this.userAnswers = new Array(quizzes.length).fill('');
      this.feedback = 'Quiz generated successfully!';
      this.loading = false;
   
      this.showResults = false;
    }).catch(() => {
      this.feedback = 'Error fetching quiz questions. Please try again later.';
      this.loading = false;

    });
  }

  submitQuiz() {
    this.showResults = true;
    this.calculateScore();
    this.showDialog = true; // Show the score dialog
  }
  
  calculateScore() {
    this.score = 0;
    this.answerStatus = [];
  
    this.quizQuestions.forEach((question, index) => {
      if (this.userAnswers[index] === question.answer) {
        this.score++;
      }
      this.answerStatus[index] = question.answer;
    });
  }

  allQuestionsAnswered(): boolean {
    return this.quizQuestions.every((_, i) => this.userAnswers[i]);
  }

  closeDialog() {
    this.showDialog = false; // Close the dialog
  }

}


