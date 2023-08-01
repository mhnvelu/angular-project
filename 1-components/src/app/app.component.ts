import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit{
  courses = COURSES;

  // Angular pipe example
  startDate = new Date();

  @ViewChild("containerRef")
  containerDiv: ElementRef;

  @ViewChild("cardRef1")
  card1: CourseCardComponent;

  @ViewChild("cardRef2")
  card2: CourseCardComponent;

  @ViewChild("cardRef2", { read: ElementRef })
  card22: ElementRef;

  @ViewChildren("CourseCardComponent")
  cards:QueryList<CourseCardComponent>

  // @ViewChildren("CourseCardComponent",{read:ElementRef})
  // cards:QueryList<ElementRef>

  constructor() {
    console.log("--In Constructor--", this.card1);
  }
  ngAfterViewInit(): void {
    console.log("--In ngAfterViewInit--", this.card1);
  }

  onCourseCardClicked() {
    console.log("--App component-- button click bubble handled");
  }

  onCourseSelected(course: Course) {
    console.log("--App component custom event--", course);
    console.log("--card1--", this.card1);
    console.log("--card2--", this.card2);
    console.log("--HTML element of card2--", this.card22);
    console.log("--containerDiv--", this.containerDiv);
  }
}
