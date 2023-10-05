import { useState } from "react";
import './body.css'

export let BodyContent = () => {

  const [text, setText] = useState("");
  const [lst, setLst] = useState([]);
  const [strike, setStrike] = useState(false)

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

  return (
    <div className="flex justify-center">

      <div >

        <div className=' flex flex-col md:flex-row items-center justify-center mt-10'>


          <input onChange={updatetext} placeholder="Enter Task" className='p-5 m-10 text-xl rounded-2xl w-80' type="text"/>

          <button onClick={updatelst} className='md:text-4xl text-2xl m-10 font-semibold hover:border-red-500 active:border-dashed border-2 rounded-full p-4 hover:bg-white hover:text-red-500'>Add item to List</button>


        </div>

        <div className='flex flex-col text-3xl'>{lst.map((taskname, key) => {
            return (

            <div className={'flex justify-between p-4'}>


              <h1 onDoubleClick={() => {complete(); checkbox(taskname)}} className='p-2'>Task {incr++} : {taskname.task} </h1> 

              <div className="min-w-[200px] flex justify-end items-center">


                <button onClick={() => {deletetxt(taskname)}} className='border-2 p-3 m-2 border-red-500 rounded-xl hover:text-red-500 hover:bg-white const-height'>X</button>

                <button onClick={() => {pushup(taskname)}} className="p-3 m-2 border-2 rounded-xl hover:text-green-500 hover:bg-white border-green-500 const-height">↥</button>

                <button onClick={() => {pushdown(taskname)}} className="p-3 m-2 border-2 rounded-xl hover:text-yellow-500 hover:bg-white border-yellow-500 const-height">↧</button>


              </div>

            </div>)

        })}</div>
      </div>

    </div>
  )
}