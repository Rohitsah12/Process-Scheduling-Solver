function fcfs(){
    const processId=[1,2,3,4,5,6];
    const ArrivalTime=[0,1,2,3,4,5];
    const BurstTime=[3,2,1,4,5,2];
    let n=processId.length;

    const waitingTime=[]
    const completionTime=[];
    const TurnAroundTime=[];
    completionTime[0]=BurstTime[0];
    for(let i=1;i<n;i++){
        completionTime.push(completionTime[i-1]+BurstTime[i]);
    }
    for(let i=0;i<n;i++){
        
        TurnAroundTime.push(completionTime[i]-ArrivalTime[i]);
        waitingTime.push(TurnAroundTime[i]-BurstTime[i]);
        console.log(`Process ${processId[i]}:`);
        console.log(`  Arrival Time   : ${ArrivalTime[i]}`);
        console.log(`  Burst Time     : ${BurstTime[i]}`);
        console.log(`  Completion Time: ${completionTime[i]}`);
        console.log(`  Turnaround Time: ${TurnAroundTime[i]}`);
        console.log(`  Waiting Time   : ${waitingTime[i]}`);
        console.log('---------------------------');

    }

    let AverageWaitingTime=0
    let avgTurnAroundTime=0;
    for(let i=0;i<n;i++){
        AverageWaitingTime+=waitingTime[i];
        avgTurnAroundTime+=TurnAroundTime[i];
    }
    AverageWaitingTime/=n;
    avgTurnAroundTime/=n;

    console.log(AverageWaitingTime);
    console.log(avgTurnAroundTime);
    
    




}

fcfs();