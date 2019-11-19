


var memoryCards = [
    {
        hiddenImg: "./image/emojiChock.jpg",
        key: 0
    }, {
        hiddenImg: "./image/emojiGhost.jpg",
        key: 1
    }, {
        hiddenImg: "./image/emojiKiss.jpg",
        key: 2
    }, {
        hiddenImg: "./image/emojiLove.jpg",
        key: 3
    }, {
        hiddenImg: "./image/emojiNinja.jpg",
        key: 4
    }, {
        hiddenImg: "./image/emojiTrick.jpg",
        key: 5
    }
]

var flippedCard
var waitngForTimeout = false
var winCounter = 0

function initSite() {
    printGameboard()
}

function printGameboard() {
    var container = document.createElement("div")
    container.classList = "container"

    var idCounter = 0
    var cardList = []

    for (i = 0; i < memoryCards.length; i++) {
        cardList.push(createCard(memoryCards[i], idCounter))
        idCounter++
        cardList.push(createCard(memoryCards[i], idCounter))
        idCounter++
    }

    cardList = shuffle(cardList)

    for (i = 0; i < cardList.length; i++) {
        container.appendChild(cardList[i])
    }

    document.body.appendChild(container)
}

function createCard(cardData, idCounter) {
    var card = document.createElement("div")
    card.classList = "flexItem"
    card.data = cardData
    card.id = idCounter

    card.onclick = (event) => {

        if(waitngForTimeout) {
            console.log("Waiting...")
            return
        } 

        var card = event.srcElement

        if (flippedCard && card.id == flippedCard.id) {
            console.log("Samma kort tryckt igen")
            return
        }

        flipCard(card)

        if (flippedCard) {
            console.log("Det finns ett vänt kort sedan innan")
            if (flippedCard.data.key == card.data.key) {
                //match finns. Ta bort onclick ifrån card och flippedCard
                card.onclick = ""
                flippedCard.onclick = ""
                flippedCard = undefined
                winCounter = winCounter + 1
                console.log("MATCH", winCounter)

            } else {
                console.log("INGEN MATCH")

                waitngForTimeout = true
                setTimeout(() => {
                    flipBackCard(card)
                    flipBackCard(flippedCard)
                    flippedCard = undefined
                    waitngForTimeout = false
                }, 2000);
                // Ingen match. Vänd tillbaka flippedCard och card efter 2 sek
            }
        } else {
            console.log("Fösta kortet har vänts")
            // Vänd card
            flippedCard = card
        }

        if (winCounter == 6) {
            var winnerContainer = document.createElement("div")
            winnerContainer.classList = "winnerContainer"
            
            var winnerText = document.createElement("h1")
            winnerText.innerText = "CONGRATULATIONS!"
            winnerText.classList = "h1"
            
            var winnerTextOne = document.createElement("h3")
            winnerTextOne.innerText = "You Wan!"
            winnerTextOne.classList = "h3"
            
            var startButton = document.createElement("button")
            startButton.innerText = "Start Game"
            startButton.classList = "button"
            startButton.onclick = function() {
                winCounter = 0
                initSite()
                
            }

            console.log(winCounter)
            winnerContainer.appendChild(startButton)
            winnerContainer.appendChild(winnerTextOne)
            winnerContainer.appendChild(winnerText)
            document.body.appendChild(winnerContainer)
        }
        
    }
    
    return card
}

function flipCard(card) {
    card.style.background = "url(" + card.data.hiddenImg + ")"
    card.style.backgroundSize = "cover"
    card.style.backgroundPosition = "center"
}

function flipBackCard(card) {
    card.style.background = ""
    card.style.backgroundColor = "./image/backgroundImage.jpg"
}

function shuffle(cardList) {
    return cardList.sort(() => Math.random() - 0.5);
}

