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
export const getTips = async () => {
  try {
    const apiKey = "AIzaSyCWOavwRLzQhrO68xAOb-482fSreL02A5E"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        "contents": [
          {
            "parts": [
              {
                "text": "תן לי טיפ קצר באורך של עד 30 מילים בנושא חיות מחמד"
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("Failed to get tips");
    }

    const responseData = await response.json();
    const tip = responseData.candidates[0].content.parts[0].text
    return tip;
  } catch (error) {
    console.error("Error:", error);
    // Handle the error as needed
    return null;
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
