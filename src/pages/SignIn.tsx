import SignInModal from "components/SignInModal"
import UnAuthNavLayout from "layouts/UnAuthNavLayout";
import { useEffect } from "react";
import { useAuthStore } from "stores/authStore";
import { useSignInModalStore } from "stores/signInModalStore";

const SignIn = () => {
  const { setIsOpenSignIn } = useSignInModalStore();
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    setIsOpenSignIn(!isLoggedIn())
  }, [])

  return (
    <UnAuthNavLayout>
      <SignInModal />
    </UnAuthNavLayout>
  )
}

export default SignIn