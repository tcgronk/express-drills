import React from 'react';
import './list.css';
import Card from './card.js'

function List(props){
    return (
    <div className="App-list">
    <section className="List">
      <header className="List-header">
        <h2>{props.header}</h2>
        </header>
        <div className='List-cards'>
        {props.cards.map((card) =>
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
            onClickDelete={props.onClickDelete}
          />
        )}
        
        <button
          type='button'
          className='List-add-button'
          onClick={() => props.onClickAdd(props.id)}
        >
          + Add Random Card
        </button>
      </div>
    </section>
  </div>
  );
}
List.defaultProps = {
  onClickAdd: () => {},
}
export default List;

