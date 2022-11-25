
document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    const titleEl = event.target.closest("li").children[0]
    console.log('divTitle',titleEl)
    const title = prompt("New name note", titleEl.innerHTML);
    if (title) {
      editTitle({ id, title }).then(() => {
        titleEl.innerHTML = title;
      });
    }
  }

})

async function editTitle (node) {
  await fetch(`/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(node),
  });
}

async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}
