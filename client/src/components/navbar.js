import { useState } from "react"
import '../App.css'

function Navbar(props) {
    const [toastSearch,setToastSearch] = useState() 
    const [price,setPrice] = useState("")
    const [idToast,setidToast] = useState("")
    const [name, setName] = useState("")
    const toasts=[]
    props.message.forEach(toast=>{ toasts.push(toast.nome) })
    //chiamo la funzione autocomplete facendo entrare l'elemento HTML con id=myInput
    //e l'array formato dai nome dei prodotti in props.message proveniente dal parent App.js
    const autocomplete=(toasts)=> {     
        if(name===""){return false}
        const inp=document.getElementById("myInput")
        //se il campo input del search è cliccato      
        inp.addEventListener("input", function(){
            let a, b, i; let val = this.value//corrispone a onkeyDown nel campo input
            closeAllLists()
            a = document.createElement("DIV")//Div contenente la lista dei prodotti contenuti nel cerca
            a.setAttribute("id", this.id + "autocomplete-list")//attribuisci un id al Div creato (myInputautocomplete-list)
            a.classList.add('autocomplete-items') 
            this.parentNode.appendChild(a)     
            for (i = 0; i < toasts.length; i++) {
                /*controlla se l'elemento inizia con le stesse lettere del valore del campo di testo*/
                if (toasts[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {                 
                    /*creare un elemento DIV per ogni elemento corrispondente*/
                    b = document.createElement("DIV")
                     /*rendi in grassetto la prima lettera delle parole dell'elenco*/
                    b.innerHTML = "<strong>" + toasts[i].substr(0, val.length) + "</strong>"
                    b.innerHTML += toasts[i].substr(val.length)/*stampa il resto della parola*/
                    /*inserisci un campo di input che conterrà il valore dell'elemento dell'array corrente*/
                    b.innerHTML += "<input type='hidden' value='" + toasts[i] + "'>"
                    /*eseguire una funzione quando qualcuno fa clic sul valore dell'articolo (elemento DIV)*/
                    b.addEventListener("click", function() {
                        /*inserisci il valore per il campo di testo di completamento automatico*/
                        setName(this.getElementsByTagName("input")[0].value)
                        // submit sull'elemento cliccato
                        document.getElementById('subm').addEventListener('click',()=>{                    
                            setToastSearch(this.getElementsByTagName("input")[0].value)                         
                            props.message.forEach(element => {
                            if (element.nome===`${this.getElementsByTagName("input")[0].value}`) 
                                {setPrice(element.prezzo); setidToast(element.id)}
                            }) })
                    closeAllLists()
                    })
                a.appendChild(b) } 
            }
        })
        function closeAllLists(elmnt) {
            /*chiudi tutti gli elenchi di completamento automatico nel documento,
            tranne quello passato come argomento*/
            let x = document.getElementsByClassName("autocomplete-items")
            for (let i = 0; i < x.length; i++) {
              if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]) }}}

        /*execute a function when someone clicks in the body*/
        document.addEventListener("click", function (e) {
        closeAllLists(e.target)})
    }
    function aggiungi (idToast) {
        const list=props.message
        const cardInc = list.filter(card => card.id===idToast)
        cardInc[0].quantità++
        document.getElementById(idToast).innerHTML=cardInc[0].quantità
    }
    autocomplete(toasts)
    return(<>
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <span className="navbar-brand mb-0 h1">Fullstack sushi </span>          
                <div className="d-flex" role="search">
                <div className="autocomplete">
                    <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search"
                    id="myInput" value={name} onChange={(e) => {
                        setName(e.target.value)}} />
                </div>
                <input className="btn btn-outline-success" type="submit" id="subm" />
                </div>
        </div>
    </nav>
    {toastSearch && 
    <div className="text-center" style={{margin:'20px'}}>
        <div onClick={()=>aggiungi(idToast)} style={{padding:'15px',display:'inline',
        cursor:'pointer',backgroundColor:'yellow'}}>
            <b> {"aggiungi "+toastSearch+" "+price+"€"}</b>
        </div> &nbsp;&nbsp;
        <button className="secondary" onClick={()=>{setToastSearch("") }}>X
        </button>     
    </div>}</>   
    )
}
export default Navbar