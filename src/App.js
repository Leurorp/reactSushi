import Navbar from './components/navbar'
import Card from './components/card'
import './App.css';
import React,{ Component } from 'react'
import chicken_curry from './immagini/chicken-curry-black-cup-with-rice-noodles.jpg'
import tasty from './immagini/flat-lay-tasty-food-on-table-arrangement.jpg'
import spring_rolls from './immagini/fried-spring-rolls-cutting-board.jpg'
import ravioli from './immagini/ravioli.jpg'
import pho from './immagini/pho_vietnamita.jpg'
import pollo from './immagini/pollo_alle_mandorle.jpg'

class App extends Component
{ state={cards:[
  {id:0, nome:'chicken curry nodles', prezzo:1.99, immagine:chicken_curry, quantità:0},
  {id:1, nome:'tasty', prezzo:3.99, immagine:tasty, quantità:0},
  {id:2, nome:'spring_rolls', prezzo:4.50, immagine:spring_rolls, quantità:0},
  {id:3, nome:'ravioli', prezzo:3.50, immagine:ravioli, quantità:0},
  {id:4, nome:'pho', prezzo:5.99, immagine:pho, quantità:0},
  {id:5, nome:'pollo', prezzo:4.60, immagine:pollo, quantità:0}
  ]}
  handleDelete=cardId=>{
    const cards=this.state.cards.filter(card=>card.id!==cardId)
    this.setState({cards})}
  handleIncrement=card=>{
    const cards=[...this.state.cards]
    const id=cards.indexOf(card)
    cards[id]={...card}
    cards[id].quantità++
    this.setState({cards})
  }
  render() {
  return (
    <>
  <Navbar />
  <div className='container-fluid'>
      <h1>Cosa desideri ordinare?</h1>
      <hr />
    <div className='row'> 
       {/* MAP cicla un array chiamando una funzione per ogni elemento dell'array.*/}
      {this.state.cards.map(card=>(
        <Card
          key={card.id}
          onDelete={this.handleDelete}
          onIncrement={this.handleIncrement}
          card={card} />
      ))}  
    </div>
  </div>
    </>) }}
  export default App;