import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = ({toys, handleLike, handleDonate}) => {
  return(
    <div id="toy-collection">
      {toys.map(toy => {
        return <ToyCard key={toy.id} toy={toy} handleLike={handleLike} handleDonate={handleDonate} />
      })}
    </div>
  );
}

export default ToyContainer;
