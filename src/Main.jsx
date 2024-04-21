import React, { useEffect, useState } from 'react'
import style from './main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot} from '@fortawesome/free-solid-svg-icons';

export default function Main() {
    
    const [cityName, setCityName]=useState('')
    const [result, setResult]=useState(null)
    const [error, setErorr]=useState({message:null, isErorr:false})

    const handleSearchChange = (e) =>{
        setCityName(e.target.value)
    }

    // useEffect(()=>{
    //     fetch(`http://api.weatherapi.com/v1/current.json?key=3916068b024648a7867200548242104&q=${cityName}&aqi=no`)
    //     .then(x=>x.json())
    //     .then(x=>setResult(x))
    // })

    const handleButtonClick= async ()=>{
        try {
            const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=3916068b024648a7867200548242104&q=${cityName}&aqi=no`)

            if (!res.ok) throw Error

            const data = await res.json()
            setErorr({isErorr:false, message:null})
            setResult(data)

        } catch (error) {
            setErorr({isErorr:true, message:'Error!'})
            setResult(null)
        }
        
    }

  return (
    <>
    <div className={style.container}>
        <div className={style.src_container}>
            <FontAwesomeIcon icon={faLocationDot} size='2xl' />
            <input onChange={handleSearchChange} type="search" name="" id="" className={style.src} placeholder='Search City' />
            <button onClick={handleButtonClick} className={style.src_btn}> <FontAwesomeIcon icon={faMagnifyingGlass}  size="2xl" style={{color: "#ffffff",}} /> </button>
        </div>
        {/* <h1>City: {result && result.location && result.location.name}</h1>
        <h3>Temperature: {result && result.current && result.current.temp_c}</h3> */}
        { error.isErorr ? <div>{error.message}</div> : (result == null ? <div>No result yet</div> : <div>
        <h1>City: {result && result.location && result.location.name}</h1>
        <h3>Temperature: {result && result.current && result.current.temp_c}</h3>
        </div> ) }
        

    </div>
    </>
  )
}
