import { Component, Input } from "@angular/core";

@Component({
  selector: "course-image",
  templateUrl: "./course-image.component.html",
  styleUrls: ["./course-image.component.css"],
})
export class CourseImageComponent {
  @Input()
  imageUrl: string;

  constructor() {}
}
