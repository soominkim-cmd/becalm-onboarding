// BeCalm 온보딩 · 메일 연결
// 메일 제공자를 하나 이상 고르면 "선택한 메일 연결하기"가 활성화됩니다.

const providers = Array.from(document.querySelectorAll(".provider"));
const connectBtn = document.getElementById("connect");
const skipBtn = document.getElementById("skip");
const toast = document.getElementById("toast");

let toastTimer;

function selected() {
  return providers.filter((p) => p.getAttribute("aria-pressed") === "true").map((p) => p.dataset.provider);
}

function render() {
  const names = selected();
  connectBtn.disabled = names.length === 0;
  connectBtn.setAttribute(
    "aria-label",
    names.length ? `선택한 메일 연결하기: ${names.join(", ")}` : "선택한 메일 연결하기",
  );
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

providers.forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", String(next));
    render();
  });
});

connectBtn.addEventListener("click", () => {
  const names = selected();
  if (!names.length) return;
  // 실제 서비스에서는 여기서 각 제공자의 OAuth 연결을 시작합니다.
  showToast(`${names.join(", ")} 연결을 시작합니다`);
});

skipBtn.addEventListener("click", () => {
  showToast("메일 연결은 설정에서 언제든 할 수 있어요");
});

render();
