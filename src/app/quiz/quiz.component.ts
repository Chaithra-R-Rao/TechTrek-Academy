import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, retryWhen, scan, mergeMap, map } from 'rxjs/operators';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string ;
}

@Component({
  selector: 'app-quiz',
  standalone: false,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  topic: string = '';
  quizQuestions: QuizQuestion[] = [];
  userAnswers: string[] = [];
  loading = false;
  feedback = '';
  showResults = false;
 
  extractedOption: string="";


  parsedQuestions: QuizQuestion[] = [];
  answerStatus: string[] = []; // Add this line to define the answerStatus property
  
  score: number = 0; // Add this line to track the score

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  
  fetchQuizQuestions(topic: string): Observable<QuizQuestion[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openaiApiKey}`,
    });

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for generating quiz questions.' },
        { role: 'user', content: `Generate 5 multiple-choice quiz questions on ${topic}. Each question should have exactly 4 answer options labeled (a, b, c, d) and also specify the correct answer.` },
      ],
      max_tokens: 500,
      temperature: 0.7
    };

    return this.http.post<any>('https://api.openai.com/v1/chat/completions', payload, { headers }).pipe(
      map((response) => {
        const questionsText = response.choices[0]?.message?.content || '';
        console.log(questionsText);
        return this.parseQuestions(questionsText);
      }),
      retryWhen(errors =>
        errors.pipe(
          scan((retryCount: number, err) => {
            if (retryCount >= 5) throw err;
            return retryCount + 1;
          }, 0),
          mergeMap((retryCount: number) => of(null).pipe(delay(Math.pow(2, retryCount) * 1000)))
        )
      ),
      catchError((error) => {
        console.error('Error fetching quiz questions:', error);
        return throwError(() => new Error('Failed to fetch quiz questions.'));
      })
    );
  }

  generateQuiz() {
    if (!this.topic) {
      this.feedback = 'Please select a topic!';
      return;
    }
    this.loading = true;
    this.feedback = '';
    this.fetchQuizQuestions(this.topic).subscribe({
      next: (questions) => {
        this.quizQuestions = questions;
        this.userAnswers = new Array(questions.length).fill('');
        this.feedback = 'Quiz generated successfully!';
        this.loading = false;
        this.showResults = false; // Reset results on new quiz generation
      },
      error: () => {
        this.feedback = 'Error fetching quiz questions. Please try again later.';
        this.loading = false;
      }
    });
  }

  submitQuiz() {
    this.score = 0; // Reset score

    this.quizQuestions.forEach((question, index) => {
        const answerLine = question.answer; // Directly use the answer line
        const match = answerLine.match(/\*\*Correct Answer[:\s]*\(?([a-d])\)?/i);
        console.log("Match", match);

        let correctOption = "";
        if (match) {
            correctOption = match[1].toUpperCase(); // Extracts option letter (A, B, C, D)
            console.log("Correct Option", correctOption);
        }

        const userAnswer = this.userAnswers[index];

        let extractedOption = ""; // Declare it outside the if block

        if (userAnswer) {
            const optionMatch = userAnswer.match(/\((\w)\)/);
            if (optionMatch) {
                extractedOption = optionMatch[1].toUpperCase(); // Convert to uppercase
                console.log("Extracted Option:", extractedOption);
            } else {
                console.log("No option found inside parentheses");
            }
        }

        // Ensure correct comparison
        if (extractedOption && extractedOption === correctOption) {
            this.score += 2; // Add 2 marks for each correct answer
            console.log("Score Increased");
        }

        this.answerStatus[index] = answerLine; // Store the correct answer line
    });

    this.feedback = `Your total score is: ${this.score}`;
    this.showResults = true;
}

 
  private parseQuestions(questions: string): QuizQuestion[] {
    const parsedQuestions: QuizQuestion[] = [];
    const questionBlocks = questions.split(/\n(?=### Question \d+:)/); // Splits on numbered questions
  
    questionBlocks.forEach((block) => {
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length < 6) return;
      const questionText = lines[1]; // Question text is on the second line
      const options = lines.slice(2, 6).map(opt => opt.replace(/^[a-d]\)\s*/, ''));
        const answerLine = lines.find(line => line.includes("**Correct Answer")) || ""; 
    
      parsedQuestions.push({ question: questionText, options, answer: answerLine });
    });
    return parsedQuestions;
  }
 
  
}








