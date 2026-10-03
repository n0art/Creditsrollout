const credits = document.getElementById("credits");

const SCROLL_SPEED = 50; // Change this number to adjust speed

let position;
let lastTime = performance.now();


// Load names from the text file
fetch("names.txt")
    .then(response => response.text())
    .then(text => {

        const names = text
            .split(/\r?\n/)
            .map(name => name.trim())
            .filter(name => name !== "");

        names.forEach(name => {
            const element = document.createElement("div");

            element.classList.add("credit");
            element.textContent = name;

            credits.appendChild(element);
        });

        position = window.innerHeight;

        animate();
    })
    .catch(error => {
        console.error("Could not load names.txt:", error);
    });


function animate(currentTime = performance.now()) {

    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    position -= SCROLL_SPEED * (deltaTime / 1000);

    credits.style.transform = `translateY(${position}px)`;

    // Restart when all names have disappeared
    if (position < -credits.offsetHeight) {
        position = window.innerHeight;
    }

    requestAnimationFrame(animate);
}