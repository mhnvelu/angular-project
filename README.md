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

## Section 3 : Angular Local Template Query
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

## Section 4 : Angular Content Projection
-   Making configurable components
-   To make a static template more configurable
### ng-content:
-   Pass the configurable element in the content part of Component
-   Use **ng-content** directive in Component's Template to render the projected configurable element passed to the Component
-   In **ng-content** directive, we can select only specific element from the configurable element passed to the Component using **select**.
-   **select** - It accepts HTML element or Component name or css class name
-   Anything that is not matched to the select, can still be projected by simply creating a ng-content in the template
    ````
    <ng-content select="course-image"></ng-content>
    <ng-content select=".course-description"></ng-content>
    <ng-content></ng-content>
    ````
-   If many elements match the select criteria, all the matched elements will be projected

### Content Child Decorator:
-   A component can get programmatic reference to projected content in its own template
-   We can't use @ViewChild to query the projected content even if we use Template reference. The value will be undefined.
-   @ViewChild decorator can query elements which are visible only inside the template. It can't see inside the projected content.
-   Inorder to see inside the projected content, we need to use new decorator **@ContentChild**. It covers only the projected content. It can't be used to query other elements of the template. Its scope is restricted to query inside ng-content only. In other terms, its restricted to content part of the component.
-   It can also be used to query other Components inside the projected content part of the Component

    ````
    // using template reference
    @ContentChild("courseImage")
    image : ElementRef;

    //using Component name to retrieve the Component
    @ContentChild(CourseImageComponent)
    image: CourseImageComponent;

    //using Component name to retrieve native DOM element
    @ContentChild(CourseImageComponent, { read: ElementRef })
    image: CourseImageComponent;
    ````

### Content Children and AfterContent Lifecycle Hook:
- Allows to query collecton of elements that match the query
    ````
    //using Component name to retrieve native DOM element of multiple Components of same type
    
    @ContentChildren(CourseImageComponent, { read: ElementRef })
    images : QueryList<CourseImageComponent>;
    ````

## Section 5 : Angular Template
### ng-template
-   Used to create template segment
-   By default, the template segment is not displayed on page
-   The template segment is used only if it is explicitly referred in template
-   The template segment can refer variables from the template in which its embedded
    ````
    <ng-template #blankImage>
      <p class="warn">{{value.description}} No image is available yet</p>
      <img src="/assets/empty-image.png">
    </ng-template>
    ````
### ng-template instantiation with ngTemplateOutlet
-   Provide private variable context that is visible only within the ng-template
-   We can pass different variables for each ng-template and make the template itself reusable
-   We can define the ng-template in one component and pass it as input to another component by filling in the __context__ of the ng-template as we need
-   __ngTemplateOutlet__ : This structural directive is used to instantiate the ng-template
    ````
    <!-- ng template -->
    <ng-template #blankImage let-courseName="description">
    <p class="warn">{{ courseName }} No image is available yet</p>
    <img src="/assets/empty-image.png" />
    </ng-template>

    // Instantiate the ng-template
    <div
    *ngTemplateOutlet="blankImage; context: { description: course.description }"
    ></div>
    ````

-   We can use ng-container with ngTemplateOutlet instead of div. This avoids creating a DOM element just for instantiating the ng-template
    ````
    <ng-container
    *ngTemplateOutlet="blankImage; context: { description: course.description }"
    ></ng-container>
    ````

### ng-template as Component Input:
-   A configurable ng-template can be passed as Component Input and the Component can instantiate the ng-template using ngTemplateOutlet

    ````
    //ng-template as input
    <course-card [value]="course" [noImageTemplate]="blankImage">
    <course-image [imageUrl]="course.iconUrl"></course-image>
    </course-card>

    //Input field for ng-template from above
    @Input()
    noImageTemplate : TemplateRef<any>

    // Instantiate ng-template
    <ng-template #noImage>
      <ng-container *ngTemplateOutlet="noImageTemplate; context:{description : value.description}"> </ng-container>
    </ng-template>

    // Reference to ng-template above
    <ng-content
      select="course-image"
      *ngIf="value.iconUrl; else noImage"
    ></ng-content>

    ````
