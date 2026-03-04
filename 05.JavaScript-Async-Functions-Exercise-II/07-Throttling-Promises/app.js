async function throttlePromises() {
    const asyncTasks = [
        () => new Promise(resolve => setTimeout(() => {console.log("Task 1 done"); resolve("Task 1 done"); }, 1000)),
        () => new Promise(resolve => setTimeout(() => {console.log("Task 2 done"); resolve("Task 2 done"); }, 2000)),
        () => new Promise(resolve => setTimeout(() => {console.log("Task 3 done"); resolve("Task 3 done"); }, 2500)),
        () => new Promise(resolve => setTimeout(() => {console.log("Task 4 done"); resolve("Task 4 done"); }, 3000)),
    ];

    async function throttle(tasks, limit) {
        const result = [];
        const executing = [];
        for (const task of tasks) {
            const p = task().then(result => {
                executing.splice(executing.indexOf(p), 1);
                return result;
            });
            result.push(p);
            executing.push(p);
            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }
        return Promise.all(result);
    }

    const results = await throttle(asyncTasks, 2);
    console.log('All tasks done', results);
}

window.throttlePromises = throttlePromises;