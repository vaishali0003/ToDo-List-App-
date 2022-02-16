import React, { useState, useEffect } from 'react'


// to get the data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

function App() {
const [inputValue, setInputValue] = useState('');
const [items, setItems] = useState(getLocalItems());
const [toggle, setToggle] = useState(true);
const [editItemId, setEditItemId] = useState(null)

// code to add item in list
  const addItem = () => {
    if (inputValue && toggle) {
      const allInputValue={id:new Date().getTime().toString(),name:inputValue}
      setItems([...items,allInputValue]);
      setInputValue('');
    }
    else if(inputValue && !toggle){
      setItems(
        items.map((elem)=>{
          if(elem.id===editItemId){
            return {...elem,name:inputValue}
          }
          return elem;
        })
      )
       setToggle(true);
       setInputValue('');
       setEditItemId(null);
    }
    else{
      alert('You can not add an empty');
    }
  }


  // code to edit item
  const editItem=(id)=>{
    let newEditItem=items.find((elem)=>{
      return elem.id===id;
    })
    setToggle(false);
    setInputValue(newEditItem.name);
    setEditItemId(id);
  }

  // code to delete item
  const delItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return (index !== elem.id);
    })
    setItems(updatedItems);
  }

  // code to remove all items
  const removeAll = () => {
    setItems([]);
  }

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items])


  return (
    <>
      <div className="main">
        <div className="main1">
          <div className="main11">
            <h1 className="heading">ToDo List</h1>
            <div className="inputBar">
              <input type="text" placeholder='Add Items Here...' className='input' onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} />
            
              {
                (toggle==true)?(<button className="btn" onClick={addItem}><img src="images/add.png" alt="add" /></button>):
                (<button className="btn" onClick={addItem}><img src="images/update.png" alt="edit" /></button>)
              }
              
            </div>
            <div className="lists">
              {items.map((elem) => {
                return (<div className="listItem" key={elem.id}>
                  <h3 className="text1">{elem.name}</h3>
                  <button className="editBtn" onClick={() => editItem(elem.id)}><img src="images/edit1.png" alt="edit"/></button>
                  <button className="delBtn" onClick={() => delItem(elem.id)}><img src="images/delete.png" alt="delete"/></button>
                </div>)
              })
              }
            </div>
            <button className="removeBtn" onClick={removeAll}>Remove all</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


