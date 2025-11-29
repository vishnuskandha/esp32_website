export interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
    type: "info" | "success" | "warning";
}

export let buttonState = {
    button1: false,
    button2: false,
    lastUpdated: Date.now(),
    logs: [] as LogEntry[],
};

export function addLog(message: string, type: "info" | "success" | "warning" = "info") {
    const newLog: LogEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString(),
        message,
        type,
    };

    // Keep only last 100 logs
    buttonState.logs = [newLog, ...buttonState.logs].slice(0, 100);
}

export function updateButtonState(btn1: boolean, btn2: boolean) {
    // Detect changes to add logs
    if (btn1 !== buttonState.button1) {
        addLog(`SYSTEM A ${btn1 ? "ACTIVATED" : "DEACTIVATED"}`, btn1 ? "success" : "info");
    }
    if (btn2 !== buttonState.button2) {
        addLog(`SYSTEM B ${btn2 ? "ACTIVATED" : "DEACTIVATED"}`, btn2 ? "success" : "info");
    }

    buttonState.button1 = btn1;
    buttonState.button2 = btn2;
    buttonState.lastUpdated = Date.now();
}
