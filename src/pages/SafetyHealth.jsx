import React, { useRef, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import video from "../assets/img/01_creativity_for_all_445x239.mp4";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SafetyHealth = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const videoRef = useRef(null);

  const handleButtonClick = () => {
    debugger;
    // if (currentPage <= 4) {
    if (currentPage === 0 && !videoEnded) {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
      setVideoEnded(false);
    }
    // } else if (videoEnded && currentPage === 4) {
    //   console.log("Completed");
    // } else {
    // }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setIsPlaying(false);
  };

  const renderSection = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="video-section">
            <video
              ref={videoRef}
              controls
              width="100%"
              height="400"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleVideoEnd}
            >
              <source type="video/mp4" src={video} />
            </video>
          </div>
        );
      case 1:
        return <div>Content for Page 2 </div>;
      case 2:
        return <div>Content for Page 3</div>;
      case 3:
        return <div>Content for Page 4</div>;
      case 4:
        return <div>Content for Page 5</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  {renderSection()}

                  {currentPage === 0 ? (
                    <div className="play-button">
                      <button onClick={handleButtonClick} className="play-btn">
                        {isPlaying ? (
                          <i className="bi bi-pause-circle"></i>
                        ) : (
                          <i className="bi bi-play-circle"></i>
                        )}{" "}
                        {isPlaying
                          ? "Pause Video"
                          : videoEnded
                          ? "Next"
                          : "Play Video"}
                      </button>
                    </div>
                  ) : currentPage > 0 && currentPage <= 4 ? (
                    <div className="play-button">
                      <button onClick={handleButtonClick} className="play-btn">
                        {currentPage === 4 ? "Completed" : "Next"}
                      </button>
                    </div>
                  ) : null}
                </CardBody>
              </Card>{" "}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SafetyHealth;
