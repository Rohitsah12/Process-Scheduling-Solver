function roundRobin(processes, timeQuantum) {
    processes = processes.map(p => ({
        id: p.id,
        arrival: Number(p.arrival),
        burst: Number(p.burst),
        remaining: Number(p.burst),
        completionTime: 0,
        startTime: -1,
        isInQueue: false
    }));

    const n = processes.length;
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnAroundTime = 0;
    const result = [];
    const queue = [];

    processes.sort((a, b) => a.arrival - b.arrival); 

    while (true) {
        for (const proc of processes) {
            if (proc.arrival <= currentTime && proc.remaining > 0 && !proc.isInQueue) {
                queue.push(proc);
                proc.isInQueue = true;
            }
        }

        if (queue.length === 0) {
            const nextArrival = processes.find(p => p.remaining > 0);
            if (!nextArrival) break; // all done
            currentTime = nextArrival.arrival;
            continue;
        }

        const current = queue.shift();
        if (current.startTime === -1) current.startTime = currentTime;

        const execTime = Math.min(timeQuantum, current.remaining);
        current.remaining -= execTime;
        currentTime += execTime;

        // After running, mark as not in queue so it can be added again if needed
        current.isInQueue = false;

        // Add any newly arrived processes during this time
        for (const proc of processes) {
            if (proc.arrival > currentTime - execTime && proc.arrival <= currentTime && proc.remaining > 0 && !proc.isInQueue) {
                queue.push(proc);
                proc.isInQueue = true;
            }
        }

        if (current.remaining > 0) {
            queue.push(current);
            current.isInQueue = true;
        } else {
            current.completionTime = currentTime;
            const turnAroundTime = current.completionTime - current.arrival;
            const waitingTime = turnAroundTime - current.burst;
            totalTurnAroundTime += turnAroundTime;
            totalWaitingTime += waitingTime;

            result.push({
                processId: current.id,
                arrivalTime: current.arrival,
                burstTime: current.burst,
                completionTime: current.completionTime,
                turnAroundTime: turnAroundTime,
                waitingTime: waitingTime
            });
        }
    }

    const avgWaitingTime = totalWaitingTime / n;
    const avgTurnAroundTime = totalTurnAroundTime / n;

    return {
        process: result.sort((a, b) => a.processId.localeCompare(b.processId)),
        averageWaitingTime: avgWaitingTime,
        averageTurnAroundTime: avgTurnAroundTime
    };
}

export default roundRobin;
