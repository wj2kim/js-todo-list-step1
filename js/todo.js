const $list = document.querySelector('#todo-list');
const $newTodoTitle  = document.querySelector('#new-todo-title');
let id = 1;

/**
 * 투두 저장소
 */
const Todos = () => {
    let todos = [
        { id: 1, title: "투두리스트 만들기", done: false},
    ];

    return {
        selectAll(){
            return [...todos];
        },
        deleteAll(){
            return todos = [];
        },
        insertOne(todo = {}){
            console.log(!!todo)

            if(todo){
                todos.push(todo);
                return true;
            } 
            return false;
        },
        deleteOne(id = ''){
            if(id){
                const index = todos.findIndex(todo => todo.id === id);
                (index > -1) && todos.splice(index, 1);
                return true;
            }
            return false;
        },
        updateOne(){
            
        },
        selectCount(){
            return todos.length;
        }
    }
}

const todosStore = Todos(); 

const addEvents = () => {
    const $toggle = document.querySelectorAll('.toggle');
    $toggle.forEach(toggle => toggle.addEventListener('click', e => {
        console.log("e.target checked : ", e.target.checked);
        const checked  = e.target.checked;
        if(checked){
            toggle.parentNode.parentNode.classList.add('completed');
            toggle.setAttribute('checked', "");
        }else{
            toggle.parentNode.parentNode.classList.remove('completed');
            toggle.removeAttribute('checked');
        }
    }))

  

    const destroyTodoItem = (id) => {
       console.log("delete id", id)
        
    }

    return {
        destroyTodoItem: destroyTodoItem
    }
}



/**
 * 투두 추가 함수
 * @param {*} todo 
 */
const addTodo = (todo = {}) => {
    if(!todo){
        return;
    }

    const todoInHTML = `<li id=${todo.id} class="todoItem">
                            <div class="view">
                                <input class="toggle" type="checkbox"/>
                                <label class="lable">${todo.title}</label>
                                <button class="destroy" onclick="addEvents().destroyTodoItem(${todo.id})"></button>
                            </div>
                            <input class="edit" value=${todo.title} />
                        </li>`

    $list.insertAdjacentHTML('beforeend', todoInHTML);
    addEvents();
}


/**
 * 투두 리스트 페이지 첫 진입 시 
 */
const init = () => {
    // todo : 로컬스토리지에서 저장된 데이터 가지고 오는 로직 
   
    const initTodoList = () => {
        const todos = todosStore.selectAll();
        todos.map(todo => addTodo(todo));
    }

    initTodoList();
}

init();

// eventlist 추가 함수

const validateTitle = (title = "") => {
    if(!title){
        return false;
    }

    const blank_pattern = /^\s+|\s+$/g;

    return title.replace(blank_pattern, "").length > 0 ? true :  false;
}


/**
 * 투두 추가 이벤트 리스너
 */
$newTodoTitle.addEventListener('keyup', e => {
    // keyCode 가 deprecated?
    if(e.code === 'Enter'){
        const title = e.target.value;
        const isValidate = validateTitle(title);
        if(isValidate){
            const todo = {
                id: id += 1,
                title: e.target.value,
                done: false,
            }
            todosStore.insertOne(todo) && addTodo(todo);
        }
        $newTodoTitle.value = "";
       
    }
})











