import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/auth/login", data);

localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.data));

const role = res.data.data.role;

alert("Login Successful!");

if (role === "ADMIN") {
  navigate("/admin");
} else if (role === "TECHNICIAN") {
  navigate("/technician");
} else {
  navigate("/customer");
}
    } catch (error: any) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">
            <label>Email</label>

            <input
              type="email"
              className="w-full border rounded-lg p-3"
              {...register("email")}
            />
          </div>

          <div className="mb-6">
            <label>Password</label>

            <input
              type="password"
              className="w-full border rounded-lg p-3"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}