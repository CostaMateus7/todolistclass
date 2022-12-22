import React from 'react';
import { BsPen } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default class List extends React.Component{
  static propTypes = {
    handleCheckTodo: PropTypes.func.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    list: PropTypes.instanceOf(Array).isRequired,
  };
  
  render(){
    const { handleCheckTodo, handleDeleteTodo, handleUpdate, list } = this.props
    return(
      <ul>
        {list?.map((item, index) => (
  
          <li key={item.id}>
            <div>
              <input
                type="checkbox"
                onClick={() => handleCheckTodo(index)}
                defaultChecked={item.isComplete === true ? 'checked' : ''}
              />
  
              <span>{item.isComplete === false ? item.title : <s>{item.title}</s>}</span>
            </div>
            <div>
              <BsPen onClick={() => handleUpdate(index)} />
              <AiOutlineDelete onClick={() => handleDeleteTodo(index)} />
            </div>
          </li>
  
        ))}
      </ul>
    );
  }
}
