<script>
    import { showGuide } from "$lib/stores";
</script>

<main style:display={$showGuide ? "grid" : "none"}>
    <div class="title">Comments</div>

    <div class="row">
        <pre>Comment</pre>
        <pre>//</pre>
        <pre>print(“Hello World”) // This is a comment</pre>
    </div>

    <div class="title">Variables</div>

    <div class="row">
        <pre>Assignment</pre>
        <pre>=</pre>
        <pre>x = 3</pre>
    </div>

    <div class="row">
        <pre>Constants</pre>
        <pre>const</pre>
        <pre>const vat = 0.2</pre>
    </div>

    <div class="row">
        <pre>Global Variables</pre>
        <pre>global</pre>
        <pre>global userID = "Cust001"</pre>
    </div>

    <div class="title">Input/Output</div>

    <div class="row">
        <pre>Input</pre>
        <pre>input()</pre>
        <pre>myName = input("Please enter a name")</pre>
    </div>

    <div class="row">
        <pre>Output</pre>
        <pre>print()</pre>
        <pre>print("My name is Noni")</pre>
    </div>

    <div class="title">Casting</div>

    <div class="row">
        <pre>Converting to another data type</pre>
        <pre>str()</pre>
        <pre>str(345)</pre>
    </div>

    <div class="row">
        <pre></pre>
        <pre>int()</pre>
        <pre>int("3")</pre>
    </div>

    <div class="row">
        <pre></pre>
        <pre>float()</pre>
        <pre>float("4.52")</pre>
    </div>

    <div class="row">
        <pre></pre>
        <pre>real()</pre>
        <pre>real("4.52")</pre>
    </div>

    <div class="row">
        <pre></pre>
        <pre>bool()</pre>
        <pre>bool("True")</pre>
    </div>

    <div class="title">Iteration</div>

    <div class="row">
        <pre>FOR loop</pre>
        <pre>for ... to ... next ...</pre>
        <pre>
for i = 0 to 9
    print("Loop")
next i
// This will print the word “Loop” 10 times, i.e. 0-9 inclusive.
        </pre>
    </div>

    <div class="row">
        <pre></pre>
        <pre>
for ... to ... step ...
next ...
        </pre>
        <pre>
for i = 2 to 10 step 2
    print(i)
next i
// This will print the even numbers from 2 to 10 inclusive.

for i = 10 to 0 step -1
    print(i)
next i
// This will print the numbers from 10 to 0 inclusive, i.e. 10, 9, 8, ..., 2, 1, 0.

// Note that the 'step' command can be used to increment or decrement the loop by any positive or negative integer value.
        </pre>
    </div>

    <!-- <div class="row">
        <pre></pre>
        <pre></pre>
        <pre>
for i = 10 to 0 step -1
    print(i)
next i
// This will print the numbers from 10 to 0 inclusive, i.e. 10, 9, 8, ..., 2, 1, 0.

// Note that the 'step' command can be used to increment or decrement the loop by any positive or negative integer value.
        </pre>
    </div> -->

    <div class="row">
        <pre>WHILE loop</pre>
        <pre>
while ...
endwhile
        </pre>
        <pre>
while answer != "Correct"
    answer = input("New answer")
endwhile
// Will loop until the user inputs the string “Correct”. Check condition is carried out before entering loop.
        </pre>
    </div>

    <div class="row">
        <pre>DO UNTIL loop</pre>
        <pre>
do
until
        </pre>
        <pre>
do
    answer = input("New answer")
until answer == "Correct"
// Will loop until the user inputs the string “Correct”. Loop iterates once before a check is carried out.
        </pre>
    </div>

    <div class="title">Condition</div>

    <div class="row">
        <pre>IF-THEN-ELSE</pre>
        <pre>
if ... then
elseif ... then
else
endif
        </pre>
        <pre>
if answer == "Yes" then
    print("Correct")
elseif answer == "No" then
    print("Wrong")
else
    print("Error")
endif
        </pre>
    </div>

    <div class="row">
        <pre>SWITCH</pre>
        <pre>
switch … :
    case … :
    case … :
default:
endswitch
        </pre>
        <pre>
switch day :
    case "Sat":
        print("Saturday")
    case "Sun":
        print("Sunday")
default:
    print("Weekday")
endswitch
        </pre>
    </div>

    <div class="title">String handling</div>

    <div class="row">
        <pre>String length</pre>
        <pre>.length</pre>
        <pre>
subject = "ComputerScience"
subject.length // returns the value 15
        </pre>
    </div>

    <div class="row">
        <pre>Substrings</pre>
        <pre>
.substring(x , i)
.left(i)
.right(i)
        </pre>
        <pre>
