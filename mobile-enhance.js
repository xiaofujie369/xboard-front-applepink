(function () {
  console.log("可云 mobile-enhance.js loaded");

  // 等待 React 渲染完成
  function waitForPlans() {
    const cards = document.querySelectorAll(".ant-card-body, .n-card__content");
    if (cards.length === 0) {
      requestAnimationFrame(waitForPlans);
      return;
    }
    enhancePlans(cards);
  }

  function enhancePlans(cards) {
    cards.forEach((card) => {
      // 跳过已经处理的卡片
      if (card.dataset.enhanced === "1") return;

      // 只处理含有“服务说明 / 套餐详情”标题的卡片
      const title = card.innerText;
      if (!/套餐详情|服务说明|流量|限速/.test(title)) return;

      const lines = Array.from(card.querySelectorAll("li, p, div"));
      if (lines.length < 5) return;

      // 自动折叠区域
      const collapseBox = document.createElement("div");
      collapseBox.style.maxHeight = "120px";
      collapseBox.style.overflow = "hidden";
      collapseBox.style.transition = "max-height 0.25s ease";
      collapseBox.className = "ky-collapse-box";

      // 把原内容放进折叠区
      const wrapper = document.createElement("div");
      lines.forEach((l) => wrapper.appendChild(l.cloneNode(true)));
      collapseBox.appendChild(wrapper);

      // 清空卡片内容
      lines.forEach((l) => l.remove());
      card.prepend(collapseBox);

      // “展开 / 收起” 按钮
      const btn = document.createElement("div");
      btn.innerText = "展开详情 ▼";
      btn.style.marginTop = "8px";
      btn.style.color = "#FF68A0";
      btn.style.fontSize = "14px";
      btn.style.fontWeight = "500";
      btn.style.cursor = "pointer";
      btn.style.userSelect = "none";
      btn.style.textAlign = "center";

      let expanded = false;
      btn.onclick = () => {
        expanded = !expanded;
        if (expanded) {
          collapseBox.style.maxHeight = wrapper.scrollHeight + "px";
          btn.innerText = "收起详情 ▲";
        } else {
          collapseBox.style.maxHeight = "120px";
          btn.innerText = "展开详情 ▼";
        }
      };

      card.appendChild(btn);
      card.dataset.enhanced = "1";
    });
  }

  waitForPlans();
})();
