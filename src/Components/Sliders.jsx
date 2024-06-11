
import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";


function Sliders() {
  const [homevalue, setHomeValue] = useState(3000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(5);
  const [tenure, setTenure] = useState(5);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Update the downPaymentValue : 20% of current homevalue
    const newDownPayment = Math.floor(homevalue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homevalue - newDownPayment);
  }, [homevalue]);

  useEffect(() => {
    const interestPerMonth = interestRate / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);

    setMonthlyPayment(EMI);
  }, [loanAmount, interestRate, tenure]);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" , gap:"40px" }}>
      <div style={{marginTop:"20px", padding:"20px" ,width:"50%"}}>
        <div>
          <p className="textclr">Home Value</p>
          <p>{homevalue} $</p>
          <input
            value={homevalue}
            onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))}
            type="range"
            min={1000}
            max={10000}
            className="silderInputs"
          />
          <div className="ranger">
          <p>$1000</p>
          <p>$10000</p>
          </div>
          
        </div>
        <div>
          <p className="textclr">Down Payment</p>
          <p>{homevalue - loanAmount} $</p>
          <input
            onChange={(e) => {
              setDownPayment(parseInt(e.currentTarget.value));
              setLoanAmount(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={downPayment}
            className="silderInputs"
          />
          <div className="ranger"><p>$0</p>
          <p>${homevalue}</p>
          </div>
        </div>
        <div>
          <p className="textclr">Loan Amount</p>
          <p>{homevalue - downPayment} $</p>
          <input
            onChange={(e) => {
              setLoanAmount(parseInt(e.currentTarget.value));
              setDownPayment(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={loanAmount}
            className="silderInputs"
          />
          <div className="ranger">
          <p>$0</p>
          <p>${homevalue}</p>
          </div>
        </div>
        <div>
          <p className="textclr">Interest Rate</p>
          <p>% {interestRate}</p>
          <input
            value={interestRate}
            onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))}
            type="range"
            min="2"
            max="18"
            className="silderInputs"
          />
          <div className="ranger">
          <p>%2</p>
          <p>%18</p>
          </div>
        </div>
        <div className="selectdiv">
        <p className="textclr">Tenure</p>
        <select className="yearSelect" onChange={(e) => setTenure(parseInt(e.currentTarget.value))} >
          <option value={5}>5 years</option>
          <option value={10}>10 years</option>
          <option value={15}>15 years</option>
          <option value={20}>20 years</option>
          <option value={25}>25 years</option>
        </select>
      </div>
      </div>
      
      <div style={{ width: "300px" , textAlign:"center" , marginTop:"40px"}}>
        <h3>Monthly Payment: <br></br>$ {monthlyPayment.toFixed(2)}</h3>
        <CChart
          type="pie"
          data={{
            labels: ["Principle", "Interest"],
            datasets: [
              {
                backgroundColor: ["#FFC0CB", "#ADD8E6"],
                data: [homevalue, monthlyPayment * tenure * 12 - loanAmount],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "black",
                },
              },
            },
          }}
        />
      </div>
      
    </div>
  );
}

export default Sliders;