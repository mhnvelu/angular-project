import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';


@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {

  @Input()
  value : Course;

  @Input()
  cardIndex : number;

  // custom event
  @Output()
  courseSelected = new EventEmitter<Course>();

  onCourseViewed(){
    console.log('--course card button clicked--')
    this.courseSelected.emit(this.value);
  }

  cardClasses(){

    // return style as string
    if(this.value.category === 'BEGINNER'){
      return 'beginner';
    }

    // return array of styles
    // if(this.value.category === 'BEGINNER'){
    //   return ['beginner']
    // }

    // return styles as object
    // return {
    //   'beginner' : this.value.category === 'BEGINNER'
    // }
  }
}