var box = document.getElementById("box");
var input = document.getElementById("input");
var answer = document.getElementById("answer")
var word_answer = ""
const empty_char = " "
const max_row = 6
const word_max = 5
var current_row = 0;
var word_map = {};
var word_keys = [];
const file_path = "./assets/valid-wordle-words.txt";

async function get_data(){
fetch(file_path)
.then(response => response.text())
.then(file_content => {
    const lines = file_content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        word_map[lines[i].trim()] = 1;
    }
    word_keys = Object.keys(word_map)
    new_word() // pick first word
}).catch(error => console.error('Error fetching or reading file:', error.message));
}get_data();

for (let i = 0; i< max_row; i++){
    for (let j = 0; j < word_max; j++){
        box.innerHTML+=`<p id = 'p${i}_${j}' class='word'>${empty_char}</p>` 
    }
    box.innerHTML+="<p class = 'spacer'></p>"
}

function new_word(){ //remove answers
    for (let i = 0; i < max_row; i++){
        for (let j = 0; j < word_max; j++){
            let element = document.getElementById(`p${i}_${j}`);
            element.textContent = empty_char
            element.style.backgroundColor = "white"
            element.style.color = "white"
        }
    }
    current_row = 0; //reset row
    answer.textContent = empty_char
    word_answer = word_keys[Math.floor(Math.random() * word_keys.length)]
    console.log("Answer : "+word_answer)
}

input.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) { // check enter key
        if (current_row != max_row && answer.textContent == empty_char)set_answer() //still tries left
        input.value = ""
    }
});

function inform_user(str){
    answer.textContent = str
    //current_row = max_row+1; // already lost so no more tries
}

function set_answer(){
    //is real word? 
    if (!(input.value in word_map)){
        console.log("not real word\n")
        return
    }

    for(let i = 0; i< word_max; i++){ //place answer into boxes
        document.getElementById(`p${current_row}_${i}`).textContent = input.value[i];
    }
    
    color_answer();current_row++; //color it and go to next row

    if (input.value == word_answer){
        inform_user("You guessed correct!")
    }else if (current_row == max_row){ // you lose
        inform_user("Right answer was "+word_answer)
    }
}

function color_answer(){
    for(let i = 0; i < word_max; i++){
        let element = document.getElementById(`p${current_row}_${i}`);
        if (element.textContent==word_answer[i]){ //green (letter is right position)
            element.style.backgroundColor = "limegreen";
        }else if (word_answer.includes(element.textContent)){ //yellow (contains letter)
            element.style.backgroundColor = "sandybrown";
        }else {
            element.style.backgroundColor = "lightgray"; //does not contain letter
        }
        element.style.color = "black" // make char visible
    }
}