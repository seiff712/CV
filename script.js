// =======================
// Canvas
// =======================
const music = document.getElementById("bgMusic");
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
const nextBtn = document.getElementById("nextBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// =======================
// Stars
// =======================

let stars = [];

for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        s: Math.random() * 1 + 0.2
    });
}

let zoom = 1;

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.fillStyle = "white";

    stars.forEach(star => {

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.s;

        if (star.y > canvas.height) {

            star.y = 0;
            star.x = Math.random() * canvas.width;

        }

    });

    ctx.restore();

    requestAnimationFrame(animate);

}

animate();

// =======================
// Cursor
// =======================

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

document.addEventListener("touchmove", (e) => {

    cursor.style.left = e.touches[0].clientX + "px";
    cursor.style.top = e.touches[0].clientY + "px";

});

// =======================
// Elements
// =======================

const loading = document.getElementById("loading");
const intro = document.getElementById("intro");
const typing = document.getElementById("typing");

const heartScene = document.getElementById("heartScene");
const bigHeart = document.getElementById("bigHeart");
const photoContainer=document.getElementById("photoContainer");

const photoList=[

"photos/1.jpg",
"photos/2.jpg",
"photos/3.jpg",
"photos/4.jpg",
"photos/5.jpg",
"photos/5.jpg",
"photos/6.jpg",
"photos/7.jpg",
"photos/8.jpg",
"photos/9.jpg",
"photos/10.jpg",
"photos/11.jpg",
"photos/12.jpg",
"photos/13.jpg",
"photos/14.jpg",
"photos/15.jpg"

];

// =======================
// Messages
// =======================

const messages = [

    "FY YOUM KDA...",

    "FY BANOTA SO8NNA MARA W7DA ALETLY...",

    "MMKN A2OLK 7AGA BS MTFHMNISH SA7!!!!",

    "W MN SA3ETHA W ANA F A7LA CHAPTER F 7YATY KOLHAAA...",

    "W EL MOZA ELSO8NNA DY...",

    "❤️ BASKOTY ❤️"

];

let currentMessage = 0;

// =======================
// Type Writer
// =======================

function typeWriter(text, callback) {

    typing.innerHTML = "";

    let index = 0;

    function write() {

        if (index < text.length) {

            typing.innerHTML += text.charAt(index);

            index++;

            setTimeout(write, 80);

        } else {

            setTimeout(callback, 1500);

        }

    }

    write();

}

// =======================
// Messages Sequence
// =======================

function showMessages() {

    if (currentMessage >= messages.length) {

        setTimeout(showHeartScene, 1000);

        return;

    }

    typeWriter(messages[currentMessage], () => {

        currentMessage++;

        showMessages();

    });

}

// =======================
// Heart Scene
// =======================

function showHeartScene() {

    intro.style.opacity = "0";

    heartScene.style.visibility = "visible";
    heartScene.style.opacity = "1";

    setTimeout(() => {

        bigHeart.style.transform = "scale(1)";
        bigHeart.classList.add("beat");

    }, 300);

    setTimeout(() => {

    bigHeart.classList.remove("beat");
    bigHeart.classList.add("explode");

    setTimeout(explodePhotos,1000);

    setTimeout(() => {

    formHeart();

    beatHeart();

    }, 8000);

    },3000);

}

// =======================
// Start Movie
// =======================

let started = false;

function startMovie() {

    if (started) return;

    started = true;

    music.volume = 0.5;

    music.play().catch(err => {
        console.log("Music blocked:", err);
    });

    loading.style.opacity = "0";

    setTimeout(() => {

        loading.style.display = "none";

    }, 1000);

    intro.style.opacity = "1";

    const zoomAnimation = setInterval(() => {

        zoom += 0.002;

        if (zoom >= 1.25) {

            clearInterval(zoomAnimation);

        }

    }, 16);

    setTimeout(showMessages, 1000);

}

document.addEventListener("click", startMovie);
document.addEventListener("keydown", startMovie);
document.addEventListener("touchstart", startMovie);

// =======================
// Gallery
// =======================

const photos = document.querySelectorAll(".photo");

function showGallery() {

    heartScene.style.display = "none";

    let delay = 0;

    photos.forEach((photo, index) => {

        setTimeout(() => {

            photo.style.opacity = "1";

            photo.style.left = (Math.random() * 70 + 10) + "%";
            photo.style.top = (Math.random() * 70 + 10) + "%";

            photo.style.transform =
                "scale(1) rotate(" +
                (Math.random() * 40 - 20) +
                "deg)";

        }, delay);

        delay += 700;

    });

}