## ## Section 6 : Angular Directives
### Angular Attribute Directives
-   The attributes on DOM HTML element decides the behaviour and appearance.
-   Similarly, the Angular Attribute Directives on Angular Component decides the behaviour and appearance.
-   These Directives can be applied to native DOM element as well.
    ````
        ng g directive highlighted
    
        @Directive({
        selector: '[highlighted]'
        })
    ````
-   If the directive is applied to a Component, then it is instantiated.
    ````    
    <course-card (courseSelected)="onCourseSelected($event)"
    [course]="course" highlighted>
    ````
-   The directive can accept expression as well.

### Angular Host Binding - DOM Properties Vs Attributes
-   The instance of Component to which the instance of directive is applied is known as Host element of the directive.
-   The directive is always applied to Host element
-   There are several ways the directive can interact with Host element
####   HostBinding decorator : 
-   It allows us to modify any DOM properties of the element to which the directive is applied.
-   It can be applied only to known DOM properties of the Host element.
-   It can be applied to DOM attributes of the Host element. We can set DOM attributes different from DOM properties
-   DOM attribute is different from DOM properties

    ````
    @Input("highlighter")
    isHighlighted = false;

    constructor() {
    console.log("--Directive highlighted created--");
    }

    @HostBinding("className")
    get cssClasses() {
       return "highlight"; // This is css class from Component.css file
    }

    //  highlight applied as css class
    @HostBinding("class.highlight")
    get cssClasses() {
        return true;;
    }

    // highlight will not be applied
    @HostBinding("class.highlight")
    get cssClasses() {
        return false;;
    }
    ````
    ````
    -   Applying highlighted directive and setting its input highlighter=true|false and making the directive has configurable.
    -   [highlighter]="true" is not an input to the course-card component.
    It's an Input to the directive

    <course-card (courseSelected)="onCourseSelected($event)"
    [course]="course" highlighted [highlighter]="true">
    
    // highlight will not be applied by default
    @HostBinding("class.highlight")
    get cssClasses() {
        return this.isHighlighted;
    }
    ````
    ````
    // Applied on DOM style property
    @HostBinding("style.border")
    get cssClasses() {
        return "5px solid green";
    }
    ````
    ````
    // DOM attribute disabled=true is added
    @HostBinding("attr.disabled")
    get disabled() {
         return "true";
    }
    ````

### Angular Host Listener - Handling events in Directives
-   The Directive can interact with Host Element via DOM events
    ````
    @HostListener('mouseover')
    mouseOver(){
        this.isHighlighted = true;
    }
    ````
-   Host Listener is a convenient way to interact with native DOM events on the Host element.
- We can use the Directive to emit custom events as well

### Angular Directive Export as Syntax
-   To get programmatic access to Directive either in Template or Componenet class
    ````
    @Directive({
    selector: "[highlighted]",
    exportAs: "hl",
    })
    export class HighlightedDirective
    ````
    ````
    <course-card
    (courseSelected)="onCourseSelected($event)"
    [course]="course"
    highlighted
    [highlighter]="true"
    (toggleHighlight)="onToggleHighlight($event)"
    #highlightDir="hl"
    >
    
    <div class="course-description" (dblclick)="highlightDir.toggle()">
      {{ course.longDescription }}
    </div>
    </course-card>
    ````    
    ````
    @ViewChild(HighlightedDirective)
    highlighter: HighlightedDirective;

    @ViewChild(CourseCardComponent, { read: HighlightedDirective })
    highlighter: HighlightedDirective;
    ````
### Angular Structural Directives - Understanding the Star Syntax
-   We can create custom Structural Directives
    ````
    ng g directive ngx-unless
    ````
-   The prefix ngx is commonly used inorder to identify a directive that is not part of Angular core.

### Custom Angular Structural Directives:
    ````
    @Directive({
    selector: "[ngxUnless]",
    })
    export class NgxUnlessDirective {
    visible = false;

    constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) {}

    // Angular framework calls this method. We need to make sure we don't create or clear the container when framework calls it many times.
    @Input()
    set ngxUnless(condition: boolean) {
        if (!condition && !this.visible) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.visible = true;
        } else if (condition && this.visible) {
            this.viewContainer.clear();
            this.visible = false;
        }
    }
    }
    ````
    ````
    <course-image [src]="course.iconUrl" *ngxUnless="!course.iconUrl"
    ></course-image>    
    ````    