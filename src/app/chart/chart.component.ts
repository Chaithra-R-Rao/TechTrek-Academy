
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chart',
  standalone: false,
  
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})

export class ChartComponent implements OnInit {
  chart: Chart | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUserCourses().subscribe(
      (userCourses: any[]) => {
        const enrollmentCounts = userCourses.reduce((acc: { [key: string]: number }, course) => {
          const courseKey = course.courseTitle.split(':')[0].trim(); 
          acc[courseKey] = (acc[courseKey] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(enrollmentCounts); // String array
        const data = Object.values(enrollmentCounts); // Number array

        this.createChart(labels, data);
      },
      (error) => {
        console.error('Error fetching user courses:', error);
      }
    );
  }

  createChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const backgroundColors = [
      'rgba(69, 201, 76, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
  ];
  const borderColors = [
      'rgb(62, 187, 83)',
      'rgb(54, 162, 235)',
      'rgb(255, 206, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)'
  ];
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Enrollments',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}