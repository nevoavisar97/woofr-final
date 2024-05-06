import { baseUrl } from "./baseUrl";









const chatUrl = `${baseUrl}/api/Chats`;
const messagesUrl = `${baseUrl}/api/Messages`;

export const getUserChats = async (id) => {
  try {
    const apiUrl = `${chatUrl}/GetUsersChat/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get chats");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getChatMessages = async (id, readerId) => {
  try {
    const apiUrl = `${messagesUrl}/GetChatMessages/${id}/${readerId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get chats messages");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const startChat = async (chatRequest) => {
  try {
    const apiUrl = `${chatUrl}/StartChat`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(chatRequest),
    });

    if (!response.ok) {
      throw new Error("Failed start new chat");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addMessage = async (message) => {
  try {
    const apiUrl = `${messagesUrl}/AddMessage`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Failed send new message");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
