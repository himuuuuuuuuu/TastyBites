import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 font-Poppins mt-8 text-sm flex justify-between sticky">
      <div className="container mx-auto flex flex-col items-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Chirag Solanki</p>
        <p className="mb-2">
          Reach me at{" "}
          <a href="mailto:sc494802@gmail.com" className="underline">
            <HiOutlineMail className="inline-block text-xl mr-2" />
            sc494802@gmail.com
          </a>
        </p>
        <div className="flex mb-2">
          <p className="mr-2">Connect with me:</p>
          <a
            href="https://github.com/chirag-solanki6804/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 mr-2"
          >
            <AiFillGithub className="inline-block text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/chiragagu6/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <AiFillLinkedin className="inline-block text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
