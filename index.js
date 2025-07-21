        let allProducts = [];

        async function loadProducts() {
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();
            allProducts = data.products;
            renderProducts(allProducts);
        }

        function renderProducts(products) {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            products.forEach(product => {
                const starRating = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
                const card = document.createElement('div');
                card.className = 'product-card';

                card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}" />
          <div class="product-info">
            <h3>${product.title}</h3>
            <p>${product.description.substring(0, 60)}...</p>
            <div class="price-rating">
              <div class="price">$${product.price}</div>
              <div class="rating">${starRating}</div>
            </div>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        `;

                productList.appendChild(card);
            });
        }

        document.getElementById('searchInput').addEventListener('input', function (e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = allProducts.filter(p =>
                p.title.toLowerCase().includes(keyword) ||
                p.description.toLowerCase().includes(keyword)
            );
            renderProducts(filtered);
        });

        function toggleMenu() {
            const nav = document.getElementById("nav-links");
            nav.classList.toggle("active");
        }

        loadProducts();