function explodePhotos(){

    heartScene.style.display="none";

    photoList.forEach((src,index)=>{

        setTimeout(()=>{

            const img=document.createElement("img");

            img.src=src;

            img.className="memory";

            img.style.left="50%";
            img.style.top="50%";

            photoContainer.appendChild(img);

            requestAnimationFrame(() => {

    const x = 8 + Math.random() * 84;
    const y = 8 + Math.random() * 84;
    const rotate = Math.random() * 80 - 40;
    const scale = 1.3 + Math.random() * 0.6;

    img.style.opacity = "1";
    img.style.left = x + "%";
    img.style.top = y + "%";

    img.style.transform = `
    translate(-50%,-50%)
    scale(${scale})
    rotate(${rotate}deg)
    `;
    img.style.transform = `
        translate(-50%,-50%)
        scale(${scale})
        rotate(${rotate}deg)
    `;

            });

        },index*450);

    });

}

function getHeartPoints(total){

    const points = [];

    for(let i = 0; i < total; i++){

        const t = (Math.PI * 2 * i) / total;

        let x = 16 * Math.pow(Math.sin(t),3);
        let y =
            13 * Math.cos(t)
            -5 * Math.cos(2*t)
            -2 * Math.cos(3*t)
            -Math.cos(4*t);

        const scale = window.innerWidth < 768 ? 2.2 : 2.8;

        points.push({
            x: 50 + x * scale,
            y: 50 - y * scale
        });

    }

    return points;

}

function formHeart() {

    const images = document.querySelectorAll(".memory");
    const heartPoints = getHeartPoints(images.length);

    images.forEach((img, index) => {

        const point = heartPoints[index % heartPoints.length];

        setTimeout(() => {

            img.style.left = point.x + "%";
            img.style.top = point.y + "%";

            img.style.transform = `
                translate(-50%,-50%)
                scale(.95)
                rotate(0deg)
            `;

        }, index * 180);

        setTimeout(() => {

    photoContainer.animate([
        {filter:"brightness(1)"},
        {filter:"brightness(2.4)"},
        {filter:"brightness(1)"}
    ],{
        duration:600
    });

}, images.length * 180);


    });

}

let heartBeatStarted = false;

function beatHeart() {

    if (heartBeatStarted) return;
    heartBeatStarted = true;

    const images = document.querySelectorAll(".memory");

    let scale = 1;
    let up = true;

    setInterval(() => {

        if (up) {
            scale += 0.02;
            if (scale >= 1.08) up = false;
        } else {
            scale -= 0.02;
            if (scale <= 1) up = true;
        }

        images.forEach(img => {
            img.style.transform =
                `translate(-50%,-50%) scale(${scale})`;
        });

    }, 40);

    setTimeout(() => {

    showMemoryScene();

    }, 6000);

}

const memoryScene = document.getElementById("memoryScene");

const newPhotos = [];

for (let i = 16; i <= 30; i++) {
    newPhotos.push(`${i}.jpg`);
}

function showMemoryScene(){

    photoContainer.style.display="none";

    const finalText = document.getElementById("finalText");

    if(finalText){
    finalText.style.display = "none";
    }
    

    memoryScene.style.display="flex";

    const w = window.innerWidth;

    let positions;

    if(w<768){

        positions=[

            [8,10],[82,10],

            [8,35],[82,35],

            [8,60],[82,60],

            [30,85],[70,85]

        ];

    }else if(w<1200){

        positions=[

            [8,8],[28,8],[72,8],[92,8],

            [8,40],[92,40],

            [8,72],[28,72],[72,72],[92,72]

        ];

    }else{

        positions=[

            [5,8],[20,8],[80,8],[95,8],

            [5,30],[95,30],

            [5,50],[95,50],

            [5,72],[20,72],[80,72],[95,72]

        ];

    }

    positions.forEach((p,i)=>{

        const img=document.createElement("img");

        img.src=newPhotos[i%newPhotos.length];

        img.className="sidePhoto";

        img.style.left=p[0]+"%";

        img.style.top=p[1]+"%";

        img.style.animationDelay=(i*.15)+"s";

        memoryScene.appendChild(img);

    });

}

nextBtn.addEventListener("click", () => {

    document.body.style.transition = "1s";
    document.body.style.opacity = "0";

    setTimeout(() => {

        nextBtn.addEventListener("click", () => {

    nextBtn.style.display = "none";

    memoryScene.style.opacity = "0";

    setTimeout(() => {

        memoryScene.style.display = "none";

        startFireworks();   // هنكتب الدالة دى بعد كده

    },1000);

});

    }, 1000);

});
