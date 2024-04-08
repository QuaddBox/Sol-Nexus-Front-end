/* eslint-disable react/prop-types */
import { Logo } from "../components";
import { Link } from "react-router-dom";

const NotFoundPage = ({title}) => {
  return (
    <>
      <header className="dashboard__header">
        <Logo />
      </header>
      <div className="px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-600 sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-300 font-bold">{title}</p>

          <Link
            to={"/"}
            className="mt-6 inline-block rounded bg-primary-color px-5 py-3 text-sm font-medium text-white bg-purple-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;