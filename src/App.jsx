import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'

export default function App() {

  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)
  const [history, setHistory] = useState([])
  const [draftText, setDraftText] = useState("")
  const [draftAmount, setDraftAmount] = useState(0)
  const [incomeOrExpense, setIncomeOrExpense] = useState("")
  const [historyId, setHistoryId] = useState(1)

  const handleDelete = (item) => {
    const newArray = history.filter(( curr,idx) => {
      if(item.id !== curr.id){
        return curr
      }
    })
    setHistory(newArray)
  }

  const addTransaction = (event) => {
    event.preventDefault()
    if(draftText === ""){
      alert("Please Enter Text")
  } else if(draftAmount <= 0){
    alert("Please Enter An Amount Greater Than 0")
  } else if(incomeOrExpense === ""){
    alert("Please Select Income Or Expense")
  } else {
    setHistory((prev) => {
      if(incomeOrExpense === "Income"){
        setIncome(prev => Number(prev)+Number(draftAmount))
      } else {
        setExpense(prev => Number(prev)+Number(draftAmount))
      }
      return(
        [
          ...prev,
          {
            id: historyId,
            text: draftText,
            amount: draftAmount,
            category: incomeOrExpense
          }
        ]
      )
    })
    setHistoryId(prev => prev+1)
    }
  }


  return (
    <div className='container bg-[#F4F4F4] shadow-2xl shadow-black/40 w-fit flex items-center justify-center flex-col h-fit my-20 p-11 rounded-2xl scale-75 sm:scale-100 xl:scale-110'>
        {/* HEADER */}
        <div className='my-3 grid grid-rows-3 grid-cols-1'>
            <h1 className='text-4xl text-center'>Expense Tracker</h1>
            <div className='w-1/2 text-center m-3 p-2 bg-secondary rounded-lg shadow-md shadow-black/20 h-fit'>
                <h3>Total Balance</h3>
                <p>${income - expense}</p>
            </div>
            <div className='grid grid-cols-2 grid-rows-1 m-3 mt-0 bg-secondary rounded-lg shadow-md shadow-black/20 h-20 text-lg'>
                <div className='flex justify-center items-center flex-col gap-1'>
                    <h3>INCOME</h3>
                    <p className='text-green-500'>${income}</p>
                </div>
                <div className='flex justify-center items-center flex-col gap-1'>
                    <h3>EXPENSE</h3>
                    <p className='text-red-500'>${expense}</p>
                </div>
            </div>
        </div>

        {/* HISTORY */}
        <div className='w-full p-3 my-3 h-fit'>
          <h2>History</h2>
          <div className='bg-neutral-400 w-full h-[1px] my-3'></div>
          <div>
            {
              history.map((item) => {
                return(
                  <div key={item.id} className='flex items-center group'>
                      <FaTrash className='text-[#f4f4f4] group-hover:text-black duration-200 cursor-pointer' onClick={() => handleDelete(item)} />
                      <div className={`m-2 w-11/12 flex justify-between items-center p-3 bg-secondary shadow-md shadow-black/20 rounded-lg text-sm ${item.category === "Income" ? "text-green-500" : "text-red-500"}`}>
                        <p>{item.text}</p>
                        <p>${item.amount}</p>
                      </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* ADD TRANSACTION */}
        <div className='w-full bg-secondary  my-5 p-4 rounded-lg shadow-lg shadow-black/20'>
            <h2 className='mt-3'>Add New Transaction</h2>
            <div className='w-full h-[1px] bg-neutral-400 my-3'></div>
            <form className='flex flex-col justify-center items-start h-fit'>
                <label>Text</label>
                <input type='text' placeholder='Enter the text' onChange={(e) => {setDraftText(e.target.value)}} className='w-full mb-3 shadow-md shadow-black/20 p-2 rounded-lg' />
                <label>Amount</label>
                <input type='number' placeholder='Enter the amount' onChange={(e) => {setDraftAmount(e.target.value)}} className='w-full shadow-md shadow-black/20 p-2 rounded-lg' />
                <div className='w-full mt-8'>
                    <div>
                        <input type='radio' id='Income' name="incomeOrExpense" onClick={() => setIncomeOrExpense("Income")} />
                        <label htmlFor='Income' className='ml-2'>Income</label>
                    </div>
                    <div>
                        <input type='radio' id='Expense' name="incomeOrExpense" onClick={() => setIncomeOrExpense("Expense")} />
                        <label htmlFor='Expense' className='ml-2'>Expense</label>
                    </div>  
                </div>
                <button type='submit' className='bg-black text-white h-fit w-full p-2 text-xs rounded-xl mt-5' onClick={(event) => addTransaction(event)}>Add Transaction</button>
            </form>
        </div>
    </div>
  )
}
