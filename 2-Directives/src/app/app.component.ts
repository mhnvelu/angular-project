import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";
import { HighlightedDirective } from "./directives/highlighted.directive";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  courses = COURSES;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  // @ViewChild(HighlightedDirective)
  // highlighter: HighlightedDirective;

  @ViewChild(CourseCardComponent, { read: HighlightedDirective })
  highlighter: HighlightedDirective;

  constructor() {}

  ngAfterViewInit() {
    console.log("--ngAfterViewInit--", this.highlighter);
  }

  onCourseSelected(course: Course) {}

  onToggleHighlight(isHighlighted: boolean) {
    console.log("--onToggleHighlight--", isHighlighted);
  }
}
