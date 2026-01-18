const menu = [
  {
    id: "trufas",
    title: "Trufas",
    icon: "🍬",
    items: [
      {
        id: "trufa-maracuja",
        name: "Trufa de Maracujá",
        description: "Recheio cremoso de maracujá com cobertura intensa de chocolate.",
        price: 6.0,
        image:
          "https://i.pinimg.com/736x/f9/18/be/f918bee6d82d0cc6ac595cdd03a6144c.jpg",
      },
      {
        id: "trufa-pacoca",
        name: "Trufa de Paçoca",
        description: "Paçoca artesanal com toque de doce de leite e cacau.",
        price: 7.0,
        image:
          "https://i.pinimg.com/1200x/c4/9b/63/c49b6354c811efd2d8b9da440e05e37a.jpg",
      },
      {
        id: "trufa-ninho-nutella",
        name: "Trufa de Ninho com Nutella",
        description: "Avelã cremosa e leite ninho em uma combinação irresistível.",
        price: 8.0,
        image:
          "https://i.pinimg.com/736x/70/a0/33/70a03324b83094f715bb7dffc56ba516.jpg",
    ],
  },
  {
    id: "bolo-pote",
    title: "Bolo de Pote",
    icon: "🍰",
    items: [
      {
        id: "bolo-chocolate",
        name: "Bolo de Pote de Chocolate",
        description: "Camadas de chocolate intenso com creme super aveludado.",
        price: 12.0,
        image:
          "https://i.pinimg.com/736x/dd/0f/b8/dd0fb8c01f8765409e7073b67ba545de.jpg",
      },
      {
        id: "bolo-pacoca",
        name: "Bolo de Pote de Paçoca",
        description: "Bolo fofinho com creme de paçoca e crocante final.",
        price: 12.0,
        image:
          "https://i.pinimg.com/736x/27/bd/9d/27bd9d0492f67dc2d6dce14e549b2099.jpg",
      },
      {
        id: "bolo-maracujá",
        name: "Bolo de Pote de Maracujá",
        description: "Chocolate com creme leve Maracujá.",
        price: 14.0,
        image:
          "https://i.pinimg.com/736x/40/63/60/40636098bede6ab143ddf92e5121d6f2.jpg",
      },
    ],
  },
  {
    id: "combos",
    title: "Combos",
    icon: "🎁",
    items: [
      {
        id: "combo-bolo-trufa",
        name: "Combo: Bolo de Pote + Trufa",
        description: "Escolha 1 bolo de pote e 1 trufa. Informe os sabores no pedido.",
        price: 16.0,
        image:
          "https://images.unsplash.com/photo-1514516870926-20554f7bf3e0?auto=format&fit=crop&q=80&w=480&h=360",
      },
    ],
  },
];

let carrinho = {};

function init() {
  renderMenu();
  atualizarCarrinhoVisual();
}

function renderMenu() {
  const menuContainer = document.getElementById("menu-container");
  const navContainer = document.getElementById("category-nav");

  menu.forEach((categoria) => {
    const navButton = document.createElement("button");
    navButton.className = "nav-btn";
    navButton.innerHTML = `${categoria.icon} ${categoria.title}`;
    navButton.onclick = () =>
      document.getElementById(categoria.id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    navContainer.appendChild(navButton);

    const section = document.createElement("section");
    section.id = categoria.id;
    section.className = "categoria-section";
    section.innerHTML = `
      <div class="categoria-heading">
        <h2 class="categoria-titulo">${categoria.icon} ${categoria.title}</h2>
        <span class="categoria-pill">Sabores frescos do dia</span>
      </div>
      <div class="produtos-grid">
        ${categoria.items
          .map(
            (item) => `
            <article class="produto-card" data-product="${item.id}">
              <div class="produto-media">
                <img src="${item.image}" alt="${item.name}" class="produto-img">
              </div>
              <div class="produto-info">
                <div>
                  <h3>${item.name}</h3>
                  <p class="descricao">${item.description}</p>
                </div>
                <div class="preco-actions">
                  <span class="preco">R$ ${item.price
                    .toFixed(2)
                    .replace(".", ",")}</span>
                  <div class="controles">
                    <button aria-label="Remover" onclick="alterarQtd('${item.id}', '${item.name}', ${item.price}, -1)">-</button>
                    <span id="qtd-${item.id}" class="qtd-display">0</span>
                    <button aria-label="Adicionar" onclick="alterarQtd('${item.id}', '${item.name}', ${item.price}, 1)">+</button>
                  </div>
                </div>
              </div>
            </article>
          `
          )
          .join("")}
      </div>
    `;
    menuContainer.appendChild(section);
  });
}

function alterarQtd(id, nome, preco, delta) {
  if (!carrinho[id]) {
    carrinho[id] = { qtd: 0, preco: preco, nome: nome };
  }

  carrinho[id].qtd += delta;
  if (carrinho[id].qtd < 0) carrinho[id].qtd = 0;

  const displayEl = document.getElementById(`qtd-${id}`);
  if (displayEl) displayEl.textContent = carrinho[id].qtd;

  atualizarCarrinhoVisual();
}

function atualizarCarrinhoVisual() {
  const cartItemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-valor");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalFloatEl = document.getElementById("cart-total-float");
  const floatingCart = document.getElementById("floating-cart");

  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;

  Object.keys(carrinho).forEach((id) => {
    if (carrinho[id].qtd > 0) {
      const subtotal = carrinho[id].qtd * carrinho[id].preco;
      total += subtotal;
      count += carrinho[id].qtd;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <div class="cart-item-info">
          <strong>${carrinho[id].nome}</strong>
          <span>${carrinho[id].qtd}x R$ ${carrinho[id].preco
            .toFixed(2)
            .replace(".", ",")}</span>
        </div>
        <div class="cart-item-total">
          R$ ${subtotal.toFixed(2).replace(".", ",")}
        </div>
      `;
      cartItemsEl.appendChild(itemEl);
    }
  });

  if (count === 0) {
    cartItemsEl.innerHTML =
      '<p class="empty-msg">Seu carrinho está vazio 😢</p>';
    floatingCart.classList.remove("visible");
  } else {
    floatingCart.classList.add("visible");
  }

  totalEl.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  cartCountEl.textContent = count;
  cartTotalFloatEl.textContent = `R$ ${total
    .toFixed(2)
    .replace(".", ",")}`;
}

function checkout() {
  let total = 0;
  let mensagem = "*NOVO PEDIDO - DOCE LAGOM*\n\n";
  let itens = 0;

  Object.keys(carrinho).forEach((id) => {
    if (carrinho[id].qtd > 0) {
      const subtotal = carrinho[id].qtd * carrinho[id].preco;
      total += subtotal;
      itens++;
      mensagem += `• ${carrinho[id].qtd}x ${carrinho[id].nome}\n   (R$ ${subtotal
        .toFixed(2)
        .replace(".", ",")})\n`;
    }
  });

  if (itens === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  mensagem += `\n*Total: R$ ${total.toFixed(2).replace(".", ",")}*`;
  mensagem +=
    "\n\n*Dados do cliente:*" +
    "\nNome:" +
    "\nApartamento:" +
    "\nBloco:" +
    "\nForma de pagamento:";
  mensagem +=
    "\n\n*Endereço de entrega:* \n(Por favor, digite seu endereço aqui)";

  const numeroWhatsApp = "5583993889854";
  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}

document.addEventListener("DOMContentLoaded", init);
