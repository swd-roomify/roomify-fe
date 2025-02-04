import { useState } from "react";
import "../../assets/style/css/signin.css";
import avatar1 from "/assets/sprites/character.png";
import avatar2 from "/assets/sprites/character2.png";
import avatar3 from "/assets/sprites/character3.png";

export default function SignIn() {
    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Signed In!");
        }, 2000);
    };

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-700 to-blue-300 relative">
            <div className="absolute inset-0 bg-[url('/pixel-bg.png')] bg-cover opacity-30"></div>

            <div className="login-form relative bg-white p-20 rounded-2xl w-1/4 text-center">
                <div className="flex justify-center space-x-4 mb-4">
                    <img src={avatar1} alt="avatar1" className="h-8" />
                    <img src={avatar2} alt="avatar2" className="h-8" />
                    <img src={avatar3} alt="avatar3" className="h-8" />
                </div>

                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Welcome to <span className="text-blue-500">Roomify</span>
                </h2>

                <button className="w-full border-2 border-black py-3 rounded-lg flex items-center justify-center mb-4 hover:bg-gray-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 262"
                        id="google"
                        className="mr-2"
                    >
                        <path
                            fill="#4285F4"
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        ></path>
                        <path
                            fill="#34A853"
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        ></path>
                        <path
                            fill="#FBBC05"
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        ></path>
                        <path
                            fill="#EB4335"
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        ></path>
                    </svg>
                    <span>Sign in with Google</span>
                </button>

                <button className="w-full border-2 border-black py-3 rounded-lg flex items-center justify-center mb-4 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 64 64"
                        id="github"
                        className="mr-2"
                    >
                        <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                    </svg>
                    <span>Sign in with Github</span>
                </button>

                <p className="text-gray-400 text-sm mb-2">OR</p>

                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleSignIn}
                    className="signin-button w-full bg-green-500 text-white py-2 rounded-lg mt-4 flex justify-center items-center"
                >
                    {loading ? (
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        "Continue"
                    )}
                </button>
            </div>
        </div>
    );
}
