import Input from './Input'
import React, { useState } from 'react'

function Option() {
  const [algo, setAlgo] = useState('fcfs');

  return (
    <div className=" p-4 border-2 rounded  w-full">
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Algorithm:</label>
        <select
          className="w-full sm:w-[200px] p-2 border rounded "
          onChange={(e) => setAlgo(e.target.value)}
        >
          <option value='fcfs' className='dark:bg-black dark:text-white'>FCFS</option>
          <option value='SJF' className='dark:bg-black dark:text-white'>SJF</option>
          <option value='SRTF' className='dark:bg-black dark:text-white'>SRTF</option>
          <option value='ps' className='dark:bg-black dark:text-white'>PS</option>
          <option value='rr' className='dark:bg-black dark:text-white' >RR</option>
        </select>
      </div>
      <Input algo={algo} />
    </div>
  );
}


export default Option
