class Todo {
  constructor() {

    let self = this;

    this.list = document.querySelector('.list-items');
    this.render();

    document.querySelector('.btn-add').addEventListener('click', this.insertTask.bind(this));
    document.querySelector('.btn-edit').addEventListener('click', this.updateTask.bind(this));

    document.addEventListener('click', event => {
      if (!event.target) {
        return;
      }

      if (event.target.classList.contains('btn-delete')) {
        self.removeTask(event);
      }

      if (event.target.classList.contains('btn-edit')) {
        self.updateTask(event);
      }
    });
  }

  render() {
    let items = JSON.parse(window.localStorage.getItem('items'));

    this.list.innerHTML = '';
    if (items) {
      items.forEach(item => {
        this.createDomElements(item.id);
        this.inputText.value = item.title;
        this.inputDate.value = item.date.toString();
        this.list.appendChild(this.li);
      });
    }
  }

  createDomElements(id) {
    this.li = document.createElement('li');
    this.inputText = document.createElement('input');
    this.inputText.setAttribute('disabled', '');
    this.inputText.setAttribute('maxlength', '50');
    this.inputText.setAttribute('type', 'text');

    this.inputDate = document.createElement('input');
    this.inputDate.setAttribute('disabled', '');
    this.inputDate.setAttribute('type', 'text');

    this.edit = document.createElement('button');
    this.delete = document.createElement('button');

    this.edit.classList.add('btn-edit');
    this.delete.classList.add('btn-delete');

    this.delete.setAttribute('data-id', id);
    this.edit.setAttribute('data-id', id);

    this.edit.innerHTML = 'Edit';
    this.delete.innerHTML = 'Delete';

    this.li.appendChild(this.inputText);
    this.li.appendChild(this.inputDate);
    this.li.appendChild(this.edit);
    this.li.appendChild(this.delete);

  }

  insertTask() {
    let items = JSON.parse(window.localStorage.getItem('items'));
    let todoTask = document.querySelector('.task').value;

    let newTask = {
      id: Date.now().toString(),
      title: todoTask,
      date: new Date()
    };

    items.unshift(newTask);
    window.localStorage.setItem('items', JSON.stringify(items));

    document.querySelector('.task').value = '';
    this.render();
  }

  removeTask(event) {
    let id = event.target.getAttribute('data-id');
    let items = JSON.parse(window.localStorage.getItem('items'));

    items = items.filter(item => {
      if (item.id !== id) {
        items.push(item);
        return item;
      }
    });

    window.localStorage.setItem('items', JSON.stringify(items));
    this.render();
  }

  updateTask(event) {
    let id = event.target.getAttribute('data-id');
    let itemTobeUpdated = document.querySelector('.edit-item').value;

    let items = JSON.parse(window.localStorage.getItem('items'));

    items = items.map(item => {
      if (item.id === id) {
        item['title'] = itemTobeUpdated;
      }

      return item;
    });

    window.localStorage.setItem('items', JSON.stringify(items));
    this.render();
  }
}
export default Todo;
