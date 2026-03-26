import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, ChevronRight, ChevronLeft, Award } from 'lucide-react';

// Hardcoded JSON data based on user upload
const quizData = {
  "exam": "Merged Lean Six Sigma Yellow Belt (canonical)",
  "language": "en",
  "questions": [
    { "number": 1, "question": "The quality level associated with Six Sigma is equivalent to what defect level in parts per million?", "choices": { "A": "1.33", "B": "6", "C": "3.4", "D": "3" }, "answer": { "letter": "C", "text": "3.4 defects per million opportunities" }, "answer_provided": true },
    { "number": 2, "question": "Six Sigma was introduced by engineers at Motorola in 1986. Who made it central to his business strategy at General Electric in 1995?", "choices": { "A": "Bill Smith", "B": "Mikel Harry", "C": "Jeffrey R. Immelt", "D": "Jack Welch" }, "answer": { "letter": "D", "text": "Jack Welch" }, "answer_provided": true },
    { "number": 3, "question": "A good Problem Statement in a Project Charter describes the ____________ in the current process.", "choices": { "A": "Pain", "B": "Solution", "C": "Ideas", "D": "Project Value" }, "answer": { "letter": "A", "text": "Pain" }, "answer_provided": true },
    { "number": 4, "question": "Regarding a Project Charter all of the following are true except which?", "choices": { "A": "A Charter defines the project", "B": "A Charter identifies and values the opportunity", "C": "A Charter solves the problem", "D": "A Charter is a document that will change over time" }, "answer": { "letter": "C", "text": "A Charter solves the problem (incorrect — charter does not itself solve the problem)" }, "answer_provided": true },
    { "number": 5, "question": "Why should you perform a Kaizen event?", "choices": { "A": "To increase sales", "B": "To drive quick-hit value", "C": "To drive big projects", "D": "To reduce variation in the process" }, "answer": { "letter": "B", "text": "To drive quick-hit value" }, "answer_provided": true },
    { "number": 6, "question": "Which equation is the fundamental principle in Six Sigma methodology often referred to as 'cause and effect'?", "choices": { "A": "Y = F(x1, x2, x3, x4)", "B": "Y + Y = X", "C": "Y = F/X", "D": "X + Y = Z" }, "answer": { "letter": "A", "text": "Y = F(x1, x2, x3, x4)" }, "answer_provided": true },
    { "number": 7, "question": "Lean Six Sigma projects are driven by both internal and external customers.", "choices": { "A": "TRUE", "B": "FALSE" }, "answer": { "letter": "A", "text": "TRUE" }, "answer_provided": true },
    { "number": 8, "question": "To capture Voice of the Customer (VOC) what should the belt use to collect data?", "choices": { "A": "Case study", "B": "Survey", "C": "FMEA", "D": "Problem Statement" }, "answer": { "letter": "B", "text": "Survey" }, "answer_provided": true },
    { "number": 9, "question": "Something that does not conform to a known and accepted customer specification is defined as a ________________.", "choices": { "A": "Variance", "B": "Defect", "C": "Defective", "D": "Yield" }, "answer": { "letter": "B", "text": "Defect" }, "answer_provided": true },
    { "number": 10, "question": "What is a common characteristic of a process?", "choices": { "A": "Something that is done right the first time", "B": "Involves a group of activities where inputs produce an output", "C": "End user customer service is the sole objective", "D": "Multiple people contribute to an output" }, "answer": { "letter": "B", "text": "Involves a group of activities where inputs produce an output" }, "answer_provided": true },
    { "number": 11, "question": "When we gather Critical to Quality (CTQ) characteristics we are gathering what kind of data?", "choices": { "A": "Voice of the Customer", "B": "Elements of Waste", "C": "Process Controls", "D": "Points of Escalation" }, "answer": { "letter": "A", "text": "Voice of the Customer" }, "answer_provided": true },
    { "number": 12, "question": "Cost of Poor Quality (COPQ) includes which of the following?", "choices": { "A": "Scrap finished goods", "B": "Rework", "C": "Quality Inspection", "D": "All of these are included" }, "answer": { "letter": "D", "text": "All of these are included" }, "answer_provided": true },
    { "number": 13, "question": "COPQ does not include a portion of the appraisal cost if there is an inspection point.", "choices": { "A": "TRUE", "B": "FALSE" }, "answer": { "letter": "A", "text": "TRUE" }, "answer_provided": true },
    { "number": 14, "question": "What is the cumulative % at the 80% line as shown in the graphic?", "choices": { "A": "72.1%", "B": "80%", "C": "82.4%", "D": "89.7%" }, "answer": { "letter": "C", "text": "82.4%" }, "answer_provided": true },
    { "number": 15, "question": "The 80-20 theory (Pareto principle) — which example best illustrates it?", "choices": { "A": "20% of the issues create 80% of the problems", "B": "80% of the customers are satisfied 20% of the time", "C": "80% of the application is used", "D": "20% of the problem happens consistently" }, "answer": { "letter": "A", "text": "20% of the issues create 80% of the problems" }, "answer_provided": true },
    { "number": 16, "question": "Project metrics describe the success of project execution. Project metrics include all of the following except:", "choices": { "A": "Percent of tasks completed", "B": "Resource utilization", "C": "Timeliness of task completed or milestone reached", "D": "Number of meetings conducted to finalize a project" }, "answer": { "letter": "D", "text": "Number of meetings conducted to finalize a project (not a project execution metric)" }, "answer_provided": true },
    { "number": 17, "question": "First Time Yield (FTY) is the number of good units produced divided by the number of total units going into the process.", "choices": { "A": "TRUE", "B": "FALSE" }, "answer": { "letter": "A", "text": "TRUE" }, "answer_provided": true },
    { "number": 18, "question": "The Project Charter is useful in many ways including:", "choices": { "A": "Ensuring the Champion will assign responsible team members", "B": "Ensuring team members will support the project", "C": "Providing a consistent target for the team", "D": "Permitting the team leader to develop milestones from it" }, "answer": { "letter": "C", "text": "Providing a consistent target for the team" }, "answer_provided": true },
    { "number": 19, "question": "The Project Charter will contain a Business Case which can be defined as:", "choices": { "A": "A short summary of the strategic reason for the project", "B": "A case study of the project situation", "C": "A reasoning for the redesign of a process or product", "D": "The full arguments for the project" }, "answer": { "letter": "A", "text": "A short summary of the strategic reason for the project" }, "answer_provided": true },
    { "number": 20, "question": "Discrepancies in stakeholders' descriptions of Lead Time illustrate which concept?", "choices": { "A": "One agent is referring to an attribute measurement, whereas the other is referring to a variable measurement", "B": "Lack of insight into process capability", "C": "The lack of an operational definition being in place", "D": "The objective should focus on cycle time rather than lead time" }, "answer": { "letter": "C", "text": "The lack of an operational definition being in place" }, "answer_provided": true },
    { "number": 21, "question": "What is the objective for the use of an Affinity Diagram?", "choices": { "A": "To group ideas generated by brainstorming", "B": "To determine if a process is in control", "C": "To determine root causes", "D": "To find the best solution to the problem" }, "answer": { "letter": "A", "text": "To group ideas generated by brainstorming" }, "answer_provided": true },
    { "number": 22, "question": "Why use a Cause and Effect (fishbone) diagram?", "choices": { "A": "It's a great planning tool", "B": "It facilitates the data collection process", "C": "It shows relationships between concepts and helps structure cause theories", "D": "It allows you to create the project charter" }, "answer": { "letter": "C", "text": "It shows relationships between concepts and helps structure theories about causes" }, "answer_provided": true },
    { "number": 23, "question": "Lean seeks to organize processes to optimum levels with the primary focus being to identify and eliminate variation based on customer requirements.", "choices": { "A": "TRUE", "B": "FALSE" }, "answer": { "letter": "B", "text": "FALSE — Lean primarily focuses on eliminating waste; Six Sigma primarily targets variation" }, "answer_provided": true },
    { "number": 24, "question": "The core idea of Lean is to maximize _________ while minimizing ________.", "choices": { "A": "Customer Value, Waste", "B": "Quality, Resources", "C": "Production, Complaints", "D": "Yield, Defects" }, "answer": { "letter": "A", "text": "Customer Value, Waste" }, "answer_provided": true },
    { "number": 25, "question": "Who best defines value?", "choices": { "A": "Top Management", "B": "Stockholders", "C": "Quality Control", "D": "Customer" }, "answer": { "letter": "D", "text": "Customer" }, "answer_provided": true },
    { "number": 26, "question": "Key principles of Lean Six Sigma include:", "choices": { "A": "Focus on the customer", "B": "Remove non-value-added steps and waste", "C": "Reduce variation", "D": "All of these" }, "answer": { "letter": "D", "text": "All of these" }, "answer_provided": true },
    { "number": 27, "question": "A product waiting, not adding value on a rack is the waste of ________________.", "choices": { "A": "Motion", "B": "Transportation", "C": "Inventory", "D": "Warehouse management" }, "answer": { "letter": "C", "text": "Inventory" }, "answer_provided": true },
    { "number": 28, "question": "Performing work that adds more value than the customer is willing to pay for is the waste of ______________.", "choices": { "A": "Overproduction", "B": "Overprocessing", "C": "Defects", "D": "Motion" }, "answer": { "letter": "B", "text": "Overprocessing" }, "answer_provided": true },
    { "number": 29, "question": "The 5S's are:", "choices": { "A": "Sort, Straighten, Shine, Standardize, Sustain", "B": "Select, Straighten, Shine, Show, Standardize", "C": "Sort, Standardize, Specialize, Shine, Sustain", "D": "Shine, Straighten, Standardize, Select, Show" }, "answer": { "letter": "A", "text": "Sort, Straighten, Shine, Standardize, Sustain" }, "answer_provided": true },
    { "number": 30, "question": "A Cause and Effect diagram is useful for which of the following?", "choices": { "A": "Determining the flow of a process", "B": "Detecting shifts in a process", "C": "Developing theories based on symptoms", "D": "Arranging theories by defect count" }, "answer": { "letter": "C", "text": "Developing theories based on symptoms" }, "answer_provided": true },
    { "number": 31, "question": "Using a SIPOC in a Y = f(x) context, which applies when attempting to understand the key X's that drive Y?", "choices": { "A": "X corresponds to Input and Output measures; Y corresponds to process measures", "B": "X corresponds to Process and Output measures; Y corresponds to Input measures", "C": "X corresponds to Input and Process measures; Y corresponds to Output measures", "D": "X corresponds to Input measures; Y corresponds to Output measures" }, "answer": { "letter": "C", "text": "X corresponds to Input and Process measures; Y corresponds to Output measures" }, "answer_provided": true },
    { "number": 32, "question": "Value Stream Mapping (VSM) is used to analyze, design and manage the flow of materials and information required to bring a product to a customer.", "choices": { "A": "TRUE", "B": "FALSE" }, "answer": { "letter": "A", "text": "TRUE" }, "answer_provided": true },
    { "number": 33, "question": "The SIPOC chart:", "choices": { "A": "Helps identify customers, suppliers and requirements", "B": "Starts by defining process specifications", "C": "Is used to define service groups", "D": "Is used to map suppliers" }, "answer": { "letter": "A", "text": "Helps identify customers, suppliers and requirements" }, "answer_provided": true },
    { "number": 34, "question": "Which of the following represent the 6M's (typical manufacturing cause categories)?", "choices": { "A": "Method, Environmental conditions, People, Measurement, Machine, Materials", "B": "Method, Maintenance, People, Measurement, Machine, Materials", "C": "Method, Maintenance, Measurement, Machine, Materials, Matrix", "D": "Not represented here" }, "answer": { "letter": "A", "text": "Method, Environmental conditions (Mother Nature), People, Measurement, Machine, Materials" }, "answer_provided": true },
    { "number": 35, "question": "Based on an FMEA which key process input, if not properly controlled, would lead to the highest risk?", "choices": { "A": "Raw material", "B": "Cleaning solution", "C": "Fixturing", "D": "Component", "E": "Order of Assembly", "F": "Wrong Order" }, "answer": null, "answer_provided": false },
    { "number": 36, "question": "Which is NOT an objective of an FMEA?", "choices": { "A": "Reduce risk", "B": "Decrease variation", "C": "Increase sigma level", "D": "Improve safety and reliability" }, "answer": { "letter": "C", "text": "Increase sigma level (not an FMEA objective directly)" }, "answer_provided": true },
    { "number": 37, "question": "Potential failures in an automobile air bag assembly process are best identified using a:", "choices": { "A": "Process FMEA", "B": "Design FMEA", "C": "Safety FMEA", "D": "Error FMEA" }, "answer": { "letter": "A", "text": "Process FMEA" }, "answer_provided": true },
    { "number": 38, "question": "Discrete variable data is a set of numbers that:", "choices": { "A": "Can potentially take on any value", "B": "Are presented as decimal values", "C": "Are measured by counting (e.g., number of defects)", "D": "Contain data types such as units of time or interest rates" }, "answer": { "letter": "C", "text": "Are measured by counting (e.g., number of defects)" }, "answer_provided": true },
    { "number": 39, "question": "Which statistic best describes the central tendency of a sample set of data?", "choices": { "A": "Mode", "B": "Mean", "C": "Standard Deviation", "D": "None of these" }, "answer": { "letter": "B", "text": "Mean" }, "answer_provided": true },
    { "number": 40, "question": "Special cause of process variation is:", "choices": { "A": "A normal event", "B": "Only changeable with corporate quality objectives", "C": "Assignable to a correctable problem", "D": "Inherent in the process" }, "answer": { "letter": "C", "text": "Assignable to a correctable problem" }, "answer_provided": true },
    { "number": 41, "question": "What is the mid-point or 50th percentile of a distribution of data?", "choices": { "A": "Median", "B": "Mode", "C": "Range", "D": "Variance" }, "answer": { "letter": "A", "text": "Median" }, "answer_provided": true },
    { "number": 42, "question": "Which assumption is FALSE for a Normal Distribution?", "choices": { "A": "The family is differentiated by mean μ and standard deviation σ", "B": "The highest point is at the mean (also median & mode)", "C": "The mean can be negative, zero or positive", "D": "Smaller σ results in wider, flatter curves showing more variability" }, "answer": { "letter": "D", "text": "Statement D is false (smaller σ yields narrower, taller curve, not wider/flatter)" }, "answer_provided": true },
    { "number": 43, "question": "A histogram is also known as a:", "choices": { "A": "Relative Frequency Graph", "B": "Central Tendency Diagram", "C": "Pareto Chart", "D": "Bar Chart" }, "answer": { "letter": "A", "text": "Relative Frequency Graph" }, "answer_provided": true },
    { "number": 44, "question": "Referring to a provided graphic, does there appear to be a difference between customers?", "choices": { "A": "YES", "B": "NO", "C": "Some difference", "D": "Need more data" }, "answer": null, "answer_provided": false },
    { "number": 45, "question": "In which of these graphs does the input variable X have the highest positive correlation with the output variable Y?", "choices": { "A": "A", "B": "B", "C": "C", "D": "D" }, "answer": null, "answer_provided": false },
    { "number": 46, "question": "Which tool is used to assess errors due to inaccuracy of a Measurement System?", "choices": { "A": "MSA", "B": "FMEA", "C": "Anderson Darling", "D": "P-value" }, "answer": { "letter": "A", "text": "MSA (Measurement System Analysis)" }, "answer_provided": true },
    { "number": 47, "question": "What are the components of Accuracy when conducting an MSA?", "choices": { "A": "Repeatability, Gage Calibration", "B": "Reproducibility, min 30 points", "C": "Stability, Linearity, Bias", "D": "Precision, min 30 days of data" }, "answer": { "letter": "C", "text": "Stability, Linearity, Bias" }, "answer_provided": true },
    { "number": 48, "question": "Which is a criterion for acceptance of a measurement system?", "choices": { "A": "R&R < 10% of process variation", "B": "R&R < 10% of process tolerances", "C": "Discrimination > 8 or 10%", "D": "Each of these is correct" }, "answer": { "letter": "D", "text": "Each of these is correct (common acceptance criteria)" }, "answer_provided": true },
    { "number": 49, "question": "You measure coating thickness with 10 sample points: 80, 90, 56, 72, 80, 80, 92, 55, 50, 75. Client spec is 70 ± 25 mm. What can you conclude about process stability?", "choices": { "A": "Process is stable", "B": "Process is unstable", "C": "Need more data to conclude", "D": "Process is capable", "E": "Process is not capable" }, "answer": { "letter": "C", "text": "It would be prudent to gather more data to reach a reliable conclusion" }, "answer_provided": true },
    { "number": 50, "question": "If process nominal is at mean and spec limits are ±3σ, what is the Cpk?", "choices": { "A": "-0.25", "B": "1", "C": "1.33", "D": "1.67" }, "answer": { "letter": "B", "text": "1" }, "answer_provided": true },
    { "number": 51, "question": "Over time the process mean is normally expected to drift approximately:", "choices": { "A": "About 6 standard deviations", "B": "About 3 standard deviations", "C": "About σ = 1.5 (1.5 sigma shift)", "D": "Toward the upper specification limit" }, "answer": { "letter": "C", "text": "About 1.5 sigma (common engineering assumption used in Six Sigma)" }, "answer_provided": true },
    { "number": 52, "question": "Which are needed to calculate the process capability index Cp?", "choices": { "A": "Specification limits and the mean", "B": "Specification limits and σ (sigma)", "C": "Process mean and σ (sigma)", "D": "Upper and lower specification limits" }, "answer": { "letter": "B", "text": "Specification limits and σ (sigma)" }, "answer_provided": true },
    { "number": 53, "question": "What type of monitoring tools are a caliper (variable) and a go/no-go gage (attribute)?", "choices": { "A": "Both attribute", "B": "Both variable", "C": "Caliper attribute + go/no-go variable", "D": "Caliper variable + go/no-go attribute" }, "answer": { "letter": "D", "text": "Caliper is a variable tool; go/no-go gage is an attribute tool" }, "answer_provided": true },
    { "number": 54, "question": "The 5S system is typically put in place to temporarily sustain workplace efficiency.", "choices": { "A": "TRUE", "B": "FALSE" }, "answer": { "letter": "B", "text": "FALSE — 5S is intended to create sustained workplace organization and discipline" }, "answer_provided": true },
    { "number": 55, "question": "Withdrawal Kanban authorizes conveyance of parts to a ______ process.", "choices": { "A": "Upstream", "B": "Downstream", "C": "Pacemaker", "D": "Logistical" }, "answer": { "letter": "B", "text": "Downstream" }, "answer_provided": true },
    { "number": 56, "question": "Which of the following is NOT an example of Poka-yoke outside the workplace?", "choices": { "A": "Microwaves turn off when door open", "B": "Elevators sense doorway obstruction", "C": "Washing machines only start when door closed", "D": "Machine guards prevent reaching into machinery" }, "answer": { "letter": "D", "text": "Machine guards are safety devices but are not typically classified as everyday 'poka-yoke' examples in the same sense as the others (others are classic mistake-proofing); however this depends on interpretation. The exam answer commonly expected: D" }, "answer_provided": true },
    { "number": 57, "question": "Poka-yoke can be implemented at any step of a manufacturing process where something can go wrong.", "choices": { "A": "TRUE", "B": "FALSE" }, "answer": { "letter": "A", "text": "TRUE" }, "answer_provided": true },
    { "number": 58, "question": "What rating criteria is used on an X-Y Matrix?", "choices": { "A": "Time, Cost, Impact", "B": "Savings, Resources, Delivery Time", "C": "Defects, VOC, Cycle Time", "D": "Cost, Impact, VOC" }, "answer": { "letter": "D", "text": "Cost, Impact, VOC (common X–Y matrix criteria; answers may vary but D is typical)" }, "answer_provided": true },
    { "number": 59, "question": "What departments or personnel require Lean Six Sigma training?", "choices": { "A": "All departments", "B": "Those impacted by project improvements and the Control Plan", "C": "Only those impacted by new technology", "D": "All senior staff members" }, "answer": { "letter": "B", "text": "Those impacted by the project improvements and by the Control Plan" }, "answer_provided": true },
    { "number": 60, "question": "Which are recommended tools to monitor sustainment of process improvements?", "choices": { "A": "Control Charts, Pareto Charts, Visual Management", "B": "Regression Analysis, Designed Experiments", "C": "Knowledge Tests, Check sheets, Mistake records", "D": "Continuous observation only" }, "answer": { "letter": "A", "text": "Control Charts, Pareto Charts, Visual Management" }, "answer_provided": true }
  ]
};

