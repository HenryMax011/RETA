const { execSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || "3000";
const root = path.resolve(__dirname, "..");

function pidsOnPort(port) {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return [
      ...new Set(
        out
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line.includes("LISTENING"))
          .map((line) => line.split(/\s+/).pop())
          .filter((pid) => pid && /^\d+$/.test(pid) && pid !== "0"),
      ),
    ];
  } catch {
    return [];
  }
}

function killPids(pids) {
  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /T /F`, { stdio: "inherit" });
      console.log(`Encerrado processo antigo (PID ${pid}).`);
    } catch {
      // already gone
    }
  }
}

function clearNextLock() {
  const lockPath = path.join(root, ".next", "dev", "lock");
  try {
    if (fs.existsSync(lockPath)) {
      fs.unlinkSync(lockPath);
      console.log("Lock do Next.js removido.");
    }
  } catch {
    // ignore
  }
}

const existing = pidsOnPort(PORT);
if (existing.length) {
  console.log(`Porta ${PORT} ocupada — liberando...`);
  killPids(existing);
}

clearNextLock();

const nextBin = path.join(
  root,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const child = spawn(process.execPath, [nextBin, "dev", "-p", PORT], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
