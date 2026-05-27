const fetchRecords = async () => {

  const response = await axios.get(
    "https://breatheesgproject-production.up.railway.app/api/records/"
  );

  setRecords(response.data);
};


const uploadFile = async () => {

  const formData = new FormData();

  formData.append("file", file);

  formData.append("source_type", sourceType);

  try {

    await axios.post(
      "https://breatheesgproject-production.up.railway.app/api/upload/",
      formData
    );

    alert("File uploaded successfully");

    fetchRecords();

  } catch (error) {

    console.log(error);

    alert("Upload failed");
  }
};