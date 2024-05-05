import { baseUrl } from "./baseUrl";

const postUrl = `${baseUrl}/api/Woofs`;
const usersUrl = `${baseUrl}/api/Users`;

export const getUserPosts = async (id) => {
  try {
    const apiUrl = `${postUrl}/GetUserPosts/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get user posts");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getHomePagePosts = async (id) => {
  try {
    const apiUrl = `${postUrl}/GetHomePagePosts/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get home-page posts");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getPostLikes = async (id) => {
  try {
    const apiUrl = `${usersUrl}/GetLikesByPostId/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get home-page posts");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const likePost = async (post_id, user_id) => {
  try {
    const apiUrl = `${postUrl}/LikePost/${post_id}/${user_id}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed Like post");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getPetPosts = async (id) => {
  try {
    const apiUrl = `${postUrl}/GetPetPosts/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get pet posts");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const insertPost = async (postData) => {
  try {
    const apiUrl = `${postUrl}/InsertPost`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to upload post");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deletePost = async (post_id) => {
  try {
    const apiUrl = `${postUrl}/${post_id}`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const tagPost = async (post_id,pet_id) => {
  try {
    const apiUrl = `${postUrl}/TagPost/${pet_id}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(post_id),
    });

    if (!response.ok) {
      throw new Error("Failed to tag pet");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};