subject.substring(3,5) // returns "puter"
subject.left(4) // returns "Comp"
subject.right(3) // returns "nce"
        </pre>
    </div>

    <div class="row">
        <pre>Concatenation</pre>
        <pre>+</pre>
        <pre>
name = "Tom"
print("Your name is: " + name)
        </pre>
    </div>

    <div class="row">
        <pre>Uppercase</pre>
        <pre>.upper</pre>
        <pre>
subject = "ComputerScience"
subject.upper // returns "COMPUTERSCIENCE"
        </pre>
    </div>

    <div class="row">
        <pre>Lowercase</pre>
        <pre>.lower</pre>
        <pre>subject.lower // returns "computerscience"</pre>
    </div>

    <div class="row">
        <pre>ASCII Conversion</pre>
        <pre>ASC(...)</pre>
        <pre>ASC('C') // returns 65</pre>
    </div>

    <div class="row">
        <pre></pre>
        <pre>CHR(...)</pre>
        <pre>CHR(97) // returns 'a'</pre>
    </div>

    <div class="title">File Handling</div>

    <div class="row">
        <pre>Open</pre>
        <pre>open(...)</pre>
        <pre>
myFile = open("sample.txt")
// Note that the file needs to be stored as a variable.
        </pre>
    </div>

    <div class="row">
        <pre>Close</pre>
        <pre>.close()</pre>
        <pre>myFile.close()</pre>
    </div>

    <div class="row">
        <pre>Read line</pre>
        <pre>.readLine()</pre>
        <pre>myFile.readLine()</pre>
    </div>

    <div class="row">
        <pre>Write line</pre>
        <pre>.writeLine(...)</pre>
        <pre>
myFile.writeLine("Add new line")
// Note that the line will be written to the END of the file.
        </pre>
    </div>

    <div class="row">
        <pre>End of File</pre>
        <pre>.endOfFile()</pre>
        <pre>
while NOT myFile.endOfFile()
    print(myFile.readLine())
endwhile
        </pre>
    </div>

    <div class="row">
        <pre>Create a new file</pre>
        <pre>newFile(...)</pre>
        <pre>
newFile("myText.txt")
// Creates a new text file called "myText". The file would then need to be opened using the above command for Open.
        </pre>
    </div>

    <div class="title">Arrays</div>

    <div class="row">
        <pre>Declaration</pre>
        <pre>array colours[...]</pre>
        <pre>
array colours[5]
// Creates 1D array with 5 elements (index 0 to 4).

array colours = ["Blue", "Pink", "Green", "Yellow", "Red"]
// Arrays can be declared with values assigned.
        </pre>
    </div>

    <div class="row">
        <pre></pre>
        <pre>array gameboard[..., ...] = ...</pre>
        <pre>
array gameboard[8,8]
// Creates 2D array with 8 elements (index 0 to 7).
        </pre>
    </div>

    <div class="row">
        <pre>Assignment</pre>
        <pre>names[...] = ...</pre>
        <pre>names[3] = "Noni"</pre>
    </div>

    <div class="row">
        <pre></pre>
        <pre>gameboard[..., ...] = ...</pre>
        <pre>gameboard[1, 0] = "Pawn"</pre>
    </div>

    <div class="title">Sub programs</div>

    <div class="row">
        <pre>Procedure</pre>
        <pre>
procedure name(...)
endprocedure
        </pre>
        <pre>
procedure multiply(num1, num2)
    print(num1 * num2)
endprocedure
        </pre>
    </div>

    <div class="row">
        <pre>Calling a procedure</pre>
        <pre>procedure(parameters)</pre>
        <pre>multiply(5, 7)</pre>
    </div>

    <div class="row">
        <pre>Function</pre>
        <pre>
function name(...)
endfunction
        </pre>
        <pre>
function squared(number)
    squared = number^2
    return squared
endfunction
        </pre>
    </div>

    <div class="row">
        <pre>Calling a function</pre>
        <pre>function(parameters)</pre>
        <pre>
squared(4)

newValue = squared(4)
// Function returns should be stored in a variable if needed for later use in a program.
        </pre>
    </div>

    <div class="title">Random numbers</div>

    <div class="row">
        <pre>Random numbers</pre>
        <pre>random(..., ...)</pre>
        <pre>
myVariable = random(1,6)
// Creates a random integer between 1 and 6 inclusive.
        </pre>
    </div>
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 2.5rem;

        padding: 10px;
        box-sizing: border-box;

        background-color: #282c34;
        color: white;
        font-family: "Albert Sans";
    }

    .title {
        background-color: grey;
        line-height: 1.5rem;
        padding-left: 0.25rem;
        box-sizing: border-box;
        grid-column: span 3;
    }

    .row {
        display: contents;
    }

    .row > pre:nth-child(2),
    .row > pre:nth-child(3) {
        font-family: "Courier New", Courier, monospace;
    }
</style>
