import { Link } from "react-router";
import logo from "../../assets/logo.png";
export default function Logo({ w }) {
  return (
    <Link to="/" className="flex h-20 mb-4 justify-center flex-col">
      <img style={{ width: w }} src={logo} alt="Strideora logo" />
    </Link>
  );
}
