
// Anup Aglawe ©2020

let textEditor = document.querySelector('.text-container');
let preview = document.querySelector('.preview');
let popup = document.querySelector('.popup');

const button = document.querySelector('#emoji-button');
const picker = new EmojiButton();
const nightMode = document.querySelector('#checkbox');
const topBar = document.querySelector(".top-bar");
const pre = document.getElementsByTagName("pre");

var converter = new showdown.Converter();
const storage = window.localStorage;
let curr_position;
let rangeElement;




// showdown config
converter.setOption('tables', 'true');
converter.setOption('tablesHeaderId', 'true');
converter.setOption('strikethrough', 'true');
converter.setOption('simplifiedAutoLink', 'true');
converter.setOption('tasklists', 'true');
converter.setOption('smoothLivePreview', 'true');


const storedMarkdown = storage.getItem('data');
const table_content = "<br>|Col 1 |  Col 2|<br>|--|--|<br>| row 1, 1 |row 1, 2|<br>| row 2, 1 |row 2, 2|<br>"
const strike_content = "~~Strikethrough Text~~";
const head_content = "<br>## Heading 1";
const code_content = "<br>```<br>// python 3.6 🐍<br>msg = 'Hello world !'<br>print(msg)<br>```"
head_regex = /([#]+)(\s*.*).*(?<!<\/span><br>)$/gm;


// Local Storage load
if (storedMarkdown) {
    textEditor.innerHTML = storedMarkdown;
}

// onInit

value_init = convert(textEditor);
renderPreview(value_init);

// preview function
function renderPreview(value) {
    html = converter.makeHtml(value);
    preview.innerHTML = html;
}

textEditor.addEventListener("keyup", (evt) => {
    saveCaret();
    value = convert(textEditor);

    if (evt.which == 13) {
        style_text();
    }
    renderPreview(value);
});


// Night Mode
nightMode.addEventListener("click", (evt) => {
    if (nightMode.checked) {
        textEditor.classList.add("dark");
        topBar.classList.add("dark");
        preview.classList.add("dark-preview");

        for (var i = 0; i < pre.length; i++) {
            if (pre[i].classList.length === 0) {
                pre[i].classList.add("dark-code");
            }
        }

        popup.classList.add("dark-popup");

    } else {
        textEditor.classList.remove("dark");
        topBar.classList.remove("dark");
        preview.classList.remove("dark-preview");

        for (var i = 0; i < pre.length; i++) {
            if (pre[i].classList.length != 0) {
                pre[i].classList.remove("dark-code");
            }
        }

        popup.classList.remove("dark-popup");
    }
});

// Emoji Picker

textEditor.addEventListener('click', () => {
    saveCaret();
})

window.addEventListener('DOMContentLoaded', () => {
    picker.on('emoji', emoji => {
        // insertTextAtCaret(emoji);
        insertAtCaret(range, emoji);
        value = convert(textEditor);
        renderPreview(value);
    });
    button.addEventListener('click', () => {
        picker.togglePicker(button);
    });
});


// top Buttons

function addStyle(ele) {
    const current_id = ele.id;
    const curr_value = textEditor.innerHTML;

    if (current_id == 'bold') {
        textEditor.innerHTML = curr_value + "**Bold Text**";
    }
    else if (current_id == 'italic') {
        textEditor.innerHTML = curr_value + "*Italic Text*";
    }

    else if (current_id == 'heading') {
        textEditor.innerHTML = curr_value + head_content;
    }

    else if (current_id == 'strike') {
        textEditor.innerHTML = curr_value + strike_content;
    }

    else if (current_id == 'list') {
        textEditor.innerHTML = curr_value + "<br> - List Item";
    }
    else if (current_id == 'hor-line') {
        textEditor.innerHTML = curr_value + "<br> ---";
    }
    else if (current_id == 'table') {
        textEditor.innerHTML = curr_value + table_content;
    }
    else if (current_id == 'code') {
        textEditor.innerHTML = curr_value + code_content;
    }
    value = convert(textEditor)
    renderPreview(value);

    // TODO:Add More functions
}


// Text Linting



