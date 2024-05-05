import { baseUrl } from "./baseUrl";

const userUrl = `${baseUrl}/api/Users`;

//to get logged in user data
export const GetUserData = async (token) => {
  try {
    const apiUrl = `${userUrl}/GetUserData/${token}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.id) {
        return responseData;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

//to get logged in user data
export const SearchUser = async (keyword) => {
  try {
    const apiUrl = `${userUrl}/SearchUsers`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(keyword),
    });

    if (!response.ok) {
      throw new Error("Failed to get search result");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

//to get other users data
export const GetUserInfo = async (id) => {
  try {
    const apiUrl = `${userUrl}/GetUserInfo/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get user data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

//register user
export const loginUser = async (loginData) => {
  try {
    // Make API request to register user
    const apiUrl = `${userUrl}/UserLogIn/${loginData.email}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(loginData.password), // Pass user password as JSON
    });
    if (response.ok) {
      const token = await response.text();
      // Navigate to next screen or perform other actions
      return token.toString();
    } else {
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
  }
};

export const uploadImageURL = async (id, imageURL) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("imageURL", imageURL);

    const apiUrl = `${userUrl}/UploadProfileImage`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; charset=UTF-8",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

//register user
export const saveUser = async (userData) => {
  try {
    userData.profilePictureUrl = "none";
    userData.token = "string";
    // userData.userId = 0;
    // Make API request to register user
    const apiUrl = userUrl;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userData), // Pass user data as JSON
    });

    if (response.ok) {
      const token = await response.text();
      return token;
    } else {
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
    // Optionally, show an error message to the user
  }
};

export const editProfile = async (userData) => {
  try {
    const apiUrl = `${userUrl}/EditProfile`;
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed update user data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
    // Optionally, show an error message to the user
  }
};

export const deleteProfile = async (token) => {
  try {
    const apiUrl = `${userUrl}/DeleteProfile/${token}`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user data");
    }
    // Since there might not be any data returned from a DELETE request
    // We can just return a success message
    return { success: true, message: "User data deleted successfully" };
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
    // Optionally, show an error message to the user
    return { success: false, message: "Failed to delete user data" };
  }
};

export const getUserFollowings = async (id) => {
  try {
    // Make API request to register user
    const apiUrl = `${userUrl}/GetUserFollowingsById/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("error while fetching user data");
    }
    const responseData = response.json();

    return responseData;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
  }
};

export const getUserFollowers = async (id) => {
  try {
    // Make API request to register user
    const apiUrl = `${userUrl}/GetUserFollowersById/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("error while fetching user data");
    }
    const responseData = response.json();

    return responseData;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
  }
};

export const followAction = async (follower, followed) => {
  try {
    // Make API request to register user
    const apiUrl = `${userUrl}/FollowUnfollowUser/${follower}/${followed}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("error while fetching user data");
    }
    const responseData = response.text();

    return responseData;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
  }
};
