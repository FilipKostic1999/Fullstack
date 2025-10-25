fetch("https://fullstack-khad.onrender.com/items")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("list");
    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.name;
      list.appendChild(li);
    });
  });
