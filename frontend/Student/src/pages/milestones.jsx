import React from "react";

const MilestoneProgress = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      {/* Left Section */}
      <div className="w-full lg:w-1/3">
        <div className="space-y-6">
          <div className="text-xl font-bold">Stage 1</div>
          <ul className="space-y-2 text-gray-700">
            <li>Course completion</li>
            <li>Identify Area of Research</li>
            <li>Develop and Defend Research proposal</li>
          </ul>
        </div>

        <div className="space-y-6 mt-8">
          <div className="text-xl font-bold">Stage 2</div>
          <ul className="space-y-2">
            <li className="text-gray-700">Completion of Seminar work</li>
            <li className="text-red-600 font-bold">Progress presentation 1</li>
            <li className="text-gray-700">Prepare and draft preliminary publication</li>
          </ul>
        </div>

        <div className="space-y-6 mt-8 text-gray-400">
          <div className="text-xl font-bold">Stage 3</div>
          <ul className="space-y-2">
            <li>Conduct advanced experiments</li>
            <li>Generate results and prepare research paper</li>
            <li>Progress presentation 2</li>
          </ul>
        </div>

        <div className="space-y-6 mt-8 text-gray-400">
          <div className="text-xl font-bold">Stage 4</div>
          <ul className="space-y-2">
            <li>Prepare and submit PhD progress to SECE</li>
            <li>Submit final dissertation</li>
            <li>Defend the dissertation</li>
          </ul>
        </div>
      </div>

      {/* Center Section */}
      <div className="w-full lg:w-1/3 border border-blue-400 rounded-md p-6">
        <div className="text-lg font-bold">Current Milestone</div>
        <div className="text-xl font-bold text-blue-500 mt-4">Progress Presentation 1</div>
        <p className="text-gray-700 mt-4">
          <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-700 mt-4">
          <strong>Requirement:</strong> Lorem Ipsum
        </p>
        <div className="mt-4">
          <p className="text-gray-700">
            <strong>Deadline:</strong> Nov-29
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong> Pending
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 flex items-center justify-center">
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-4 border-gray-200">
            <div
              className="absolute top-0 left-0 w-40 h-40 rounded-full border-4 border-blue-500"
              style={{
                clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%, 50% 50%)",
                transform: "rotate(108deg)", // Adjust the rotation for progress percentage
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">
              30%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneProgress;
