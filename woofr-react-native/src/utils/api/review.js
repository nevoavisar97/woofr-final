import { baseUrl } from "./baseUrl";

const reviewUrl = `${baseUrl}/api/Reviews`;

export const getProReviews = async (id) => {
  try {
    const apiUrl = `${reviewUrl}/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get user reviews");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const insertReview = async (review) => {
  try {
    const apiUrl = `${reviewUrl}/InsertReview`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      alert("You already reviewd that profile!");
    } else {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteReview = async (id) => {
  try {
    const apiUrl = `${reviewUrl}/${id}`;
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
