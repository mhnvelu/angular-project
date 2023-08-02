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

#### ngStyle
-   Used to apply styles directly to the elements
-   We would apply styles as below using css styles
    ````
    [style.text-decoration]="'underline'"
    ````
-   If we need to apply multiple styles, then we need to repeat it with different styles.
-   The more convenient way to apply multiple styles to an element is to use ngStyle directive
-   Syntax:
    ````
    [ngStyle]="object|function"
    [ngStyle]="{'text-decoration':'underline'}"
    [ngStyle]="addStyles()"
    ````
-   Most of the times we would use plain css classes. We should not use ngClass or ngStyle.
-   ngClass can be used more frequently than ngStyle.
-   ngClass is for conditionally adding or removing classes depending on data.
-   ngStyle is to apply certain css properties depending on data.

#### ngSwitch
-   If we want to make decisions with more than 2 options, the ngSwitch can be used.
-   Syntax:
    ````
    [ngSwitch]="value"
    *ngSwitchCase="'value-1'"
    *ngSwitchCase="'value-2'"
    *ngSwitchDefault
    ````
#### ngContainer
-   The structural directives like ngIf, ngSwitch are applied on parent elements.
-   This is not always a case where a component might not have top level element and we can't apply ngIf or ngSwitch
-   So, we might end up in creating extra container element just to apply ngIf or ngSwitch
-   This is a wrapping container element on to which we can apply structural directive.
-   This will not create extra DOM element

#### Built-in pipes
-   The built in functions available for transformation.
-   For example : number, currency, percent, date, uppercase, lowercase, titlecase, slice, json, keyvalue

## Section 3 - Angular Local Template Query
### ViewChild Decorator
-   Component needs programmatic reference to some elements in template
-   Template query for obtaining reference to element in template and access it at level of component class

#### @ViewChild decorator
-   From Component class, get reference to a element in template
-   If there are multiple matching elements, it get references to first matching element.
-   Query can be based on:
    -   Component name
        ````
        @ViewChild(CourseCardComponent)
        card1: CourseCardComponent;
        ````
        We get reference to the Component itself and not the HTML element which represents the Component

    -   Template reference
        ``````
        @ViewChild('cardRef1')
        card1: CourseCardComponent;
        ``````
        Useful when multiple elements of same class is present and query using their Template reference

    -   To get reference to HTML which represents the component, we can query like
        ````
        @ViewChild("cardRef2",{read:ElementRef})
        card2: ElementRef;
        ````
    -   We can also query plain HTML element as well. we get reference to plain HTML directly
        ````
        @ViewChild('containerRef')
        containerDiv: ElementRef;
        ````

-   We can't query deeper into Component Hierarchy Tree. The scope of @ViewChild decorator is restricted to the template of the Component itself.

#### AfterViewInit Lifecycle Hook
-   When are @ViewChild decorators populated?
    -   The value is undefined when the component is being created. The construtor would have undefined value
    -   The value would have been populated when it reaches ngAfterViewInit() life cycle hook.
We should not do any data modification synchronously in this hook when the component is getting initized and it will throw an error.
    -   We will not face this issue when its modified asynchronously

#### View Children Decorator
To query multiple related components
````
@ViewChildren("CourseCardComponent")
cards:QueryList<CourseCardComponent>


@ViewChildren("CourseCardComponent",{read:ElementRef})
cards:QueryList<ElementRef>
````

