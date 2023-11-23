import Header from "../Header"
import Login from "./Login"

export default function LoginPage(){
    return(
        <div className="max-w-[600px] mx-auto my-[60px] pl-[15px] pr-[15px]">
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </div>
    )
}