import { testimonials } from "./AboutUsElements";
import { Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";
const AboutUs = () => {
  let navigate = useNavigate();
  const routeChange = (url) => {
    // Check if the URL is an external link (e.g., starts with 'http')
    if (url.startsWith("http")) {
      window.open(url, "_blank"); // Open external link in a new tab
    } else {
      navigate(url); // Use react-router-dom navigate for internal routes
    }
  };
  return (
    <div className="mt-10 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        The Team behind with this Project
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="bg-neutral rounded-md p-6 text-md border border-neutral-800 font-thin hover:border-green-400 cards transition ease-in-out hover:scale-105 duration-300">
              <div className="flex flex-col mb-8 justify-center items-start font-medium">
                <div className="flex flex-row justify-between items-center w-full">
                  <h6>{testimonial.user}</h6>
                  <Linkedin
                    onClick={() => routeChange(testimonial.url)}
                    className="text-blue-400 border rounded-lg p-1 border-transparent hover:bg-neutral-900"
                    size={35}
                  />
                </div>
                <span className="text-sm font-normal bg-gradient-to-r from-green-700 to-green-400 text-transparent bg-clip-text">
                  {testimonial.company}
                </span>
              </div>
              <p>{testimonial.text}</p>
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
