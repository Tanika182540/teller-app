import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth"; // Firebase Auth function
import { auth } from "../../firebase/firebase.config";
import { useAuth } from "../../routes/AuthContext";

const AuthStatus = () => {
  const [user, setUser] = useState<User | null>(null);
  const logout = useAuth()?.logout;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user when auth state changes
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  if (user) {
    return (
      <div className="flex flex-row items-center gap-4 p-2 bg-gray-100 rounded-lg shadow-md">
        <img
          src={user.photoURL ?? "default-avatar.png"} // Provide a fallback if no photoURL exists
          alt={user.displayName ?? "User's avatar"}
          className="rounded-full w-12 h-12 object-cover border-2 border-blue-500"
        />
        <div className="flex flex-col">
          <label className="text-md font-semibold text-gray-800">
            Welcome, {user.displayName}
          </label>
        </div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          onClick={() => {
            auth.signOut();
            localStorage.removeItem("user");
            logout?.();
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return <p>Please sign in</p>;
};

export default AuthStatus;
