import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from "@angular/core";
import { Course } from "../model/course";
import { CourseImageComponent } from "../course-image/course-image.component";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],
})
export class CourseCardComponent implements AfterViewInit, AfterContentInit {
  
  @Input()
  value: Course;

  @Input()
  cardIndex: number;

  // custom event
  @Output()
  courseSelected = new EventEmitter<Course>();

  // using template reference
  // @ContentChild("courseImage")
  // image : ElementRef;

  //  using Component name to retrieve the Component
  // @ContentChild(CourseImageComponent)
  // image: CourseImageComponent;

  //  using Component name to retrieve native DOM element
  // @ContentChild(CourseImageComponent, { read: ElementRef })
  // image: CourseImageComponent;

  //  using Component name to retrieve native DOM element of multiple Components of same type
  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images : QueryList<CourseImageComponent>;

  ngAfterViewInit(): void {
    console.log("--projected content ngAfterViewInit--", this.images);
  }

  ngAfterContentInit(): void {
    console.log("--projected content ngAfterContentInit--", this.images);
  }
  onCourseViewed() {
    console.log("--course card button clicked--");
    this.courseSelected.emit(this.value);
  }

  // ngClass
  cardClasses() {
    // return style as string
    if (this.value.category === "BEGINNER") {
      return "beginner";
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

  // ngStyle
  cardStyles() {
    return { "text-decoration": "underline" };
  }
}
