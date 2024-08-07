using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace api.Hubs
{
    public class MessagingHub : Hub
    {
        public readonly static List<UserMessage> MessageHistory = new();

        public async Task PostMessage(string content)
        {
            var senderId = Context.ConnectionId;
            var userMessage = new UserMessage { Sender = senderId, Content = content, SentTime = DateTime.Now };
            MessageHistory.Add(userMessage);
            await Clients.Others.SendAsync("RecieveMessage", senderId, content, userMessage);
        }
        public async Task RetrieveMessageHistory(string Text)
        {
            await Clients.Caller.SendAsync("MessageHistory", MessageHistory);
        }
    }

    public class UserMessage
    {
        public required string Sender { get; set; }
        public required string Content { get; set; }
        public DateTime SentTime { get; set; }
    }
}