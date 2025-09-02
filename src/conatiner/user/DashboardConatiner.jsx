import { Users, Activity, BarChart3, Settings } from "lucide-react";

const DashboardContainer = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Active Sessions",
      value: "892",
      icon: Activity,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "New Registrations",
      value: "156",
      icon: BarChart3,
      color: "bg-purple-500",
      change: "+24%",
    },
    {
      title: "System Health",
      value: "99.9%",
      icon: Settings,
      color: "bg-orange-500",
      change: "+0.1%",
    },
    {
      title: "Total User",
      value: "1,34",
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
  ];

  const recent = [
    {
      action: "New user registered",
      who: "john.doe@example.com",
      when: "2 min ago",
    },
    { action: "System backup completed", who: "System", when: "15 min ago" },
    {
      action: "Security scan finished",
      who: "Security Bot",
      when: "1 hour ago",
    },
    { action: "Database optimized", who: "Admin", when: "2 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard (Dummy)</h1>
        <p className="text-blue-100">
          Quick demo view for testing layout and wiring
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{s.title}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
              <span className="text-xs text-green-600">{s.change}</span>
            </div>
            <div className={`${s.color} text-white p-3 rounded-lg`}>
              <s.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="divide-y">
            {recent.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.who}</p>
                </div>
                <span className="text-xs text-gray-400">{item.when}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg">
              Create User
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg">
              View Reports
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg">
              Sync Data
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
