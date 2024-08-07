"use client"
import { Message } from "@/lib/data";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { useState } from "react"



export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);
  const backendUrl = "http://localhost:5116/chathub"


  const connectToHub = async () => {
    const hubConnection = new HubConnectionBuilder().withUrl(backendUrl)
      .withAutomaticReconnect().configureLogging(LogLevel.Debug).build();
    setHubConnection(hubConnection)
    await hubConnection.start()

    hubConnection.on("MessageHistory", (MessageHistory) => { setMessages(MessageHistory) })
    hubConnection.on("RecieveMessage", (sender, content, sentTime) => {
      setMessages([...messages, { sender, content, sentTime }])
      hubConnection.invoke("RetrieveMessageHistory")
    })
    hubConnection.invoke("RetrieveMessageHistory")
  }

  const disConnect = () => {
    hubConnection?.stop()
    setHubConnection(null)
  }
  const isConnected = () => hubConnection != null

  const sendMessage = async () => {
    if (hubConnection && newMessage.trim()) {
      await hubConnection.send("PostMessage", newMessage)
      setNewMessage("")
      hubConnection.invoke("RetrieveMessageHistory")
    }
  }
  const isMyMessage = (username: string) => hubConnection && username === hubConnection.connectionId




  return (
    <div className="p-3"><h2 className="text-slate-600 text-xl">Chat Page</h2>
      <div className="p-4">
        <div className="mb-4">
          <button className={"p-2 rounded-md ".concat(!hubConnection ? "bg-green-400" : "bg-red-500")}
            onClick={!hubConnection ? connectToHub : disConnect}>{!hubConnection ? "Connect" : "Disconnect"}</button>
        </div>
        <div className="d-flex justify-row">
          <input
            disabled={!isConnected()}
            type="text"
            className="border p-2 mr-2 rounded w-[300px]"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            disabled={!isConnected()}
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </div>
        <div className="mb-4" style={{
          height: "60vh",
          overflowY: "scroll"
        }}>
          {hubConnection && messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded ${isMyMessage(msg.sender) ? "bg-blue-200" : "bg-gray-200"
                }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs">
                {new Date(msg.sentTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}