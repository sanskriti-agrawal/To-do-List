import React,{useState, useEffect} from "react";
import './style.css';

const getLocalData=()=>{
    const lists = localStorage.getItem("myTodolist");

    if(lists){
        return JSON.parse(lists); 
    }
    else{
        return [];
    }
};
const Todo = () =>{

    const [data, setData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [edit, setEdit] = useState("");
    const [button, setButton] = useState(false);

    // add the item

    const addItem = () =>{
        if(!data){
            alert('please fill the data');
        }
        else if(data && button){
            setItems( items.map((ele) => {
                if(ele.id===edit){
                    return {...ele , name:data};
                }
                return ele;
            }));

            setData("");
            setEdit();
            setButton(false);
        }

        else{
            const myNewItems = {
                id:new Date().getTime().toString(),
                name:data,
            };
            setItems([...items, myNewItems]);
            setData("");
        }  
    }

    // delete item

    const deleteItem = (idprove)=>{
        const updatedItem = items.filter((currentele) =>{
            return currentele.id != idprove;
        })
        setItems(updatedItem);
    };



    // remove element

    const removeAll = () =>{
        setItems([]);
    }

    // adding local storage

    useEffect(() => {
        localStorage.setItem("myTodolist", JSON.stringify(items));
    }, [items]);

    // edit items

    const editItem = (item) =>{
        const item_todo_edited = items.find((ele) =>{
            return ele.id === item;
        });
        setData(item_todo_edited.name);
        setEdit(item);
        setButton(true);
    };

    return(
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg"></img>
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" 
                        placeholder="✍ Add Item" 
                        className="form-control" 
                        value={data}
                        onChange={(e)=> setData(e.target.value)}
                        /> 
                        {button ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ):( <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                        
                    </div>

                    {/* show our items */}

                    <div className="showItems">
                        {
                            items.map((element, index) =>{
                                return(
                                    <div className="eachItem" key={element.id}>
                                        <h3>{element.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add btn" onClick={()=> editItem(element.id)}></i>
                                            <i className="far fa-trash-alt add btn" onClick={() => deleteItem(element.id)}></i>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All"
                        onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todo;