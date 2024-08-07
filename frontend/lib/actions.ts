"use server"

import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"

export const useConnectionBuilder = () => new HubConnectionBuilder().withUrl(`${process.env.BACKEND_URL!}/chathub`).withAutomaticReconnect().configureLogging(LogLevel.Debug)