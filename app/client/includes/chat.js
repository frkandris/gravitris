function saySomething(something) {
    const theDiv = document.getElementById("chat-area");
    theDiv.innerHTML += something + "<br/>";
}

module.exports = {
    saySomething
};