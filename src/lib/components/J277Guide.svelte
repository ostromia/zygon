<script>
    import { showGuide } from "$lib/stores";
</script>

<main style:visibility={$showGuide ? 'visible' : 'hidden'}>
    <div class="title">Comments</div>

    <div class="row">
        <div>Comment</div>
        <div>//</div>
        <div>print(“Hello World”) // This is a comment</div>
    </div>

    <div class="title">Variables</div>

    <div class="row">
        <div>Assignment</div>
        <div>=</div>
        <div>x = 3</div>
    </div>

    <div class="row">
        <div>Constants</div>
        <div>const</div>
        <div>const vat = 0.2</div>
    </div>

    <div class="row">
        <div>Global Variables</div>
        <div>global</div>
        <div>global userID = "Cust001"</div>
    </div>

    <div class="title">Input/Output</div>

    <div class="row">
        <div>Input</div>
        <div>input()</div>
        <div>myName = input("Please enter a name")</div>
    </div>

    <div class="row">
        <div>Output</div>
        <div>print()</div>
        <div>print("My name is Noni")</div>
    </div>

    <div class="title">Casting</div>

    <div class="row">
        <div>Converting to another data type</div>
        <div>
            str()
        </div>
        <div>
            str(345)
        </div>
    </div>

    <div class="row">
        <div></div>
        <div>
            int()
        </div>
        <div>
            int("3")
        </div>
    </div>

    <div class="row">
        <div></div>
        <div>
            float()
        </div>
        <div>
            float("4.52")
        </div>
    </div>

    <div class="row">
        <div></div>
        <div>
            real()
        </div>
        <div>
            real("4.52")
        </div>
    </div>

    <div class="row">
        <div></div>
        <div>
            bool()
        </div>
        <div>
            bool("True")
        </div>
    </div>

    <div class="title">Iteration</div>

    <div class="row">
        <div>FOR loop</div>
        <div>
            for ... to ...
            next ...
        </div>
        <div>
            for i = 0 to 9
            &nbsp;&nbsp;&nbsp;&nbsp; print("Loop")
            next i
            // This will print the word “Loop” 10 times, i.e. 0-9 inclusive.
        </div>
    </div>

    <div class="row">
        <div></div>
        <div>
            for ... to ... step ...
            next ...
        </div>
        <div>
            for i = 2 to 10 step 2
            &nbsp;&nbsp;&nbsp;&nbsp; print(i)
            next i
            // This will print the even numbers from 2 to 10 inclusive.
        </div>
    </div>

    <div class="row">
        <div></div>
        <div></div>
        <div>
            for i = 10 to 0 step -1
            &nbsp;&nbsp;&nbsp;&nbsp; print(i)
            next i
            // This will print the numbers from 10 to 0 inclusive, i.e. 10, 9, 8, ..., 2, 1, 0.

            // Note that the 'step' command can be used to increment or decrement the loop by any positive or negative integer value.
        </div>
    </div>


    <div class="row">
        <div>WHILE loop</div>
        <div>
            while ...
            endwhile
        </div>
        <div>
            while answer != "Correct"
            &nbsp;&nbsp;&nbsp;&nbsp; answer = input("New answer")
            endwhile
            // Will loop until the user inputs the string “Correct”. Check condition is carried out before entering loop.
        </div>
    </div>

    <div class="row">
        <div>DO UNTIL loop</div>
        <div>
            do
            until
        </div>
        <div>
            do
            &nbsp;&nbsp;&nbsp;&nbsp; answer = input("New answer")
            until answer == "Correct"
            // Will loop until the user inputs the string “Correct”. Loop iterates once before a check is carried out.
        </div>
    </div>

    <div class="title">Condition</div>

    <div class="row">
        <div>IF-THEN-ELSE</div>
        <div>
            if ... then
            elseif ... then
            else
            endif
        </div>
        <div>
            if answer == "Yes" then
            &nbsp;&nbsp;&nbsp;&nbsp; print("Correct")
            elseif answer == "No" then
            &nbsp;&nbsp;&nbsp;&nbsp; print("Wrong")
            else
            &nbsp;&nbsp;&nbsp;&nbsp; print("Error")
            endif
        </div>
    </div>

    <div class="row">
        <div>SWITCH</div>
        <div>
            switch … :
            &nbsp;&nbsp;&nbsp;&nbsp; case … :
            &nbsp;&nbsp;&nbsp;&nbsp; case … :
            &nbsp;&nbsp;&nbsp;&nbsp; default:
            endswitch
        </div>
        <div>
            switch day :
            &nbsp;&nbsp;&nbsp;&nbsp; case "Sat":
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; print("Saturday")
            &nbsp;&nbsp;&nbsp;&nbsp; case "Sun":
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; print("Sunday")
            default:
            &nbsp;&nbsp;&nbsp;&nbsp; print("Weekday")
            endswitch
        </div>
    </div>

    <div class="title">String handling</div>

    <div class="row">
        <div>String length</div>
        <div>.length</div>
        <div>
            subject = "ComputerScience"
            subject.length // returns the value 15
        </div>
    </div>

    <div class="row">
        <div>Substrings</div>
        <div>
            .substring(x , i)
            .left(i)
            .right(i)
        </div>
        <div>
            subject.substring(3,5) // returns "puter"
            subject.left(4) // returns "Comp"
            subject.right(3) // returns "nce"
        </div>
    </div>

    <div class="row">
        <div>Concatenation</div>
        <div>+</div>
        <div>
            name = "Tom"
            print("Your name is: " + name)
        </div>
    </div>

    <div class="row">
        <div>Uppercase</div>
        <div>.upper</div>
        <div>
            subject = "ComputerScience"
            subject.upper // returns "COMPUTERSCIENCE"
        </div>
    </div>

    <div class="row">
        <div>Lowercase</div>
        <div>.lower</div>
        <div>
            subject.lower // returns "computerscience"
        </div>
    </div>

    <div class="row">
        <div>ASCII Conversion</div>
        <div>ASC(...)</div>
        <div>ASC('C') // returns 65</div>
    </div>

    <div class="row">
        <div></div>
        <div>CHR(...)</div>
        <div>CHR(97) // returns 'a'</div>
    </div>


    <div class="title">File Handling</div>

    <div class="row">
        <div>Open</div>
        <div>open(...)</div>
        <div>
            myFile = open("sample.txt")
            // Note that the file needs to be stored as a variable.
        </div>
    </div>

    <div class="row">
        <div>Close</div>
        <div>.close()</div>
        <div>myFile.close()</div>
    </div>

    <div class="row">
        <div>Read line</div>
        <div>.readLine()</div>
        <div>myFile.readLine()</div>
    </div>

    <div class="row">
        <div>Write line</div>
        <div>.writeLine(...)</div>
        <div>
            myFile.writeLine("Add new line")
            // Note that the line will be written to the END of the file.
        </div>
    </div>

    <div class="row">
        <div>End of File</div>
        <div>.endOfFile()</div>
        <div>
            while NOT myFile.endOfFile()
            &nbsp;&nbsp;&nbsp;&nbsp; print(myFile.readLine())
            endwhile
        </div>
    </div>

    <div class="row">
        <div>Create a new file</div>
        <div>newFile(...)</div>
        <div>
            newFile("myText.txt")
            // Creates a new text file called "myText". The file would then need to be opened using the above command for Open.
        </div>
    </div>

    <div class="title">Arrays</div>

    <div class="row">
        <div>Declaration</div>
        <div>array colours[...]</div>
        <div>
            array colours[5]
            // Creates 1D array with 5 elements (index 0 to 4).

            array colours = ["Blue", "Pink", "Green", "Yellow", "Red"]
            // Arrays can be declared with values assigned.
        </div>
    </div>

    <div class="row">
        <div></div>
        <div>array gameboard[..., ...] = ...</div>
        <div>
            array gameboard[8,8]
            // Creates 2D array with 8 elements (index 0 to 7).
        </div>
    </div>

    <div class="row">
        <div>Assignment</div>
        <div>names[...] = ...</div>
        <div>names[3] = "Noni"</div>
    </div>

    <div class="row">
        <div></div>
        <div>gameboard[..., ...] = ...</div>
        <div>gameboard[1, 0] = "Pawn"</div>
    </div>

    <div class="title">Sub programs</div>

    <div class="row">
        <div>Procedure</div>
        <div>
            procedure name(...)
            endprocedure
        </div>
        <div>
            procedure multiply(num1, num2)
            &nbsp;&nbsp;&nbsp;&nbsp; print(num1 * num2)
            endprocedure
        </div>
    </div>

    <div class="row">
        <div>Calling a procedure</div>
        <div>procedure(parameters)</div>
        <div>multiply(5, 7)</div>
    </div>

    <div class="row">
        <div>Function</div>
        <div>
            function name(...)
            endfunction
        </div>
        <div>
            function squared(number)
            &nbsp;&nbsp;&nbsp;&nbsp; squared = number^2
            &nbsp;&nbsp;&nbsp;&nbsp; return squared
            endfunction
        </div>
    </div>

    <div class="row">
        <div>Calling a function</div>
        <div>function(parameters)</div>
        <div>
            squared(4)

            newValue = squared(4)
            // Function returns should be stored in a variable if needed for later use in a program.
        </div>
    </div>

    <div class="title">Random numbers</div>

    <div class="row">
        <div>Random numbers</div>
        <div>random(..., ...)</div>
        <div>
            myVariable = random(1,6)
            // Creates a random integer between 1 and 6 inclusive.
        </div>
    </div>
</main>

<style lang="scss">
    main {
        position: absolute;
        height: 100%;
        width: 100%;

        overflow-y: scroll;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        background: #282c34;

        padding: 10px;
        box-sizing: border-box;

        color: white;
        font-family: 'Albert Sans';
    }

    .title {
        background-color: grey;
        line-height: 1.5rem;
        padding-left: 0.25rem;
        box-sizing: border-box;
    }

    .row {
        display: flex;
        width: 100%;
    }

    .row > div {
        white-space: pre-line;
        word-break: break-word;
    }

    .row > div:nth-child(1), .row > div:nth-child(2) {
        width: 25%;
    }

    .row > div:nth-child(3) {
        width: 50%;
    }

    .row > div:nth-child(2), .row > div:nth-child(3) {
        font-family: 'Courier New', Courier, monospace;
    }
</style>
