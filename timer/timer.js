function fmt(t) {
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `${m}:${s}`;
}

document.getElementById("start").onclick = () => {
  const work = parseInt(document.getElementById("work").value) || 25;
  const rest = parseInt(document.getElementById("break").value) || 5;

  const screen = document.getElementById("screen");
  screen.textContent = `Starting: ${work} min work -> ${rest} min break\n\n`;

  let mode = "WORK";
  let time = work * 60;

  const timer = setInterval(() => {
    screen.textContent = `Mode: ${mode} | Time: ${fmt(time)}`;

    if (time-- <= 0) {
      if (mode === "WORK") {
        mode = "BREAK";
        time = rest * 60;
        screen.textContent += `\nWork done! Break time: ${rest} min\n`;
      } else {
        screen.textContent += "\nBreak finished! Done!";
        clearInterval(timer);
      }
    }
  }, 1000);
};
