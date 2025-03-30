"use client";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <ul>
        <li className="mb-2"><a href="/dashboard" className="hover:underline">Dashboard</a></li>
        <li><a href="/settings" className="hover:underline">Settings</a></li>
      </ul>
    </aside>
  );
}
