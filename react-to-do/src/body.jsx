import { useState } from "react";
import './body.css'

export let BodyContent = () => {

  const [text, setText] = useState("");
  const [lst, setLst] = useState([]);
  const [strike, setStrike] = useState(false)
  const [pulsesw, setPulsesw] = useState(false)

  let incr = 1;

  let updatetext = (event) => {
    setText(event.target.value);
  }

  let updatelst = () => {
    if (text !== "") {
      let temp = {
        id : incr,
        task : text
      }
  
      let templst = [...lst, temp];
      setLst(templst);
    }

    let inp = document.getElementById('inputele')
    inp.value = ""

  }

  let deletetxt = (taskname) => {
    let temp = lst.filter((iterator) => {
      if (iterator.id === taskname.id) {
        return false;
      } else {
        return true;
      }
    })
    setLst(temp);
    setPulsesw(false)
  }

  let pushup = (taskname) => {
    let index = lst.indexOf(taskname);
    let templst = [...lst]
    if (index !== 0) {
      let temp = templst[index];
      templst[index] = templst[index-1]
      templst[index-1] = temp
    }

    setLst(templst)
  }

  let pushdown = (taskname) => {
    let index = lst.indexOf(taskname)
    let templst = [...lst]
    if (index !== (lst.length-1)) {
      let temp = templst[index];
      templst[index] = templst[index+1]
      templst[index+1] = temp
    }


    setLst(templst)
  }

  let complete = () => {
    setStrike(!strike);
  }

  let checkbox = (taskname) => {
    if (strike) {
       
    }
  }

  let pulser = () => {
    setPulsesw(!pulsesw)
  }

  let enterkey = (event) => {
    if (event.key === 'Enter') {
      updatelst()
    }
  }

  return (
    <div className="flex justify-center">

      <div >

        <div className=' flex flex-col md:flex-row items-center justify-center mt-10'>


          <input onKeyDown={enterkey} onChange={updatetext} id="inputele" placeholder="Enter Task" className='p-5 m-10 text-xl rounded-2xl w-80 border-2 border-stone-500' type="text"/>

          <button onClick={updatelst} className='md:text-4xl text-2xl m-10 border-2 border-stone-500 rounded-2xl p-3 md:p-4 hover:bg-stone-900 transition-all ease-in-out duration-150'>Add item to List</button>


        </div>

        <div className='flex flex-col text-3xl'>{lst.map((taskname, key) => {
            return (

            <div className={`flex justify-between p-4 border-2 border-stone-500 rounded-xl m-2 transition-all ease-in-out duration-150 ${pulsesw ? "hover:animate-pulse hover:border-red-600" : ""}`}>


              <h1 className='p-2 self-center'>Task {incr++} : {taskname.task} </h1> 

              <div className="min-w-[200px] flex justify-end items-center">


                <button onMouseOver={pulser} onMouseOut={pulser} onClick={() => {deletetxt(taskname);}} className='border-2 p-3 m-2 border-red-500 rounded-xl const-height hover:bg-red-600 transition-all ease-in-out duration-150'>X</button>

                <button onClick={() => {pushup(taskname)}} className="p-3 m-2 border-2 rounded-xl border-green-500 const-height hover:bg-green-600 transition-all ease-in-out duration-150">↥</button>

                <button onClick={() => {pushdown(taskname)}} className="p-3 m-2 border-2 rounded-xl border-yellow-500 const-height hover:bg-yellow-500 transition-all ease-in-out duration-150">↧</button>


              </div>

            </div>)

        })}</div>
      </div>

    </div>
  )
}