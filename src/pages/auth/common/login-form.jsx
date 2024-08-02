import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Textinput from "@/components/ui/Textinput";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../../store/actions/authActions";
import { setUser } from "@/store/api/auth/authSlice";

const LoginForm = () => {
  const [checked, setChecked] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("me", credentials);
      const response = await fetch(
        "https://server-dashboard-zeta.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      // const success = await dispatch(login(email, password));
      const json = await response.json();
      console.log("API Response:", json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        console.log("Auth token saved to localStorage:", json.authtoken);
        dispatch(setUser({ name: "dummy" }));
        navigate("/dashboard");
      } else {
        console.error("Invalid credentials:", json.message);
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const email = event.target.email.value;
  //   const password = event.target.password.value;

  //   // Dispatch the login action
  //   const success = await dispatch(login(email, password));

  //   if (success) {
  //     navigate("/dashboard");
  //   }
  // };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textinput
          name="email"
          htmlFor="email"
          id="email"
          label="Email"
          type="email"
          value="vishalgour.mj@gmail.com"
          register={register}
          onChange={onChange}
          error={errors.email}
          className="h-[48px] form-control"
        />
        <Textinput
          name="password"
          htmlFor="password"
          id="password"
          label="Password"
          type="password"
          value="Vishal1"
          onChange={onChange}
          register={register}
          error={errors.password}
          className="h-[48px] form-control"
        />
        <div className="flex justify-between">
          <Checkbox
            value={checked}
            onChange={() => setChecked(!checked)}
            label="Keep me signed in"
          />
          <Link
            to="/forgot-password"
            className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          text="Sign in"
          className="btn btn-dark block w-full text-center"
        />
      </form>
    </div>
  );
};

export default LoginForm;
