import React from 'react'

function Option() {
  return (
    <div className='m-4  w-[120px] border-2 dark:bg-black dark:text-white p-2'>
      <select className='w-[100px]'>
            <option value='fcfs' className='dark:bg-black dark:text-white'>FCFS</option>
            <option value='SJF' className='dark:bg-black dark:text-white'>SJF</option>
            <option value='ps' className='dark:bg-black dark:text-white'>PS</option>
            <option value='rr' className='dark:bg-black dark:text-white'>RR</option>
      </select>
    </div>
  )
}

export default Option
