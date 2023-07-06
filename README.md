# angular-project
## Section 1
### Installation
- Install node v18+
- npm install -g @angular/cli
    - Global ng command will be available
- Create new project
    - ng new angular-app

### Introduction to Angular
- Custom HTML Elements
    - We can define our own HTML elements
    - This allows to extend browser functionality with our own functionality
- Model
    - Component class
    - @Component decorator
    - Data can be simple attribute, JS Object or Array.
    - Clear separation of data in model from View.
    - Component class makes the data available to the View
- View
    - HTML template
    - View can access data via {{ model_attribute}}

### Key features of Angular Core
- Angular Input value property syntax
    ````
    <input class="demo" [value]="expression">
    <input class="demo" [value]="data.title">
    data object is available in component

    <input class="demo" [value]="'Test'">
    <input class="demo" value="Test">

    Both renders Test as value in the input field
    ````

- Angular action listener syntax
    ````
    <img src=""  (action)="function-in-component()">

    Example:
    <img src=""  (onClick)="onImageClicked()">
    ````
- Template reference - Provide name to elements in template
    ````
    <input class="demo"  (keyUp) = "OnKeyUpAction(titleInput.value)" [value]="data.title" #titleInput>
    ````

- Automatic escaping of model attributes bound to template
    - This prevents security attack by Hackers injecting scripts

    
## Section 2
### Angular Components and Core Directives
#### Build our own custom component
- ng generate component course-card

#### @Input decorator
- With this decorator on a property in Component class, Angular knows that this is an input property of a component.
    ````
    @Input
    title : string

    The title property is referred in Component.html file using {{title}}

    The Parent component which creates a Child component passes the value for this property

    <course-card [title]="angular core course">
    ````

#### @Output decorator
- The click event handler - its another way of adding standard browser event listener
- This works as standard browser event, which means the click event will bubble to outside the component itself and it can be handled in Parent component
- we can emit custom event from Child component
    ````
    @Output
    eventName : new EventEmitter<Type>();
    Option Type - refers to type of value getting emitted
    
    Emit the event
    this.eventName.emit(value);
    ````

- The custom event emitted from Child component can be handled in Parent component with an handler and retrieve the emitted values using special variable `$event`
    ````
    <course-card (eventName)="onCourseSelected($event)"></course-card>
    ````

- The custom events after reaching Parent component doesn't bubble up the hierarchy.