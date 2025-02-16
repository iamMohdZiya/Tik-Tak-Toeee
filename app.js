const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
const newbtn = document.querySelector("#newbtn");
const msgcontainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
let turnO = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("tapped");
        box.disabled = false;
    });
    msgcontainer.classList.add("hide");
};

const showWinner = (winner) => {
    msg.innerText = `🎉 ${winner} Wins!`;
    msgcontainer.classList.remove("hide");
    boxes.forEach((box) => (box.disabled = true));
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            showWinner(boxes[a].innerText);
            return true;
        }
    }
    return false;
};

const gameDraw = () => {
    msg.innerText = "It's a Draw! 🤝";
    msgcontainer.classList.remove("hide");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        box.innerText = turnO ? "O" : "X";
        box.classList.add("tapped");
        box.disabled = true;
        count++;
        if (checkWinner()) return;
        if (count === 9) gameDraw();
        turnO = !turnO;
    });
});

reset.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);
