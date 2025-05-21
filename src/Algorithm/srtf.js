function srtfPreemptive(processes) {
    processes = processes.map(p => ({
        id: p.id,
        arrival: Number(p.arrival),
        burst: Number(p.burst),
        remaining: Number(p.burst),
        completed: false,
        startTime: -1,
        completionTime: 0
    }));

    const n = processes.length;
    let currentTime = 0;
    let completedCount = 0;
    let totalWaitingTime = 0;
    let totalTurnAroundTime = 0;
    const result = [];

    while (completedCount < n) {
        const availableProcesses = processes.filter(p => p.arrival <= currentTime && p.remaining > 0);

        if (availableProcesses.length === 0) {
            currentTime++;
            continue;
        }

        availableProcesses.sort((a, b) => {
            if (a.remaining === b.remaining) return a.arrival - b.arrival;
            return a.remaining - b.remaining;
        });

        const current = availableProcesses[0];

        if (current.startTime === -1) current.startTime = currentTime;

        current.remaining--;
        currentTime++;

        if (current.remaining === 0) {
            current.completed = true;
            completedCount++;
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

export default srtfPreemptive;
