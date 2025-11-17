const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(q) {
  return new Promise(res => rl.question(q, ans => res(ans)));
}

function format(t) {
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `${m}:${s}`;
}

async function main() {
  const work = parseInt(await ask("Work minutes: "));
  const rest = parseInt(await ask("Break minutes: "));

  rl.close();

  let mode = "WORK";
  let time = work * 60;

  console.log(`\nStarting: ${work} min work -> ${rest} min break\n`);

  const timer = setInterval(() => {
    process.stdout.write(`\r[${mode}] ${format(time)} `);

    if (time-- <= 0) {
      process.stdout.write("\x07"); // bell sound

      if (mode === "WORK") {
        mode = "BREAK";
        time = rest * 60;
        console.log(`\nWork done! Break time: ${rest} min\n`);
      } else {
        console.log("\nBreak done! Finished.\n");
        clearInterval(timer);
      }
    }
  }, 1000);
}

main();
