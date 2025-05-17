function sjfNonPreemptive(processes) {
   
    processes = processes.map(p => ({
        id: p.id,
        arrival: Number(p.arrival),
        burst: Number(p.burst),
        completed: false
    }));

    const n = processes.length;
    const result = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnAroundTime = 0;
    let completedCount = 0;

    while (completedCount < n) {

        const availableProcesses = processes
            .filter(p => p.arrival <= currentTime && !p.completed);

        if (availableProcesses.length === 0) {
          
            currentTime++;
            continue;
        }

        
        availableProcesses.sort((a, b) => a.burst - b.burst);
        const selected = availableProcesses[0];

        const startTime = currentTime;
        const completionTime = startTime + selected.burst;
        const turnAroundTime = completionTime - selected.arrival;
        const waitingTime = turnAroundTime - selected.burst;

        totalWaitingTime += waitingTime;
        totalTurnAroundTime += turnAroundTime;

        result.push({
            processId: selected.id,
            arrivalTime: selected.arrival,
            burstTime: selected.burst,
            completionTime,
            turnAroundTime,
            waitingTime
        });

        currentTime = completionTime;
        selected.completed = true;
        completedCount++;
    }

    const avgWaitingTime = totalWaitingTime / n;
    const avgTurnAroundTime = totalTurnAroundTime / n;

    return {
        process: result,
        averageWaitingTime: avgWaitingTime,
        averageTurnAroundTime: avgTurnAroundTime
    };
}

export default sjfNonPreemptive;