const TOTAL_QUESTIONS = 15;
const EXAM_TIME_SECONDS = 30 * 60; // 30 minutes for 15 questions (2 mins per question standard)

export default function App() {
  const [appState, setAppState] = useState('start'); // 'start', 'quiz', 'results'
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME_SECONDS);
  const [score, setScore] = useState(0);

  // Filter out questions without answers (e.g. ones that required graphics)
  const validQuestions = quizData.questions.filter(q => q.answer_provided && q.answer !== null);

  useEffect(() => {
    let timerId;
    if (appState === 'quiz' && timeLeft > 0) {
      timerId = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (appState === 'quiz' && timeLeft === 0) {
      submitQuiz();
    }
    return () => clearTimeout(timerId);
  }, [timeLeft, appState]);

  const generateQuiz = () => {
    // Fisher-Yates shuffle
    const shuffled = [...validQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setCurrentQuestions(shuffled.slice(0, TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeLeft(EXAM_TIME_SECONDS);
    setAppState('quiz');
    window.scrollTo(0, 0);
  };

  const handleSelectAnswer = (choice) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: choice
    }));
  };

  const submitQuiz = () => {
    let calculatedScore = 0;
    currentQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.answer.letter) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setAppState('results');
    window.scrollTo(0, 0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = currentQuestions[currentIndex];

  if (appState === 'start') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-yellow-400 p-8 text-center text-slate-900">
            <Award className="w-16 h-16 mx-auto mb-4 text-slate-800" />
            <h1 className="text-3xl font-bold mb-2">Lean Six Sigma</h1>
            <h2 className="text-xl opacity-90">Yellow Belt Practice Exam</h2>
          </div>
          <div className="p-8 text-center">
            <p className="text-slate-600 mb-6 text-lg">
              Test your knowledge with 15 randomly selected questions from the canonical Lean Six Sigma Yellow Belt exam pool.
            </p>
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">{TOTAL_QUESTIONS}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">30</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">70%</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">To Pass</div>
              </div>
            </div>
            <button 
              onClick={generateQuiz}
              className="bg-slate-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              Start Practice Exam <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'quiz') {
    const isAnswered = userAnswers[currentIndex] !== undefined;
    const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1;
    const isLowTime = timeLeft < 300; // less than 5 minutes

    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 flex flex-col items-center">
        <div className="max-w-3xl w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div>
              <div className="text-sm text-slate-500 font-medium">Progress</div>
              <div className="text-lg font-bold">Question {currentIndex + 1} of {TOTAL_QUESTIONS}</div>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xl font-bold ${isLowTime ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-yellow-400 h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex) / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>

          {/* Question Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 mb-6">
            <h2 className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {Object.entries(currentQ.choices).map(([letter, text]) => {
                const isSelected = userAnswers[currentIndex] === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => handleSelectAnswer(letter)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group
                      ${isSelected 
                        ? 'border-yellow-400 bg-yellow-50' 
                        : 'border-slate-200 hover:border-yellow-200 hover:bg-slate-50'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0
                      ${isSelected ? 'bg-yellow-400 text-slate-900' : 'bg-slate-100 text-slate-500 group-hover:bg-yellow-100 group-hover:text-yellow-700'}`}>
                      {letter}
                    </div>
                    <span className="text-lg">{text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
                ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>

            {!isLastQuestion ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(TOTAL_QUESTIONS - 1, prev + 1))}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                className="flex items-center gap-2 bg-yellow-400 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow-md"
              >
                Submit Exam <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'results') {
    const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 flex flex-col items-center">
        <div className="max-w-4xl w-full">
          
          {/* Results Summary */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className={`p-8 text-center text-white ${passed ? 'bg-green-600' : 'bg-red-500'}`}>
              {passed ? (
                <CheckCircle className="w-20 h-20 mx-auto mb-4 opacity-90" />
              ) : (
                <XCircle className="w-20 h-20 mx-auto mb-4 opacity-90" />
              )}
              <h1 className="text-4xl font-bold mb-2">{passed ? 'Congratulations!' : 'Keep Studying!'}</h1>
              <p className="text-xl opacity-90">
                You scored {score} out of {TOTAL_QUESTIONS} ({percentage}%)
              </p>
            </div>
            <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-900 text-white">
               <div>
                 <h3 className="text-lg font-medium text-slate-300">Exam Details</h3>
                 <p className="text-slate-400 mt-1">Lean Six Sigma Yellow Belt • Passing score: 70%</p>
               </div>
               <button 
                  onClick={generateQuiz}
                  className="bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
                >
                  <RefreshCw className="w-5 h-5" /> Generate New Quiz
               </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-slate-800">Detailed Review</h2>

          {/* Detailed Review List */}
          <div className="space-y-6">
            {currentQuestions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const correctAnswer = q.answer.letter;
              const isCorrect = userAnswer === correctAnswer;
              const isUnanswered = !userAnswer;

              return (
                <div key={index} className={`bg-white rounded-xl shadow-sm border-l-8 p-6 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex gap-4 items-start">
                    <div className={`mt-1 shrink-0 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-400 mb-1">Question {index + 1}</div>
                      <h3 className="text-lg font-medium mb-4">{q.question}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <span className="text-slate-500 block mb-1">Your Answer:</span>
                          <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {isUnanswered ? 'Did not answer' : `${userAnswer}: ${q.choices[userAnswer]}`}
                          </span>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                          <span className="text-green-800 block mb-1">Correct Answer:</span>
                          <span className="font-medium text-green-900">
                            {correctAnswer}: {q.choices[correctAnswer]}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm text-slate-600 bg-blue-50 p-4 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                        <p><strong>Explanation:</strong> {q.answer.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button 
                onClick={generateQuiz}
                className="bg-slate-900 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Take Another Random Practice Test
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
}