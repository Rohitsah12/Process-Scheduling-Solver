import { Alert } from "@material-tailwind/react";
import { useEffect, useState, useMemo } from "react";
import fcfs from "../Algorithm/fcfs";
import sjfNonPreemptive from "../Algorithm/sjf";
import srtfPreemptive from "../Algorithm/srtf";
import preemptivePriority from "../Algorithm/ps";
import roundRobin from "../Algorithm/rr";

function Output({ processes, algo, quantum }) {
    const [showAlert, setShowAlert] = useState(false);

    const algoLower = algo.toLowerCase();

    const algorithmMap = {
        fcfs,
        sjf: sjfNonPreemptive,
        srtf: srtfPreemptive,
        ps: preemptivePriority,
        rr: roundRobin,
    };

    const schedulingFunction = algorithmMap[algoLower];

    useEffect(() => {
        const allFilled = processes.every(p =>
            p.id !== "" &&
            p.arrival !== "" &&
            p.burst !== "" &&
            (algoLower !== "ps" || p.priority !== "")
        );

        const quantumValid = algoLower !== "rr" || (quantum && quantum > 0);

        setShowAlert(!(allFilled && quantumValid));
    }, [processes, quantum, algoLower]);

    const result = useMemo(() => {
        if (!showAlert && schedulingFunction) {
            if (algoLower === "rr") {
                return schedulingFunction(processes, Number(quantum));
            } else {
                return schedulingFunction(processes);
            }
        }
        return null;
    }, [showAlert, processes, schedulingFunction, quantum, algoLower]);

    if (!schedulingFunction) {
        return (
            <div className="text-red-500 text-lg mt-4 font-semibold">
                ❌ Error: Unknown algorithm "{algo}"
            </div>
        );
    }

    return (
        <>
            {showAlert && (
                <Alert className="bg-red-700 text-white mt-4 p-2">
                    ⚠️ Please fill all fields correctly.
                    {algoLower === "rr" && " Make sure to enter a valid quantum value."}
                </Alert>
            )}

            {!showAlert && result && (
                <div className="border rounded shadow-lg dark:bg-zinc-900 dark:text-white p-6 mt-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
                        {algo.toUpperCase()} Scheduling Results
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm table-auto border-collapse border border-gray-300 dark:border-gray-600">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 border dark:border-gray-600">Process ID</th>
                                    <th className="px-4 py-2 border dark:border-gray-600">Arrival Time</th>
                                    <th className="px-4 py-2 border dark:border-gray-600">Burst Time</th>
                                    {algoLower === "ps" && (
                                        <th className="px-4 py-2 border dark:border-gray-600">Priority</th>
                                    )}
                                    <th className="px-4 py-2 border dark:border-gray-600">Completion Time</th>
                                    <th className="px-4 py-2 border dark:border-gray-600">Waiting Time</th>
                                    <th className="px-4 py-2 border dark:border-gray-600">Turnaround Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {result.process.map((p, i) => (
                                    <tr
                                        key={i}
                                        className="odd:bg-white even:bg-gray-50 dark:odd:bg-zinc-800 dark:even:bg-zinc-700"
                                    >
                                        <td className="px-4 py-2 border text-center">{p.processId}</td>
                                        <td className="px-4 py-2 border text-center">{p.arrivalTime}</td>
                                        <td className="px-4 py-2 border text-center">{p.burstTime}</td>
                                        {algoLower === "ps" && (
                                            <td className="px-4 py-2 border text-center">{p.priority}</td>
                                        )}
                                        <td className="px-4 py-2 border text-center">{p.completionTime}</td>
                                        <td className="px-4 py-2 border text-center">{p.waitingTime}</td>
                                        <td className="px-4 py-2 border text-center">{p.turnAroundTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 text-lg font-medium text-center">
                        <div className="mb-1">
                            ✅ Average Waiting Time:{" "}
                            <span className="font-semibold text-green-600 dark:text-green-400">
                                {result.averageWaitingTime.toFixed(2)}
                            </span>
                        </div>
                        <div>
                            🕒 Average Turnaround Time:{" "}
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {result.averageTurnAroundTime.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Output;
