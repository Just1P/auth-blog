import { useState } from "react";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignUpForm";
import authImage from "../assets/images/auth-img.jpg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center ">
        {isLogin ? <SigninForm /> : <SignupForm />}

        <p className="text-gray-600 mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-500 hover:underline"
              >
                Sign up for free
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-500 hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>

      <div
        className="w-1/2 bg-cover bg-center relative "
        style={{ backgroundImage: `url(${authImage})` }}
      ></div>
    </div>
  );
};

export default AuthPage;
