import Header from "../Header";
import Signup from "./Signup";

export default function SignupPage(){
    return(
        <div className="max-w-[600px] mx-auto my-[60px] pl-[15px] pr-[15px]">
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/login"
            />
            <Signup/>
        </div>
    )
}