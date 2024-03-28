/** @format */
import "../styles/contact.scss";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { IoArrowForwardOutline } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="contact">
      <section className="contact__hero">
        {/* <img src="src\assets\dots.svg" alt="" /> */}
        <div className="contact__hero__content">
          <div className="contact__us__tag">
            <span>Contact Us</span>
          </div>
          <header className="contact__hero__content--heading">
            <h1>
              Have <span>questions</span> or want to get in touch with us?
            </h1>
            <p>Feel free to reach out through any of the following methods</p>
          </header>
        </div>
      </section>
      <section className="contactForm">
        <div className="contactForm__infoContainer">
          <div>
            <div className="contactForm__heading">
              <h1>Contact Form</h1>
              <p>
                Fill out the form below, and we will get back to you shortly
              </p>
            </div>
            <div className="contactForm__socialMedia">
              <h3>Follow Us on Social Media</h3>
              <ul className="contactForm__socialMediaIcons">
                <li>
                  <AiFillLinkedin size={"1.25em"} />
                </li>
                <li>
                  <AiFillInstagram size={"1.25em"} />
                </li>
                <li>
                  <AiFillTwitterCircle size={"1.25em"} />
                </li>
              </ul>
            </div>
          </div>
          <ul className="contactForm__infoList">
            <li className="contactForm__info">
              <div>
                <p>You can email us here</p>
                <h4>support@nexus.com</h4>
              </div>
              <IoArrowForwardOutline />
            </li>
            
            <li className="contactForm__info">
              <div>
                <p>Give us a call here</p>
                <h4>+234 9028 3824 13</h4>
              </div>
              <IoArrowForwardOutline />
            </li>
            <li className="contactForm__info">
              <div>
                <p>Office Hours</p>
                <h4>9:00am - 6:00pm</h4>
              </div>
              <IoArrowForwardOutline />
            </li>
          </ul>
        </div>
        <div className="contactForm__form">
          <form action="">
            <div className="grid">
              <div>
                <label htmlFor="">First Name</label>
                <input type="text" placeholder="Enter First Name" />
              </div>
              <div>
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Last Name"
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter your Email"
                />
              </div>
              <div>
                <label htmlFor="">Phone</label>
                <input type="tel" placeholder="Enter Phone Number" />
              </div>
            </div>
            <div className="subject-container">
              <label htmlFor="">Subject</label>
              <input type="text" placeholder="Enter your Subject" />
            </div>
            <div className="message-container">
              <label htmlFor="">Message</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Enter your Message here..."
              ></textarea>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
