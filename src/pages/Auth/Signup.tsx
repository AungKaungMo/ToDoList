import AuthButton from "../../components/Auth/AuthButton";

const Signup = () => {
  return (
    <div>
      <div className="text-center">
        <h3 className="mt-14 text-2xl">Create an account</h3>
        <span className="text-netural-text-weak text-sm">
          Lorem ipsum dolar sit armet
        </span>
      </div>
      <AuthButton text="Signup with Google" />
    </div>
  );
};

export default Signup;
