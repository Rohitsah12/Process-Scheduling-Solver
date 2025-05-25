import { useState } from "react";
import { Alert } from "@material-tailwind/react";
import Output from "./Output";
import { Calculator, Plus } from "lucide-react";

function Input({ algo }) {
    const [processes, setProcesses] = useState([
        { id: "", arrival: "", burst: "", priority: "" }
    ]);
    const [quantum, setQuantum] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showOutput, setShowOutput] = useState(false);

    const algoLower = algo.toLowerCase();
    const isPriorityAlgo = algoLower === "ps";
    const isRoundRobin = algoLower === "rr";

    const handleAddProcess = () => {
        const last = processes[processes.length - 1];
        const valid = last.id && last.arrival && last.burst &&
            (!isPriorityAlgo || last.priority);

        if (!valid) {
            setShowAlert(true);
            return;
        }

        setShowAlert(false);
        setShowOutput(false);
        setProcesses([...processes, { id: "", arrival: "", burst: "", priority: "" }]);
    };

    const handleChange = (index, field, value) => {
        const updated = [...processes];
        updated[index][field] = value;
        setProcesses(updated);
    };

    const handleOutput = () => {
        if (isRoundRobin && !quantum) {
            setShowAlert(true);
            return;
        }
        setShowAlert(false);
        setShowOutput(true);
    };

    return (
        <div className="flex flex-col w-full">
            <label className="text-lg font-semibold dark:text-white mb-3">
                Add process for {algo.toUpperCase()} Scheduling Algorithm:
            </label>

            <div className="w-full mt-2 p-4 border rounded dark:bg-black dark:text-white">
                {/* Headers */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 font-bold text-sm md:text-base mb-2 text-center">
                    <div>Process ID</div>
                    <div>Arrival Time</div>
                    <div>Burst Time</div>
                    {isPriorityAlgo && <div>Priority (1 as highest)</div>}
                </div>

                {/* Inputs */}
                {processes.map((process, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-2"
                    >
                        <input
                            type="number"
                            min="0"
                            placeholder="Process ID"
                            value={process.id}
                            onChange={(e) => handleChange(index, "id", e.target.value)}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            min="0"
                            placeholder="Arrival Time"
                            value={process.arrival}
                            onChange={(e) => handleChange(index, "arrival", e.target.value)}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            min="0"
                            placeholder="Burst Time"
                            value={process.burst}
                            onChange={(e) => handleChange(index, "burst", e.target.value)}
                            className="border p-2 rounded"
                        />
                        {isPriorityAlgo && (
                            <input
                                type="number"
                                min="1"
                                placeholder="Priority"
                                value={process.priority}
                                onChange={(e) => handleChange(index, "priority", e.target.value)}
                                className="border p-2 rounded"
                            />
                        )}
                    </div>
                ))}

                {/* Quantum Input for RR */}
                {isRoundRobin && (
                    <div className="my-3">
                        <label className="block font-medium mb-1">Quantum Time</label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Enter quantum time"
                            value={quantum}
                            onChange={(e) => setQuantum(e.target.value)}
                            className="border p-2 rounded w-full max-w-sm"
                        />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                        onClick={handleAddProcess}
                        className="flex flex-1 items-center justify-center rounded-lg px-4 py-2 text-white shadow-lg transition-all duration-200
                                bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl
                                dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-400 dark:hover:to-indigo-400 dark:shadow-md dark:hover:shadow-lg"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Process
                    </button>
                    <button
                        onClick={handleOutput}
                        className="flex flex-1 items-center justify-center rounded-lg px-4 py-2 text-white shadow-lg transition-all duration-200
                                bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl
                                dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-400 dark:hover:to-teal-400 dark:shadow-md dark:hover:shadow-lg"
                    >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate Schedule
                    </button>
                </div>




                {showAlert && (
                    <Alert className="bg-red-700 text-white mt-4 p-2">
                        Please fill all required fields {isRoundRobin ? "and enter quantum" : ""}.
                    </Alert>
                )}
            </div>

            {/* Output */}
            {showOutput && (
                <div className="mt-6">
                    <Output
                        processes={processes}
                        algo={algo}
                        quantum={quantum}
                    />
                </div>
            )}
        </div>
    );
}

export default Input;
