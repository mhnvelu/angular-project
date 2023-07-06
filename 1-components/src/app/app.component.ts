import { Component } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  courses = COURSES;

  onCourseCardClicked(){
    console.log('--App component-- button click bubble handled')
  }

  onCourseSelected(course: Course){
    console.log('--App component custom event--',course)
  }

}
