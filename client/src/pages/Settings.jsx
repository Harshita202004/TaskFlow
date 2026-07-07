import { useState } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../api/http";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [notifications, setNotifications] = useState({
    upcomingTasks: user?.notificationSettings?.upcomingTasks ?? true,
    overdueTasks: user?.notificationSettings?.overdueTasks ?? true,
    emailReminders: user?.notificationSettings?.emailReminders ?? false,
  });

  const [saving, setSaving] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await updateUser({
        ...profile,
        notificationSettings: notifications,
      });

      toast.success("Settings saved");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await updateUser(passwords);

      setPasswords({
        currentPassword: "",
        newPassword: "",
      });

      toast.success("Password changed");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">

      {/* Profile */}

      <form
        onSubmit={saveProfile}
        className="space-y-6 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6"
      >
        <h2 className="text-xl font-bold text-gray-800">
          Profile
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <label>
            <span className="font-medium text-gray-700">
              Name
            </span>

            <input
              value={profile.name}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="mt-2 w-full rounded-xl border border-orange-100 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </label>

          <label>
            <span className="font-medium text-gray-700">
              Email
            </span>

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="mt-2 w-full rounded-xl border border-orange-100 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </label>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {[
            ["upcomingTasks", "Upcoming task alerts"],
            ["overdueTasks", "Overdue task alerts"],
            ["emailReminders", "Email reminders"],
          ].map(([key, label]) => (
            <label
              key={key}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-orange-100 p-4"
            >
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    [key]: e.target.checked,
                  }))
                }
              />

              <span className="text-gray-700">
                {label}
              </span>
            </label>
          ))}

        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 disabled:bg-gray-400 sm:w-auto"
        >
          Save Settings
        </button>

      </form>

      {/* Password */}

      <form
        onSubmit={changePassword}
        className="space-y-6 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6"
      >
        <h2 className="text-xl font-bold text-gray-800">
          Change Password
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <input
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-orange-100 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-orange-100 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

        </div>

        <button
          type="submit"
          disabled={
            saving ||
            !passwords.currentPassword ||
            !passwords.newPassword
          }
          className="w-full rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 disabled:bg-gray-400 sm:w-auto"
        >
          Change Password
        </button>

      </form>

    </div>
  );
};

export default Settings;
