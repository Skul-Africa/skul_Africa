export default function RightPanel() {
  return (
    <aside className="fixed right-0 top-0 h-screen bg-[#f9f9ff] w-52 sm:w-64 p-4 border-l border-gray-200 flex flex-col">
      {/* Quick Action Panel */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-2">Quick Action Panel</h3>
        <p className="text-xs text-gray-500 mb-4">You have 932 students</p>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm text-sm hover:bg-gray-50">
            ➕ Add Teacher
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm text-sm hover:bg-gray-50">
            ➕ Add Class
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm text-sm hover:bg-gray-50">
            ➕ Add Subject
          </button>
        </div>
        <button className="w-full mt-3 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
          Enroll Student
        </button>
        <button className="w-full mt-2 py-2 rounded-full bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600">
          Schedule Exam
        </button>
      </div>

      {/* Recent Activities */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="font-semibold text-sm mb-3">Recent Activities</h3>
        <ul className="space-y-3 text-xs">
          <li className="flex items-start gap-2">
            ✅ <div>2 new students enrolled in Grade 9 <br /><span className="text-gray-500">12:45 PM</span></div>
          </li>
          <li className="flex items-start gap-2">
            📘 <div>Biology added to SS2 subjects <br /><span className="text-gray-500">10:34 AM</span></div>
          </li>
          <li className="flex items-start gap-2">
            👨‍🏫 <div>Mr. James reassigned to Grade 10 <br /><span className="text-gray-500">5:45 PM</span></div>
          </li>
          <li className="flex items-start gap-2">
            📘 <div>Further Maths added to SS3 subjects <br /><span className="text-gray-500">2:45 PM</span></div>
          </li>
        </ul>
        <button className="mt-4 w-full text-center text-sm text-blue-600 font-semibold hover:underline">
          View More
        </button>
      </div>
    </aside>
  );
}
