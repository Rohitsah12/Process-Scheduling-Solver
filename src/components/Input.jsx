import { useState } from "react";
import { Alert } from "@material-tailwind/react";
import Output from "./Output";

function Input({algo}) {
    const [processes, setProcesses] = useState([
        { id: "", arrival: "", burst: "" },
    ]);
    const [showAlert, setShowAlert] = useState(false);
    const [showOutput,setShowOutput]=useState(false);

    const handleAddProcess = () => {
        let n = processes.length;
        const last = processes[n - 1];
        if (last.id === "" || last.arrival === "" || last.burst === "") {
            setShowAlert(true);
        } else {
            setShowAlert(false);
            setShowOutput(false);
            setProcesses([...processes, { id: "", arrival: "", burst: "" }]);
        }
    };

    const handleChange = (index, field, value) => {
        const updated = [...processes];
        updated[index][field] = value;
        setProcesses(updated);
    };

    const handleOutput = () => {
        setShowOutput(true);
    };


    return (

        <div className="flex flex-col w-full">
            <label className="text-lg font-semibold dark:text-white ">
                Add process for {algo.toUpperCase()} Scheduling Algorithm:
            </label>

            <div className="flex w-full">
                {/* <label>Add process for {algo} Scheduling Algorithm</label> */}
                
                <div className="w-full lg:w-1/2 mt-5 p-4 border rounded dark:bg-black dark:text-white">
                    <div className="mb-4 font-bold flex justify-between text-sm md:text-base">
                        <p className="border p-2 text-center w-1/3">Process Id</p>
                        <p className="border p-2 text-center w-1/3">ArrivalTime</p>
                        <p className="border p-2 text-center w-1/3">BurstTime</p>
                    </div>

                    {processes.map((process, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="number"
                                min={0}
                                placeholder="Process ID"
                                value={process.id}
                                onChange={(e) => handleChange(index, "id", e.target.value)}
                                className="border p-2 rounded w-1/3"
                            />
                            <input
                                type="number"
                                min={0}
                                placeholder="Arrival Time"
                                value={process.arrival}
                                onChange={(e) => handleChange(index, "arrival", e.target.value)}
                                className="border p-2 rounded w-1/3"
                            />
                            <input
                                type="number"
                                min={0}
                                placeholder="Burst Time"
                                value={process.burst}
                                onChange={(e) => handleChange(index, "burst", e.target.value)}
                                className="border p-2 rounded w-1/3"
                            />
                        </div>
                    ))}

                    <div className="flex gap-2 flex-wrap">
                        <button
                            type="button"
                            className="border p-2 rounded w-full sm:w-[150px] bg-slate-700 text-white"
                            onClick={handleAddProcess}
                        >
                            Add Process
                        </button>
                        <button
                            type="button"
                            className="border p-2 rounded w-full sm:w-[150px] bg-slate-700 text-white cursor-pointer"
                            onClick={handleOutput}   
                        >
                            Calculate
                        </button>
                    </div>

                    {showAlert && (
                        <Alert className="bg-red-700 text-white dark:bg-red-700 p-2 mt-4">
                            Please fill all fields before adding a new process.
                        </Alert>
                    )}
                </div>
                { showOutput && (
                    <div className="mt-5">
                        <Output processes={processes} algo={algo} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Input;
