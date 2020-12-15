import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => this.setState({toys}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = toy => {
    this.handleClick()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(toy => this.setState({ toys: [...this.state.toys, toy]}))
  }

  handleLike = toy => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
        likes: toy.likes + 1
      }),
		})
			.then(res => res.json())
			.then(updatedToy => {
        let newToys = this.state.toys.map(toy => toy.id === updatedToy.id ? updatedToy : toy)
        this.setState({ toys: newToys})
      });
  }

  handleDonate = donatedToy => {
    let toys = this.state.toys.filter(toy => toy.id !== donatedToy.id)
    this.setState({toys}) // the variable for the value matches the key in state
    fetch(`http://localhost:3000/toys/${donatedToy.id}`, {
			method: 'DELETE',
		})
  }

  render(){
    return (
			<>
				<Header />
				{this.state.display ? <ToyForm addToy={this.addToy} /> : null}
				<div className='buttonContainer'>
					<button onClick={this.handleClick}> Add a Toy </button>
				</div>
				<ToyContainer toys={this.state.toys} handleLike={this.handleLike} handleDonate={this.handleDonate} />
			</>
		);
  }

}

export default App;
