import React from "react";
import axios from "axios";
import { Jumbotron } from "./migration";
import Spline from '@splinetool/react-spline';

const pictureLinkRegex = new RegExp(
  /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
);

const AboutMe = ({ heading, message, link, imgSize, resume }) => {
  const [profilePicUrl, setProfilePicUrl] = React.useState("");
  const [showPic, setShowPic] = React.useState(Boolean(link));
  // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  React.useEffect(() => {
    const handleRequest = async () => {
      const instaLink = "https://www.instagram.com/";
      const instaQuery = "/?__a=1";
      try {
        const response = await axios.get(instaLink + link + instaQuery);
        setProfilePicUrl(response.data.graphql.user.profile_pic_url_hd);
      } catch (error) {
        setShowPic(false);
        console.error(error.message);
      }
    };

    if (link && !pictureLinkRegex.test(link)) {
      handleRequest();
    } else {
      setProfilePicUrl(link);
    }
  }, [link]);

  const handleResumeDownload = () => {
    // Replace with logic to download the resume file
    // For example, if the resume is stored locally in the project:
    const downloadLink = resume; // Assuming resume is the path to the resume file
    window.open(downloadLink, '_blank');
  };


  return (
    <Jumbotron id="aboutme" className="m-0" style={{ position: "relative" }}>
    <div className="container row">
      <div className="col-12">
        <Spline scene="https://prod.spline.design/J06cuV8Es5zG9bwP/scene.splinecode" style={{ position: "absolute", top: 0, left: -1000, width: "100%", height: "100%" }}>
        </Spline>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 className="display-4 mb-5 text-center">{heading}</h2>
          <p className="lead text-center">{message}</p>
          {resume && (
            <p className="lead text-center">
             <button
                className="btn btn-outline-dark btn-lg"
                onClick={handleResumeDownload}
                aria-label="Download Resume"
              >
                Resume
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  </Jumbotron>
);
};

export default AboutMe;
