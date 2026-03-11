import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BCA</h4>
                <h5>Lachoo Memorial College of Science & Technology, Jodhpur</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Completed Bachelor of Computer Applications with a strong foundation in computer science, programming, and software development.
              During this period, I developed skills in core programming languages, data structures, and database management.
              Actively explored emerging technologies and built small-scale software projects that strengthened my understanding of real-world problem solving using code.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MCA (AI/ML)</h4>
                <h5>DY Patil International University, Pune</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed Master of Computer Applications with specialization in Artificial Intelligence and Machine Learning.
              Focused on advanced topics such as machine learning algorithms, deep learning, natural language processing, and data analytics.
              Worked on AI-based academic projects involving model development, data preprocessing, and predictive systems, gaining hands-on experience in building intelligent applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Machine Learning Engineer</h4>
                <h5>Exponentia.ai</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Working as a Machine Learning Engineer focusing on building enterprise AI solutions and intelligent automation systems.
              Designing and implementing AI workflows, LLM-based applications, and multi-agent architectures.
              Developing scalable AI solutions using modern frameworks, integrating cloud services, and optimizing models for production-ready deployments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
