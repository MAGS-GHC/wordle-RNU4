var box = document.getElementById("box");
var word_answer = ""
var current_row = 0;
var max_row = 6
var word_max = 5
console.log(box)
var word_map = {};
var word_keys = [];
var empty_char = " "
const file_path = "./assets/valid-wordle-words.txt";



async function get_data(){
fetch(file_path)
  .then(response => response.text())
  .then(file_content => {
    const lines = file_content.split('\n');

    for (var i = 0; i < lines.length; i++) {
        // Trim each line to remove leading and trailing whitespaces
        word_map[lines[i].trim()] = 1;
    }
    console.log(word_map);

    word_keys = Object.keys(word_map)
    console.log(word_keys)
    pick_word() //! PICK WORD
    
})
  .catch(error => console.error('Error fetching or reading file:', error.message));
}

get_data()



for (var i = 0; i< max_row; i++){
    for (var j = 0; j < word_max; j++){
    box.innerHTML+=`<p id = 'p${i}_${j}' class='word'>${empty_char}</p>` 
    }
    box.innerHTML+="<p class = 'spacer'></p>"

}

function pick_word(){
    word_answer = word_keys[Math.floor(Math.random() * word_keys.length)]
    console.log(word_answer)
}

function new_word(){

    //remove answers
    for (var i = 0; i< max_row; i++){
        for (var j = 0; j < word_max; j++){
            var element = document.getElementById(`p${i}_${j}`);
            element.textContent = empty_char
            element.style.backgroundColor = "white"
            element.style.color = "white"

        }
    
    }

    answer = document.getElementById("answer")
    answer.textContent = " "
    //new word
    current_row = 0;
    pick_word()
}

var input = document.getElementById("input");

// Add event listener for the "keydown" event
input.addEventListener('keydown', function (event) {
    // Check if the pressed key is Enter (keyCode 13)
    if (event.keyCode === 13) {
        set_answer();
    }
});

function loser(){
    answer = document.getElementById("answer")
    answer.textContent = " Right answer was "+word_answer
    current_row = max_row+1; // already lost so no more tries


}
function winner(){
    current_row = max_row+1; // already won so no more tries
    answer = document.getElementById("answer")
    answer.textContent = "You guessed correct!"
}

function set_answer(){

    if (current_row == max_row+1){return} // all tries used

    str = input.value
    //is 5 letters long
    console.log(str)
    //is real word? 
    if (!(str in word_map)){
        console.log("not real word\n")
        input.value = ""
        return
    }


    for(var i = 0; i< word_max; i++){
        var tex = document.getElementById(`p${current_row}_${i}`);
        tex.textContent = input.value[i];
    }
    
    check_answer()
    if (input.value == word_answer){
        winner()
    }else if (current_row == max_row){ // u lose
        loser()
    }
    input.value = ""
}

function check_answer(){
    for(var i = 0; i < word_max; i++){
        var element = document.getElementById(`p${current_row}_${i}`);
        if (element.textContent==word_answer[i]){ //green
            element.style.backgroundColor = "limegreen";
        }else if (word_answer.includes(element.textContent)){ //yellow
            element.style.backgroundColor = "sandybrown";
        }else {
            element.style.backgroundColor = "lightgray";
        }
        element.style.color = "black" // make char visible
    }
    
    current_row++;
}