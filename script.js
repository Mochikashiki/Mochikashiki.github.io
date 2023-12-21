const emojis = ["💰","💰","✨","✨","🍟","🍟","🥐","🥐","🍨","🍨","🍉","🍉","🍄","🍄","🧇","🧇"]

var shuf_emojis = emojis.sort(() => (Math.random() > .5) ? 2 : -1)

const reset = document.querySelector(".reset")
const rgb = document.querySelector(".rgb")
const settings = document.querySelector(".settings")
const settingsContainer = document.querySelector(".settingContainer")
const tries = document.querySelector("#tries")
const flipSound = document.querySelector("#flipSound")
const shineSound = document.querySelector("#shineSound")
const whooshSound = document.querySelector("#whooshSound")
const streaksText = document.querySelector("#streaks")

let rgbEnabled = false
let settingsEnabled = false
let triesLeft = 10
let clickCooldown = true
let streaks = 0

localStorage.setItem("localStreaks",streaks.toString())

streaksText.textContent = `Streaks : ${localStorage.getItem("localStreaks")}`

reset.addEventListener("mouseenter", () =>{
    reset.style.width = "125px"
    reset.style.height = "55px"
    reset.style.background = "rgb(255, 255, 255)"
    reset.style.color = "rgb(77, 125, 180)"
})

reset.addEventListener("mouseleave", () =>{
    reset.style.width = "100px"
    reset.style.height = "50px"
    reset.style.background = "rgb(200, 200, 200)"
    reset.style.color = "rgb(39, 65, 92)"
})

for (var i = 0 ; i < emojis.length; i++){
    let box = document.createElement("div")
    box.className = "item"
    box.innerHTML = shuf_emojis[i]
    box.style.borderRadius = "5px"
    document.querySelector(".game").appendChild(box)

    box.classList.add("boxOpen")

    setTimeout(() => {
        box.classList.remove("boxOpen")
        clickCooldown = false
    }, 1250);

    box.onclick = function(){
        if (triesLeft > 0 && clickCooldown == false){
            clickCooldown = true
            box.classList.add("boxOpen")
        flipSound.play()
        setTimeout(() => {
            if (document.querySelectorAll(".boxOpen").length > 1){
                if(document.querySelectorAll(".boxOpen")[0].innerHTML ==
                document.querySelectorAll(".boxOpen")[1].innerHTML){
                    document.querySelectorAll(".boxOpen")[0].classList.add("boxMatch")
                    document.querySelectorAll(".boxOpen")[1].classList.add("boxMatch")

                    shineSound.play()

                    document.querySelectorAll(".boxOpen")[1].classList.remove("boxOpen")
                    document.querySelectorAll(".boxOpen")[0].classList.remove("boxOpen")
                    if(document.querySelectorAll(".boxMatch").length == emojis.length){
                        alert("You Won!")
                        streaks ++
                        localStorage.setItem("localStreaks",streaks.toString())
                    }
                }else{
                        whooshSound.play()
                        triesLeft -= 1
                        setTimeout(() => {
                            document.querySelectorAll(".boxOpen")[1].classList.remove("boxOpen")
                            document.querySelectorAll(".boxOpen")[0].classList.remove("boxOpen")
                        }, 25);
                    }
                }
                clickCooldown = false
        }, 250);
        } else if (triesLeft < 1) {
            streaks = 0
            alert("You lost.")
        }
    }

}

setInterval(() => {
    if (rgbEnabled == false ){
        const r1 = Math.floor(Math.random() * 255)
        const r2 = Math.floor(Math.random() * 255)
        const r3 = Math.floor(Math.random() * 255)
        rgb.style.background = `rgb(${r1},${r2},${r3})`
    } else if(rgbEnabled == true){
        const container = document.querySelector(".container")
        const title = document.querySelector(".title")
        const r1 = Math.floor(Math.random() * 255)
        const r2 = Math.floor(Math.random() * 255)
        const r3 = Math.floor(Math.random() * 255)
        container.style.borderColor = `rgb(${r1},${r2},${r3})`
        title.style.color = `rgb(${r1},${r2},${r3})`
        container.style.boxShadow = `0 0 20px 20px rgba(${r1},${r2},${r3}, 0.2)`
        streaksText.style.color = `rgb(${r1},${r2},${r3})`
        tries.style.color = `rgb(${r1},${r2},${r3})`
    }
},1000)

setInterval(() => {
    tries.textContent = `Tries : ${triesLeft}`
    streaksText.textContent = `Streaks : ${localStorage.getItem("localStreaks")}`
}, 100);


rgb.addEventListener("click", () => {
    if (rgbEnabled == false){
        rgbEnabled = true
        rgb.style.background = `rgb(255,255,255)`
        document.body.style.background = "rgb(22, 22, 22)"
    } else {
        const container = document.querySelector(".container")
        const title = document.querySelector(".title")
        container.style.borderColor = `rgb(35, 59, 85)`
        title.style.color = `rgb(245, 245, 245)`
        rgb.style.background = "rbg(255,255,255)"
        tries.style.color = "rgb(91, 154, 226)"
        document.body.style.background = "rgb(39, 65, 92)"
        container.style.boxShadow = `0 0 20px 20px rgba(0,0,0, 0.1)`
        streaksText.style.color = `rgb(91, 154, 226)`
        rgbEnabled = false
    }
})
