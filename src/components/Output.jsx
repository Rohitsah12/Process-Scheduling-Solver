import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import fcfs from "../Algorithm/fcfs";

function Output({processes}){

    const [showAlert,setShowAlert]=useState(false);

    const result=fcfs(processes);
    console.log(result);
    
    
    useEffect(() => {
        const allFilled = processes.every(p => p.id && p.arrival && p.burst);
        if (!allFilled) {
            setShowAlert(true);
            return;
        }
        else{
            setShowAlert(false);
        }
    }, [processes]);

    return(
        <>
            {showAlert && (
                <Alert className="bg-red-700 text-white dark:bg-red-700 p-2 mt-4">
                    Please fill all fields for all the process before Calculating.
                </Alert>               
            )}

            {!showAlert && (
                <div className="border rounded dark:bg-black dark:text-white p-3">
                    <h2 className="font-bold text-3xl mb-7">FCFS Scheduling Results</h2>
                    <table className="border">
                        <thead className="border">
                            <tr>
                                <th className="border">Process ID</th>
                                <th className="border">Arrival Time</th>
                                <th className="border">Burst Time</th>
                                <th className="border">Completion Time</th>
                                <th className="border">Waiting Time</th>
                                <th className="border">Turnaround Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.process.map((process, index) => (
                                <tr key={index} className="border">
                                    <td className="border text-center">{process.processId}</td>
                                    <td className="border text-center">{process.arrivalTime}</td>
                                    <td className="border text-center">{process.burstTime}</td>
                                    <td className="border text-center">{process.completionTime}</td>
                                    <td className="border text-center">{process.waitingTime}</td>
                                    <td className="border text-center">{process.turnAroundTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '20px' }}>
                        <h3>Average Waiting Time: {result.averageWaitingTime.toFixed(2)}</h3>
                        <h3>Average Turnaround Time: {result.averageTurnAroundTime.toFixed(2)}</h3>
                    </div>
                </div>
            )}
        </>
    )

    
}
export default Output;