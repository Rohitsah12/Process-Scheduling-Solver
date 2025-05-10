function fcfs(processes) {
    
    // processes.sort((a, b) => a.arrival - b.arrival);

    const processLenght = processes.length;
    const result = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnAroundTime = 0;

    for (let i = 0; i < processLenght; i++) {
        const { id, arrival, burst } = processes[i];

       
       const arrivalTime = Number(arrival);
        const burstTime = Number(burst);
        
        
        if (currentTime < arrivalTime) {
            currentTime = arrivalTime;
        }

        const completionTime = currentTime + burstTime;
        const turnAroundTime = completionTime - arrivalTime;
        const waitingTime = turnAroundTime - burstTime;

        currentTime = completionTime; 

        totalWaitingTime += waitingTime;
        totalTurnAroundTime += turnAroundTime;

        result.push({
            processId: id,
            arrivalTime: arrivalTime,
            burstTime: burstTime,
            completionTime,
            turnAroundTime,
            waitingTime
        });
    }

    const avgWaitingTime = totalWaitingTime / processLenght;
    const avgTurnAroundTime = totalTurnAroundTime / processLenght;

    return {
        process: result,
        averageWaitingTime: avgWaitingTime,
        averageTurnAroundTime: avgTurnAroundTime
    };
}

export default fcfs;