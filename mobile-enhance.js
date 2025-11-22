(function () {
  console.log("可云 墨绿小清新增强 loaded");

  function waitForPlans() {
    const cards = document.querySelectorAll(".ant-card-body, .n-card__content");
    if (cards.length === 0) {
      requestAnimationFrame(waitForPlans);
      return;
    }
    enhance(cards);
  }

  function enhance(cards) {
    cards.forEach((card) => {
      if (card.dataset.enhanced === "1") return;

      const blocks = Array.from(card.querySelectorAll("li, p, div"));
      if (blocks.length < 4) return;

      const wrapper = document.createElement("div");
      wrapper.className = "ky-green-collapse-wrapper";

      const inner = document.createElement("div");
      inner.className = "ky-green-inner";

      blocks.forEach((b) => inner.appendChild(b.cloneNode(true)));
      wrapper.appendChild(inner);

      blocks.forEach((b) => b.remove());
      card.prepend(wrapper);

      const btn = document.createElement("div");
      btn.className = "ky-green-btn";
      btn.innerText = "展开详情 ▼";

      let expanded = false;

      btn.onclick = () => {
        expanded = !expanded;
        wrapper.classList.toggle("open");
        btn.innerText = expanded ? "收起详情 ▲" : "展开详情 ▼";
      };

      card.appendChild(btn);
      card.dataset.enhanced = "1";
    });
  }

  waitForPlans();
})();
