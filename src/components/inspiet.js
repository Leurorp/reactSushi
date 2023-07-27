import { useState } from "react"
import axios from 'axios'
import '../App.css'
 
function InsPietanza({addPietanza}) {  
    const nuovaPietanza=()=>{
        const edCrd = document.querySelectorAll('.editCard')
        setProgress(prevState=>{return{...prevState, started:false}}) 
        setMsg(null)      
        const yu=document.querySelector('#pra')
        if (yu.style.width==="100%"){ 
            yu.style.fontSize="0%"; yu.style.width="0%"; yu.style.marginLeft="-1200px"; yu.style.maxHeight="0px"
            for (let i = 0; i < edCrd.length; i++) {edCrd[i].disabled = false}  return}
        yu.style.width="100%"; yu.style.marginLeft="0px"; yu.style.fontSize="18px"; yu.style.maxHeight="630px"
        for (let i = 0; i < edCrd.length; i++) {edCrd[i].disabled = true} 
        }
        const [contactInfo, setContactInfo] = useState({ nome: "",prezzo: "",})
        const [file, setFile] = useState(null)
        const [msg, setMsg] = useState(null)
        const [progress, setProgress] = useState({started:false, pc:0})
        const [image,setImg] = useState()

        const handleChange = (event) => {
            setContactInfo({ ...contactInfo, [event.target.name]: event.target.value })}
        const handleSubmit = (evento) => {
            evento.preventDefault() 
            if (!file) { setMsg('No file selected'); return } 
            if (file.type!=='image/jpeg'){setMsg("Can't uploading file that not image !"); return}    
            addPietanza(contactInfo,file)
            const fd = new FormData()
            fd.append('file',file) 
            setMsg('Uploading...')
            setProgress(prevState=>{return{...prevState, started:true}
            })
            axios.post('/upload',fd, {
                 onUploadProgress:progressEvent=>{ let percentComplete=progressEvent.loaded / progressEvent.total
                    setProgress(prevState => {return {...prevState,pc:percentComplete*100}})
                },
           
                })
            .then(res => { setMsg('Upload succesfully'); console.log(res.data) })
            .catch((err) => { setMsg('Upload failed'); console.error(err) })
            const yu=document.querySelector('#pra');const edCrd = document.querySelectorAll('.editCard')
            yu.style.fontSize="0%"; yu.style.width="0%"; yu.style.marginLeft="-1200px"; yu.style.maxHeight="0px"
            for (let i = 0; i < edCrd.length; i++) {edCrd[i].disabled = false}  
            }
return(
    <>  
    <button onClick={nuovaPietanza} id="insPiet" className="btn btn-primary" style={{margin:'10px'}}>
        Inserisci pietanza</button>
    <div id="pra" style={{fontSize:"0%",width:"0%",maxHeight:"0px",padding:"10px",
        marginLeft:"-1200PX", backgroundColor:"navy",color:"white",transition:"all 0.3s"}}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Enter name:
                    <input type="text" name="nome" value={contactInfo.nome || ""} className="form-control"
                            onChange={handleChange}/>
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Enter price:
                    <input type="number" name="prezzo" value={contactInfo.prezzo || ""} className="form-control"
                             onChange={handleChange}/>
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Insert immage
                    <input type="file" name="file" style={{fontSize:'16px'}} className="form-control" 
                    onChange={e => {
                        setFile(e.target.files[0])
                        if(e.target.files[0]) {
                        setImg(URL.createObjectURL(e.target.files[0]))}}} />
                    </label>
                </div>    
                    <input type="submit" />
                <img id="img" src={image} width={100} height={100} alt="" style={{margin:"0px 0px 0px 50px"}}/>                        
            </form>        
            { progress.started && <progress max="100" value={progress.pc} style={{marginTop:"15px",fontSize:"12px"}}></progress> }
            { msg && <span>{msg}</span> }
    </div>
    </>
     )}
export default InsPietanza
