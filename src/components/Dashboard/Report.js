import React, { useState, useEffect } from "react";

const Card = ({ report }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 m-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center text-center">
      <h2 className="text-lg font-semibold mb-2">{report.reportName}</h2>
      <p className="text-gray-600 mb-2">{report.description}</p>
      <p className="text-gray-600 mb-2">
        Active: {report.active ? "Yes" : "No"}
      </p>
      <p className="text-gray-600">Is SQL: {report.isSql ? "Yes" : "No"}</p>
    </div>
  );
};

// Define the API base URL using the environment variable
const api = process.env.REACT_APP_API_BASE_URL;

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found. Redirecting to login.");
        // You can redirect to the login page here if needed
        return;
      }

      try {
        const response = await fetch(`${api}/Rpt_builder2/Rpt_builder2`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.error("Unauthorized. Redirecting to login.");
          // Redirect to the login page here if needed
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-700">Reports</h1>
      </div>
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reports.map((report) => (
            <Card key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Report;
