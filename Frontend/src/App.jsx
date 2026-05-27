import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);

  const [sourceType, setSourceType] = useState("sap");

  const [records, setRecords] = useState([]);


  const fetchRecords = async () => {

    try {

      const response = await axios.get(
        "https://breatheesgproject-production.up.railway.app/api/records/"
      );

      console.log(response.data);

      setRecords(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchRecords();

    console.log("Fetching records...");

  }, []);


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


  return (

    <div style={{ padding: "40px" }}>

      <h1>Breathe ESG Dashboard</h1>

      <br />

      <select
        onChange={(e) => setSourceType(e.target.value)}
      >

        <option value="sap">SAP</option>

        <option value="utility">Utility</option>

        <option value="travel">Travel</option>

      </select>

      <br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadFile}>
        Upload CSV
      </button>

      <br /><br />

      <h2>Uploaded Records</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px"
        }}
      >

        <thead>

          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Suspicious</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {records.map((record) => (

            <tr
              key={record.id}
              style={{
                backgroundColor: record.suspicious
                  ? "#ffcccc"
                  : "white"
              }}
            >

              <td>{record.id}</td>

              <td>{record.source_type}</td>

              <td>{record.category}</td>

              <td>{record.quantity}</td>

              <td>{record.unit}</td>

              <td>
                {record.suspicious ? "Yes" : "No"}
              </td>

              <td>{record.status}</td>

              <td>
                <button>Approve</button>

                <button style={{ marginLeft: "10px" }}>
                  Reject
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;