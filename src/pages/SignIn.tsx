import SignInModal from "components/SignInModal"
import UnAuthNavLayout from "layouts/UnAuthNavLayout";
import { useEffect } from "react";
import { useAuthStore } from "stores/authStore";
import { useSignInModalStore } from "stores/signInModalStore";
import SignInCoverImage from "assets/sign-in-cover.jpg"

const SignIn = () => {
  const { setIsOpenSignIn } = useSignInModalStore();
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    setIsOpenSignIn(!isLoggedIn())
  }, [])

  return (
    <UnAuthNavLayout>
      <div className="h-screen w-full" style={{
        backgroundImage: `url(${SignInCoverImage})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}>
        <SignInModal disableAutoClose={true} />
      </div>
    </UnAuthNavLayout>
  )
}

export default SignIn