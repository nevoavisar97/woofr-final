import { baseUrl } from "./baseUrl";
const petUrl = `${baseUrl}/api/Pets`;

export const insertPet = async (petData) => {
  try {
    const apiUrl = `${petUrl}/InsertPet`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(petData),
    });

    if (!response.ok) {
      throw new Error("Failed to register pet");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};


export const updateProfessional = async (proData) => {
  try {
    const apiUrl = `${proUrl}/RegisterProfessional`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(proData),
    });

    if (!response.ok) {
      throw new Error("Failed to register profile");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getUserPets = async (id) => {
  try {
    const apiUrl = `${petUrl}/GetUserPets/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get PETS");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deletePet = async (pet_id) => {
  try {
    const apiUrl = `${petUrl}/${pet_id}`;
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
