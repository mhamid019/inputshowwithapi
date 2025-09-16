"use client";
import { useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
  age: string;
  email: string;
}

export default function Show() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", age: "", email: "" });

  const fetchData = async () => {
    const res = await fetch("https://68c294e3f9928dbf33eef1c5.mockapi.io/Students");
    const data = await res.json();
    setStudents(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`https://68c294e3f9928dbf33eef1c5.mockapi.io/Students/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleEdit = (student: Student) => {
    setEditingId(student.id);
    setEditData({ name: student.name, age: student.age, email: student.email });
  };

  const handleUpdate = async (id: string) => {
    await fetch(`https://68c294e3f9928dbf33eef1c5.mockapi.io/Students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditingId(null);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students List</h2>
      <div className="flex flex-col max-w-sm gap-2 m-auto">
        {students.map((student) => (
          <div
            key={student.id}
            className="border p-4 rounded shadow flex justify-between items-start"
          >
            {editingId === student.id ? (
              <div className="flex flex-col gap-2">
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="border p-1"
                />
                <input
                  value={editData.age}
                  onChange={(e) =>
                    setEditData({ ...editData, age: e.target.value })
                  }
                  className="border p-1"
                />
                <input
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="border p-1"
                />
                <button
                  onClick={() => handleUpdate(student.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Update
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-bold">{student.name}</h3>
                <p>Age: {student.age}</p>
                <p>Email: {student.email}</p>
              </div>
            )}
            <div className="flex gap-2">
              {editingId !== student.id && (
                <button
                  onClick={() => handleEdit(student)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer f-size"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer f-size"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
