import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // To access URL params
import Calendar from 'react-calendar';
import Profile from '../../assets/images/Man.jpg';
import DocumentImage from '../../assets/images/placeholder.jpg'; // Placeholder for document images

const StudentDetails = () => {
  const { studentId } = useParams(); // Access studentId from URL

  // Sample data
  const students = {
    '001': {
      name: 'Sara Kebede',
      id: 'Phd/5489/16',
      department: 'School of Information Technology',
      email: 'kebede@gmail.com',
      phone: '0987654321',
      specialization: 'Artificial Intelligence',
      currentStudents: 10,
      imageUrl: Profile,
    },
    '002': {
      name: 'Abebe Kebede',
      id: 'Phd/1234/19',
      department: 'Software Engineering',
      email: 'abebe@gmail.com',
      phone: '0912345678',
      specialization: 'Machine Learning',
      currentStudents: 8,
      imageUrl: Profile,
    },
    // Add more students here...
  };

  const student = students[studentId];

  if (!student) {
    return <p>Student not found</p>; // Handle case if studentId is invalid
  }

  const [filter, setFilter] = useState({ postedAt: '', paperType: '', supervisor: '' });

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-white w-full">
      <div className="flex gap-20 mt-10">
        <div className="flex-grow">
          <div className="flex justify-center">
            <div className="flex items-center gap-20 mt-10">
              <div className="grid">
                <img
                  src={student.imageUrl}
                  className="h-44 w-44 rounded-full"
                  alt="Student"
                />
                <p className="text-blue-500 font-semibold text-xl mt-4 text-center">{student.name}</p>
                <p className="text-center">{student.id}</p>
              </div>
              <div className="space-y-6 text-base">
                <p>
                  <span className="text-blue-600 font-semibold">Department:</span> {student.department}
                </p>
                <p>
                  <span className="text-blue-600 font-semibold">Email:</span> {student.email}
                </p>
                <p>
                  <span className="text-blue-600 font-semibold">Phone No:</span> {student.phone}
                </p>
                <p>
                  <span className="text-blue-600 font-semibold">Specialization:</span> {student.specialization}
                </p>
                <p>
                  <span className="text-blue-600 font-semibold">Current Students:</span> {student.currentStudents}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar in the right corner */}
        <div className="flex-shrink-0 w-80 border rounded-lg shadow-md p-4">
          <h2 className="text-blue-600 font-semibold text-lg mb-4">October 2024</h2>
          <Calendar />
          <div className="mt-4">
            <p className="text-gray-500 text-xs">8:30 AM</p>
            <p>Meeting with the Supervisor</p>
            <p className="text-gray-500 text-xs mt-2">10:00 AM</p>
            <p>First Draft Submission</p>
          </div>
        </div>
      </div>

      {/* Filters and Documents */}
      <div className="mt-10">
        <h3 className="font-semibold text-lg text-blue-600">Received Documents</h3>
        <div className="flex items-center space-x-4 mt-5">
          <select
            name="postedAt"
            className="border rounded-md p-1 text-sm w-40"
            onChange={handleFilterChange}
            value={filter.postedAt}
          >
            <option value="">Posted At</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
          </select>
          <select
            name="paperType"
            className="border rounded-md p-1 text-sm w-40"
            onChange={handleFilterChange}
            value={filter.paperType}
          >
            <option value="">Paper Type</option>
            <option value="researchPaper">Research Paper</option>
            <option value="thesis">Thesis</option>
          </select>
          <select
            name="supervisor"
            className="border rounded-md p-1 text-sm w-40"
            onChange={handleFilterChange}
            value={filter.supervisor}
          >
            <option value="">Supervisor</option>
            <option value="Dr. Kebede">Dr. Kebede</option>
            <option value="Dr. Abebe">Dr. Abebe</option>
          </select>
        </div>

        <div className="mt-6">
          <h4 className="text-blue-600 font-semibold text-lg">Documents</h4>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <img
                  src={DocumentImage}
                  alt="Document"
                  className="h-20 w-20 object-cover rounded-md"
                />
                <h5 className="text-sm mt-2">Document {i}</h5>
              </div>
            ))}
          </div>
        </div>

        {/* See More Button */}
        <button className="bg-blue-600 text-white p-2 rounded-lg mt-4 w-full">
          See More
        </button>
      </div>
    </main>
  );
};

export default StudentDetails;
