import ApiError from "../error/ApiError";

// This function will handle the errors from the API
const handleErrors = async (res) => {
  if (!res.ok) {
    const json = await res.json();
    throw new ApiError(json);
  }
  return await res.json();
};

export { handleErrors };
