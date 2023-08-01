import { Component, ElementRef, ViewChild } from "@angular/core";
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

  @ViewChild("containerRef")
  containerDiv: ElementRef;

  @ViewChild("cardRef1")
  card1: CourseCardComponent;

  @ViewChild("cardRef2")
  card2: CourseCardComponent;

  @ViewChild("cardRef2",{read:ElementRef})
  card22: ElementRef;

  onCourseCardClicked() {
    console.log("--App component-- button click bubble handled");
  }

  onCourseSelected(course: Course) {
    console.log("--App component custom event--", course);
    console.log("--App component custom event--", this.card1);
    console.log("--App component custom event--", this.card2);
    console.log("--App component custom event--", this.card22);
    console.log("--App component custom event--", this.containerDiv);
  }
}
