export default function StudentPerformanceDashboard() {

  import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentPerformanceDashboard() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/students")

      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="text-3xl text-center mt-20 font-bold">
        Loading Student Data...
      </div>
    );
  }

  const topper = students.reduce((prev, current) =>
    prev.Average > current.Average ? prev : current
  );

  const failedStudents = students.filter(
    (student) => student.Grade === "Fail"
  );

  const overallAverage = (
    students.reduce(
      (sum, student) => sum + student.Average,
      0
    ) / students.length
  ).toFixed(2);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Student Performance Analysis Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Students
          </h2>

          <p className="text-3xl font-bold mt-2">
            {students.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            Overall Average
          </h2>

          <p className="text-3xl font-bold mt-2">
            {overallAverage}%
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            Topper
          </h2>

          <p className="text-2xl font-bold mt-2">
            {topper.Name}
          </p>

          <p className="text-gray-500">
            {topper.Average}%
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            Failed Students
          </h2>

          <p className="text-3xl font-bold mt-2">
            {failedStudents.length}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto mb-8">

        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Student Records
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-100 text-left">

              <th className="p-3">Name</th>
              <th className="p-3">Math</th>
              <th className="p-3">Science</th>
              <th className="p-3">English</th>
              <th className="p-3">Attendance</th>
              <th className="p-3">Average</th>
              <th className="p-3">Grade</th>

            </tr>

          </thead>

          <tbody>

            {students.map((student, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3 font-medium">
                  {student.Name}
                </td>

                <td className="p-3">
                  {student.Math}
                </td>

                <td className="p-3">
                  {student.Science}
                </td>

                <td className="p-3">
                  {student.English}
                </td>

                <td className="p-3">
                  {student.Attendance}%
                </td>

                <td className="p-3">
                  {student.Average}%
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm
                    ${student.Grade === 'A'
                      ? 'bg-green-500'
                      : student.Grade === 'B'
                      ? 'bg-blue-500'
                      : student.Grade === 'C'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                    }`}
                  >

                    {student.Grade}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Performance Chart
        </h2>

        <div className="space-y-4">

          {students.map((student, index) => (

            <div key={index}>

              <div className="flex justify-between mb-1">

                <span className="font-medium">
                  {student.Name}
                </span>

                <span>
                  {student.Average}%
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-5">

                <div
                  className="bg-blue-600 h-5 rounded-full"
                  style={{
                    width: `${student.Average}%`
                  }}
                ></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}}