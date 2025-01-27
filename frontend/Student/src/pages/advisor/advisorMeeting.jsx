import axios from "axios";
import React, { useEffect, useState } from "react";

const AdvisorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const advisorId = "advisor2"; // Replace with dynamic advisor ID if needed

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log("Fetching meeting requests...");
        const response = await axios.get(`http://localhost:3000/api/meetings/instructors/${advisorId}`);
        console.log("API Response:", response.data);

        // Ensure the response is an array
        const requests = Array.isArray(response.data) ? response.data : [response.data];
        setRequests(requests);
      } catch (error) {
        console.error("Error fetching meeting requests:", error);
        setError("Failed to fetch meeting requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [advisorId]);

  const handleApprove = async (requestId) => {
    try {
      console.log("Approving request with ID:", requestId); // Log the request ID
      const response = await axios.put(`http://localhost:3000/api/meetings/${requestId}/approve`);
      console.log("Request approved:", response.data);

      // Update the local state to reflect the new status
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: "approved" } : request
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request. Please try again later.");
    }
  };

  const handleDecline = async (requestId) => {
    try {
      console.log("Declining request with ID:", requestId); // Log the request ID
      const response = await axios.put(`http://localhost:3000/api/meetings/${requestId}/decline`);
      console.log("Request declined:", response.data);

      // Update the local state to reflect the new status
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: "declined" } : request
        )
      );
    } catch (error) {
      console.error("Error declining request:", error);
      alert("Failed to decline request. Please try again later.");
    }
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="font-semibold mb-6 text-lg">Advisor Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : requests.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Student Name</th>
              <th className="py-2">Date & Time</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="border-b">
                <td className="py-2">{request.studentName}</td>
                <td className="py-2">{new Date(request.dateTime).toLocaleString()}</td>
                <td className="py-2">{request.status}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(request._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No meeting requests found.</p>
      )}
    </div>
  )
}

export default AdvisorDashboard;