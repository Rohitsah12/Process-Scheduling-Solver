import Input from './Input'
import React, { useState } from 'react'

function Option() {
  const [algo, setAlgo] = useState('fcfs');

  return (
    <div className=" p-4 border-2 rounded dark:bg-black dark:text-white w-full">
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Algorithm:</label>
        <select
          className="w-full sm:w-[200px] p-2 border rounded dark:bg-black dark:text-white"
          onChange={(e) => setAlgo(e.target.value)}
        >
          <option value='fcfs'>FCFS</option>
          <option value='SJF'>SJF</option>
          <option value='SRTF'>SRTF</option>
          <option value='ps'>PS</option>
          <option value='rr'>RR</option>
        </select>
      </div>
      <Input algo={algo} />
    </div>
  );
}


export default Option
