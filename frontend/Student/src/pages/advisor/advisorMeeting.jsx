import React, { useState } from 'react'

const advisorMeeting = () => {
  const [tasks, setTasks] = useState(["", "", ""]); // Added 3 initial tasks

  const handleInputChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };

  return (
    <div className="p-8 font-sans">
      {/* Top Section */}
      <div className="flex gap-12">
        {/* Meeting Form */}
        <div className="w-1/2">
          <h1 className="font-semibold mb-6 text-lg">Book a date for a meeting</h1>
          <form className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="supervisor" className="w-28 font-medium">
                Supervisor:
              </label>
              <input
                type="text"
                id="supervisor"
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="date" className="w-28 font-medium">
                Date:
              </label>
              <input
                type="date"
                id="date"
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="time" className="w-28 font-medium">
                Time:
              </label>
              <input
                type="time"
                id="time"
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="agenda" className="w-28 font-medium">
                Agenda:
              </label>
              <input
                type="text"
                id="agenda"
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="place" className="w-28 font-medium">
                Place:
              </label>
              <input
                type="text"
                id="place"
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-md"
            >
              Request
            </button>
          </form>
        </div>

        {/* Tasks Section */}
        <div className="bg-gray-100 p-4 rounded shadow-md w-1/3">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-semibold">Tasks</h1>
            <button>
              <img
                src="https://img.icons8.com/ios/24/000000/edit--v1.png"
                alt="edit"
              />
            </button>
          </div>
          <ol className="space-y-2 text-gray-600">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="font-medium">{index + 1}.</span>
                <input
                  type="text"
                  placeholder={`Task ${index + 1}`}
                  value={task}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="border-b-2 w-full focus:outline-none focus:border-blue-400"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Booked Meetings */}
      <div className="mt-12">
        <h1 className="font-semibold mb-4 text-lg">Booked Meetings</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Advisor Name</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Place</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Jane Cooper</td>
              <td className="py-2">13-Jan-2025</td>
              <td className="py-2">09:00 am</td>
              <td className="py-2">AAiT hall</td>
            </tr>
            <tr>
              <td className="py-2">Floyd Miles</td>
              <td className="py-2">24-Jan-2025</td>
              <td className="py-2">08:00 am</td>
              <td className="py-2">AAiT hall</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default advisorMeeting