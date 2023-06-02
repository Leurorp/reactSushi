// import chicken_curry from '../immagini/chicken-curry-black-cup-with-rice-noodles.jpg'
import React,{ Component } from 'react'

class card extends Component {
    render() {
    return(
        <div className="col">
            <div className="card" style={{width:'28rem', textAlign:'center'}}>
            <button onClick={()=>this.props.onIncrement(this.props.card)} className='btn btn-primary'>
                Aggiungi<span className='badge text-bg-light'>{this.props.card.quantità}</span></button>
{/* props sono i dati passati da un componente padre e ricevuti dal componente figlio */}
{/* this è un prefisso che identifica l'istanza del componente card */}
            <img src={this.props.card.immagine} className="card-img-top"  />
                <div className="card-body">
                    <h5 className='card-title'>{this.props.card.nome}</h5>
                    <p className="card-text">€{this.props.card.prezzo}</p>
                    <button onClick={()=>this.props.onDelete(this.props.card.id)} className='btn btn-outline-danger'>Elimina</button>
             </div>
            </div>
        </div>
    )
}}
export default card