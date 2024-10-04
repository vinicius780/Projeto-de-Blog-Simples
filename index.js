// https://jsonplaceholder.typicode.com/posts
async function readPosts() {
  let postArea = document.querySelector(".posts");
  postArea.innerHTML = "carregando...";

  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let json = await response.json();

  if (json.length > 0) {
    postArea.innerHTML = "";
    for (let i in json) {
      let newDiv = document.createElement("div");
      let newP = document.createElement("p");
      let newH1 = document.createElement("h1");
      let newHr = document.createElement("hr");

      newH1.innerHTML = json[i].title;
      newP.innerHTML = json[i].body;

      newDiv.appendChild(newH1);
      newDiv.appendChild(newHr);
      newDiv.appendChild(newP);
      postArea.appendChild(newDiv);
    }
  } else {
    postArea.innerHTML = "nenhum post para exibir";
  }
}
readPosts();

// função para adicionar um novo poster 

async function addNewPost(title, body) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title, // title = "title"
      body, // body = body
      userId: 2,
    }),
  });
  document.querySelector("#titleField").value = "";
  document.querySelector("#bodyField").value = "";

  readPosts();
}

document.querySelector("#insertButton").addEventListener("click", () => {
  let title = document.querySelector("#titleField").value;
  let body = document.querySelector("#bodyField").value;

  if (title && body) {
    addNewPost(title, body);
  } else {
    alert("Preencha todos os campos");
  }
});
