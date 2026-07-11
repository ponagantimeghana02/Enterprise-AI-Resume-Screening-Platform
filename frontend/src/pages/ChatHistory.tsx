import { useEffect, useState } from "react";
import { Chat } from "../types/chat";
import {
  getChatHistory,
  deleteChatHistory,
} from "../services/chatService";

const ChatHistory = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setLoading(true);

      const data = await getChatHistory();

      setChats(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all chat history?"
    );

    if (!confirmDelete) return;

    try {
      await deleteChatHistory();

      setChats([]);

      alert("Chat history deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return <h2>Loading Chat History...</h2>;
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Chat History
        </h1>

        <div className="space-x-3">

          <button
            onClick={loadChats}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>

          <button
            onClick={handleDeleteAll}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete All
          </button>

        </div>

      </div>

      {chats.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p>No Chat History Available</p>
        </div>
      ) : (
        <div className="space-y-5">

          {chats.map((chat) => (

            <div
              key={chat.id}
              className="bg-white shadow rounded p-5"
            >

              <p className="text-sm text-gray-500 mb-3">
                {new Date(chat.created_at).toLocaleString()}
              </p>

              <h3 className="font-bold text-blue-600">
                Question
              </h3>

              <p className="mb-4">
                {chat.question}
              </p>

              <h3 className="font-bold text-green-600">
                Answer
              </h3>

              <p>
                {chat.answer}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default ChatHistory;