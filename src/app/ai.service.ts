import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { DataService } from './data.service';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private dataService: DataService) {
    this.genAI = new GoogleGenerativeAI(environment.API_URL);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async getCourseQuizzes(prompt: string): Promise<{ response: string, quizzes: QuizQuestion[] }> {
    try {
      // Load available courses
      const courses = await firstValueFrom(this.dataService.getCourses());

      if (!courses || courses.length === 0) {
        throw new Error('No courses available');
      }

      // Strictly follow this format only:
      // [Answer]:"your answer"
      // [Quizzes]: JSON array of quizzes with questions and options
      // You should provide quizzes related to the courses.
      const contextPrompt = `Given these available courses:
      ${courses.map((c: any) => `- ${c.title}: ${c.description}`).join('\n')}
      
      The user asks: "${prompt}". 
       
      Respond with relevant 5 quizzes for the course.

     Strictly respond EXACTLY in this format:
        
      [Quizzes]: [
  {
    "question": "What does MEAN stand for in the MEAN stack?",
    "options": ["MongoDB, Express.js, AngularJS, Node.js", "MySQL, Express.js, Angular, Node.js", "MongoDB, Express.js, Angular, Node.js", "MongoDB, Ember.js, Angular, Node.js"],
    "answer": "MongoDB, Express.js, Angular, Node.js"
  },
  {
    "question": "Which database technology is typically used in a MEAN stack application?",
    "options": ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    "answer": "MongoDB"
  },
  {
    "question": "What is the role of Express.js in the MEAN stack?",
    "options": ["Front-end framework", "Back-end framework", "Database", "Cloud platform"],
    "answer": "Back-end framework"
  }
    ]
      `;

      console.log('Sending prompt:', contextPrompt);

      const result = await this.model.generateContent(contextPrompt);
      const responseText = result.response.text();
      console.log('AI Response:', responseText);
      
      const quizzes = this.extractQuizzes(responseText);
      console.log('Parsed Quizzes:', quizzes);

      return {
        response: responseText,
        quizzes: quizzes
      };
    } catch (error) {
      console.error('AI Error:', error);
      return {
        response: 'Sorry, I encountered an error. Please try again later.',
        quizzes: []
      };
    }
  }

  private extractQuizzes(response: string): QuizQuestion[] {
    try {
      // Extract JSON content from AI response
      const quizzesMatch = response.match(/\[Quizzes\]:\s*(\[[\s\S]*\])/);

      if (quizzesMatch && quizzesMatch[1]) {
        // console.log('Quizzes:', JSON.stringify(quizzesMatch));
        const quizzesJson = quizzesMatch[1].trim();
        
        if (quizzesJson.startsWith('[') && quizzesJson.endsWith(']')) {
          const parsedQuizzes = JSON.parse(quizzesJson);

          return parsedQuizzes.map((quiz: any) => ({
            question: quiz.question,
            options: quiz.options,
            answer: quiz.answer
          }));
        }
      }

      console.warn('No valid quizzes found in response.');
    } catch (error) {
      console.error('Error parsing quizzes JSON:', error);
    }

    return [];
  }
}

