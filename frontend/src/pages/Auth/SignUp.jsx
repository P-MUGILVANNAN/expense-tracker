import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updateUser } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let profileImageUrl = "";

    if (!fullName) {
      setError("Full name is required");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className='w-full max-w-md mx-auto px-4 py-6 md:py-8 p'>
        <div className=''>
          <h3 className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 text-center'>
            Create an Account
          </h3>
          <p className='text-xs sm:text-sm text-gray-600 mt-1 md:mt-2 mb-4 md:mb-6 text-center'>
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp} className='space-y-3 md:space-y-4'>
            {/* Uncomment if you want to use profile photo selector */}
            {/* <div className='flex justify-center'>
              <ProfilePhotoSelector 
                image={profilePic} 
                setImage={setProfilePic} 
                size="sm:size-24 md:size-28"
              />
            </div> */}

            <div className='space-y-3 md:space-y-4'>
              <Input
                label='Full Name'
                type='text'
                placeholder='Enter your Full Name'
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                inputClassName="text-sm sm:text-base"
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label='Email Address'
                type='text'
                placeholder='Enter your email address'
                inputClassName="text-sm sm:text-base"
              />

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label='Password'
                type='password'
                placeholder='* * * * * * * *'
                inputClassName="text-sm sm:text-base"
              />
            </div>

            {error && (
              <p className='text-red-500 text-xs sm:text-sm text-center'>
                {error}
              </p>
            )}

            <button
              type='submit'
              className={`w-full btn-primary py-2 text-sm sm:text-base ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'SIGN UP'}
            </button>

            <p className='text-xs sm:text-sm text-gray-600 text-center mt-3 md:mt-4'>
              Already have an account?{" "}
              <Link 
                className='font-medium text-primary hover:underline' 
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp