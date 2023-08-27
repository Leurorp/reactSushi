import Navbar from './components/navbar'
import Card from './components/card'
import './App.css'
import InsPietanza from './components/inspiet'
import { useState,React } from 'react'
import {useForm} from 'react-hook-form'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

function App() 
{ let cards=[
  {id:0, nome:'chicken curry nodles', prezzo:2.99, immagine:'./immagini/chicken-curry-black-cup-with-rice-noodles.jpg', quantità:0},]
  
  const {register, handleSubmit, getValues, setValue}=useForm({
    mode:"onChange",defaultValues:{yourDetails:{id:"",nome:"",prezzo:"",foto:""}}})

  const reset=()=>{window.location.reload()}

  const [newPietanza, updatenewPietanza] = useState([])
  const [list, setList] = useState(cards)
  const [oldImg,setOldImg] = useState(cards[0].immagine)//è um path (./immagini/nome.jpg)
  let   [file, setFile] = useState()// varia in base alla scelta di una nuova foto o no
  const [msg, setMsg] = useState(null)
  const [imageNew,setImgNew] = useState()//è un oggetto (imageNew.name, imageNew.size)
  const [progress, setProgress] = useState({started:false, pc:0})
  
  const addPietanza = (contact,image) => {
    updatenewPietanza(contact); console.log(image.name)
    const newImg=`./immagini/${image.name}`
      let element={id:uuidv4(),nome:contact.nome,prezzo:contact.prezzo,immagine:newImg,quantità:0}
      const aggiornaCard=setTimeout(function(){
      setList(oldCards => [...oldCards,element])},1000)//aggiungi element a oldCards  
    }
    
  const handleDelete=(e)=>{    
    const cardDelete = list.filter(card => card.id===e)
    const imgDelete = cardDelete[0].immagine
    // elimino la foto dalla cartella immagini con nodejs
    fetch (`/delete`,{method:'POST',body:JSON.stringify({imgDelete:imgDelete}), headers:{'Content-Type':'application/json'}})
    .then(response=>response.json())
    .then((res) => {console.log(res) })
    .catch((err) => {console.error(err) }) 
    setList(delcards => delcards.filter(card => card.id !== e)) 
  }

  const handleIncrement=(e)=>{
    const cardInc = list.filter(card => card.id===e); console.log(cardInc[0])
    cardInc[0].quantità++
    document.getElementById(e).innerHTML=cardInc[0].quantità}
  
  function modify (e) {
    const edit=document.getElementById('edit')
    if (edit.className==='divOn'){
      edit.className='divOff' 
      document.getElementById('insPiet').disabled=false; return}
    edit.className='divOn'
    document.getElementById('insPiet').disabled=true
    setProgress(prevState=>{return{...prevState, started:false}})//cancello barra di upload 
    setMsg(null); setImgNew(null)  
    window.scroll({top:0})
    const cardEdit = list.filter(card => card.id===e)
    setOldImg(cardEdit[0].immagine)
    // porto i valori originali della pietanza nei campi input
    setValue("yourDetails",{id:e, nome:cardEdit[0].nome, prezzo:cardEdit[0].prezzo, foto:""}) }

// ---- MODIFICA PIETANZA ONSUBMIT ---------
  function handleData() {
    const idEdit=getValues("yourDetails.id"); const nomeEdit=getValues("yourDetails.nome")        
    const prezzoEdit=getValues("yourDetails.prezzo"); 
    if (file) {// se ho scelto una nuova immagine (file)
      if (file.type!=='image/jpeg'){setMsg("Can't uploading file that not image !"); return}
      const fd = new FormData(); fd.append('file',file)
      setMsg('Uploading...')
      setProgress(prevState=>{return{...prevState, started:true}})
      axios.post('/upload',fd, {
        onUploadProgress:progressEvent=>{ let percentComplete=progressEvent.loaded / progressEvent.total
          setProgress(prevState => {return {...prevState,pc:percentComplete*100}})
      },})
      .then(res => { setMsg('Upload succesfully'); console.log(res.data) })
      .catch((err) => { setMsg('Upload failed'); console.error(err) })}
    // se mantengo la vecchia immagine devo togliere da olfImg ./immagini/
    else {file={name:oldImg.substring(11)}}
    
    setTimeout (function() { 
      const index = list.findIndex(card => card.id===idEdit) // trovo l'indice INDEX dell'elemento da modificare
      const elementModify={id:idEdit,nome:nomeEdit,prezzo:prezzoEdit,immagine:`./immagini/${file.name}`,quantità:0}
      const newItem = [...list]; newItem[index] = elementModify
      setList(newItem) 
      const edit=document.querySelector('#edit')
      edit.className="divOff"  
      document.getElementById('insPiet').disabled=false},2000)
    }
  return (<> 
<Navbar />
<InsPietanza addPietanza={addPietanza} />
  <div className='container'>
    {/* FORM PER MODIFICARE UNA PIETANZA  */}
    <div id="edit" className='divOff' style={{transition:"all 0.3s"}}>     
        <form onSubmit={handleSubmit(handleData)}>
          <div className='mb-3'><button style={{float:'right',fontSize:'20px'}}
          onClick={()=>document.getElementById('edit').className="divOff"}>X</button>
            <label className='form-label'>Nome
            <input type="text" className='form-control' {...register("yourDetails.nome")} />
            </label>
          </div>
          <div className='mb-3'>
            <label className='form-label'>prezzo
            <input type="text" className='form-control' {...register("yourDetails.prezzo")} />
            </label>
          </div>
          <div className='mb-3'>
            <input type="file" name="file" className='form-control' {...register("yourDetails.foto")}  
            style={{width:'65%'}} onChange={e => {
            if (e.target.files[0]){
              setFile(e.target.files[0])//nuova foto
              setImgNew(URL.createObjectURL(e.target.files[0]))
              }
            }} />
          </div>  
           <input className='btn btn-success' type="submit" />
          { progress.started && <progress max="100" value={progress.pc}></progress> }
          { msg && <span>{msg}</span> } 
          <span style={{position:'absolute',margin:'-15px 0px 0px 10px'}}>
            { oldImg && <img src={require(`${oldImg}`)} width={100} height={100} alt=""  /> }
          </span>
          <span style={{position:'absolute',margin:'-15px 0px 0px 10px'}}>
            { imageNew && <img src={imageNew} width={100} height={100} alt="" /> }
          </span>
        </form>   
    </div>
      <h1>Cosa desideri ordinare?</h1><hr />
      <div className='row container-fluid'>
        {list.map(card=>(    
          <div key={card.id} className="card" style={{width:'18rem', textAlign:'center'}}>
            <button onClick={()=>handleIncrement(card.id)} className='btn btn-primary'>
              Aggiungi<span id={card.id} className='badge badge-light'>{card.quantità}</span></button>
            <img src={require (`${card.immagine}`)} className="card-img-top" alt="" style={{maxHeight:'10rem'}}  />
              <div className="card-body">
                <h5 className='card-title'>{card.nome}</h5>
                <p className="card-text">€{card.prezzo}</p>
                <Card reset={reset} />
                <button onClick={()=>handleDelete(card.id)} className='btn btn-outline-danger'>Elimina</button>
                <button onClick={()=>modify(card.id)}  className='btn btn-outline-secondary editCard'>Edit</button>
              </div>
          </div>  ))}
      </div>     
  </div> </>) }
  export default App