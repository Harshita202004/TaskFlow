import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <Card className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            TaskFlow
          </h1>

          <p className="text-gray-500 mt-2">
            Smart Daily Task & Productivity Tracker
          </p>

        </div>

        <h2 className="text-2xl font-semibold mb-6">
          Welcome Back 👋
        </h2>

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <div className="flex justify-between items-center mb-6">

          <label className="flex items-center gap-2 text-sm text-gray-600">

            <input type="checkbox" />

            Remember Me

          </label>

          <button className="text-blue-600 hover:underline text-sm">
            Forgot Password?
          </button>

        </div>

        <Button>
          Login
        </Button>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <span className="text-blue-600 cursor-pointer ml-2">
            Sign Up
          </span>

        </p>

      </Card>

    </div>
  );
}

export default Login;