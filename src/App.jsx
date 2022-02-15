import React, { useState, useEffect } from 'react'


// to get the data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  // console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(getLocalItems());


  const addItem = () => {
    if (inputValue != '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  }

  const delItem = (id) => {
    const updatedItems = items.filter((elem, index) => {
      return (index !== id);
    })
    setItems(updatedItems);
  }

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
              <button className="btn" onClick={addItem}><img src="images/add.png" alt="add" /></button>
            </div>
            <div className="lists">
              {items.map((elem, index) => {

                return (<div className="listItem" key={index}>
                  <h3 className="text1">{elem}</h3>
                  <button className="editBtn"><img src="images/edit.png" alt="edit" /></button>
                  <button className="delBtn" onClick={() => delItem(index)}><img src="images/remove.png" alt="delete" /></button>
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


