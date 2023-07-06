import { Component, Input } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {

  @Input()
  value:Course;

  onCourseViewed(){
    console.log('course card button clicked')
  }
}
