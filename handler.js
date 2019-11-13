


var memoryCards = [
    {
        hiddenImg: "image/emojiChock.jpg",
        key: 0
    }, {
        hiddenImg: "image/emojiGhost.jpg",
        key: 1
    }, {
        hiddenImg: "image/emojiKiss.jpg",
        key: 2
    }, {
        hiddenImg: "image/emojiLove.jpg",
        key: 3
    }, {
        hiddenImg: "image/emojiNinja.jpg",
        key: 4
    }, {
        hiddenImg: "image/emojiTrick.jpg",
        key: 5
    }
]

function initSite() {
    printGameboard()
}

function printGameboard() {
    var container = document.createElement("div")
    container.classList = "container"

    var cardList = []

    for (i = 0; i < memoryCards.length; i++) {
        cardList.push(createCard(memoryCards[i]))
        cardList.push(createCard(memoryCards[i]))
    }

    cardList = shuffle(cardList)

    for (i = 0; i < cardList.length; i++) {
        container.appendChild(cardList[i])
    }

    document.body.appendChild(container)
}

function createCard(cardData) {
    var card = document.createElement("div")
    card.classList = "flexItem"
    card.innerText = cardData.key
    card.addEventListener("click", showImage)

    function showImage() {
        var image = document.createElement("img")
        image.classList = "image"
        image.src = cardData.hiddenImg
        console.log(image.src)
        card.appendChild(image)
    }
    return card

}

function shuffle(cardList) {
    return cardList.sort(() => Math.random() - 0.5);
}

/* function setTime() {
    setTimeout(createCard(cardData), 3000)
} */

function hiddenImg() {

}