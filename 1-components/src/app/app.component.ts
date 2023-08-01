import { Component, ViewChild } from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  courses = COURSES;

  // Angular pipe example
  startDate = new Date();


  @ViewChild(CourseCardComponent)
  card: CourseCardComponent;

  onCourseCardClicked() {
    console.log("--App component-- button click bubble handled");
  }

  onCourseSelected(course: Course) {
    console.log("--App component custom event--", course);
    console.log("--App component custom event--", this.card);
  }
}
