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

#### ngFor core directive
- A _structural directive_ that renders a template for each item in a collection.
    ````
    *ngFor = "let val of array"
    ````
- It provides exported values that can be aliased to local variables
    ````
    <course-card
    *ngFor = "let val of array;index as i;first as isFirst"
    [class.className]="isFirst">
    Applies the css className to only the first element
    ````

- Angular uses object identity to track insertions and deletions within the iterator and reproduce those changes in the DOM.
- The identities of elements in the iterator can change while the data does not. This can happen, for example, if the iterator is produced from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the second response produces objects with different identities, and Angular must tear down the entire DOM and rebuild it (as if all old elements were deleted and all new elements inserted).

- To avoid this expensive operation, you can customize the default tracking algorithm. by supplying the `trackBy` option to NgForOf. `trackBy` takes a function that has two arguments: index and item. If `trackBy` is given, Angular tracks changes by the return value of the function.

#### ngIf
-   Used for conditional display 
-   Hide certain part of the page
-   If *ngIf = false/undefined, the content is completely removed from DOM.
-   We can pass boolean value, object, function to *ngIf directive which evaluates to true|false|undefined

-   Syntax:
    ````
    *ngIf="value"
    *ngIf="value.iconUrl; else noImage"
    ````

#### ngClass:
-   Used for conditional styling
-   Apply certain styles based on some value
-   It's not meant to replace css class property
-   Syntax
    ````
    [ngClass] = "string|array|object|function"
    [ngClass] = "'style1'"
    [ngClass] = "'style1 style2'"
    [ngClass] = "['style1','style2']"
    [ngClass] = "{'style1':true,'style2':false}"
    [ngClass] = "styleClasses()"
    ````