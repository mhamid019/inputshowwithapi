"use client";
import { useState } from "react";

export default function Input() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://68c294e3f9928dbf33eef1c5.mockapi.io/Students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, email }),
      });
      alert("Student added!");
      setName("");
      setAge("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error adding student");
    }
  };

  return (
    <div className="flex items-center flex-col">
      <h2 className="text-xl font-bold mb-4 text-white">Add Student</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          className="border p-2 rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
          Save
        </button>
      </form>
    </div>
  );
}
