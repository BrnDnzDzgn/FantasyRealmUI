import React from "react";

export function Profile() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-gray-700"
            src="https://via.placeholder.com/100"
            alt="Profile Avatar"
          />
          <h2 className="mt-4 text-2xl font-bold">John Doe</h2>
          <p className="text-sm text-gray-400">Frontend Developer</p>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              defaultValue="johndoe@example.com"
              className="w-full mt-1 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Bio</label>
            <textarea
              defaultValue="Passionate about nothing as he should."
              className="w-full mt-1 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold mt-4">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}