import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import GoogleLogo from "../../assets/google-logo.png";
import { useAuth } from "../../routes/AuthContext";
import View from "../../shared/components/View";
import { successToast, errorToast } from "../../shared/components/Toast";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const login = useAuth()?.login;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      login?.(user);
      successToast("Login Success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      errorToast("Error signing in with Google: " + error.message);
    }
  };

  return (
    <View>
      <div className="w-full max-w-2xl h-[672px] self-center p-6 bg-white shadow-md rounded-2xl flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl text-blue-500 mb-4">Teller Assignment</h1>
        <button
          onClick={signInWithGoogle}
          className="flex flex-row gap-2 bg-white size-fit py-3 px-4 rounded-lg shadow-sm items-center"
        >
          <img src={GoogleLogo} alt="Google Logo" className="size-10" /> Sign in
          with Google
        </button>
      </div>
    </View>
  );
};

export default Login;
