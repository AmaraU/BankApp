import { useState, useRef, useEffect } from "react";
import EmptyLoan from "./EmptyLoan";
import LoanType from "./LoanType";
import PayDayLoan from "./PayDayLoan";
import ConfirmScreen from "./ConfirmScreen";
import LoanDetails from "./LoanDetails";
import TwoAccounts from "./TwoAccounts";
import LoanOffer from "./LoanOffer";
import StaffLoan from "./StaffLoan";
import VerifyEmail from "./VerifyEmail";
import InvestmentLoan from "./InvestmentLoan";
import InvestmentBackedLoan from "./InvestmentBackedLoan";
import { CurrentLoans } from "./CurrentLoans";
import { SuccessScreen } from "./SuccessScreen";


export const OngoingLoan = ({ showNewLoan=false, onLoanHandled }) => {
  
  const [ showOptions, setShowOptions ] = useState(true);
  const [ showOne, setShowOne ] = useState(false);
  const [ showTwo, setShowTwo ] = useState(false);
  const [ showStaff, setShowStaffLoan ] = useState(false);
  const [ showVerifyEmail, setShowVerifyEmail ] = useState(false);
  const [ showInvestment, setShowInvestment ] = useState(false);
  const [ showInvestmentBacked, setShowInvestmentBacked ] = useState(false);
  const [ showThree, setShowThree ] = useState(false);
  const [ showFour, setShowFour ] = useState(false);
  const [ showFive, setShowFive ] = useState(false);
  const [ showSix, setShowSix ] = useState(false);
  const [ showSuccess, setShowSuccess ] = useState(false);

  const [ loanType, setLoanType ] = useState('');

  const currentLoans = [
    {
      type: 'Pay Day',
      amount: 1500000,
      repay_amount: 1500000,
      next_repayment: 1500000,
      tenure: '1 month',
      date: '24/08/2024',
      status: 'Approved'
    },
    {
      type: 'Staff',
      amount: 1500000,
      repay_amount: 1800000,
      tenure: '1 month',
      status: 'Pending'
    },
    {
      type: 'Investment Backed',
      amount: 1500000,
      repay_amount: 1500000,
      next_repayment: 1500000,
      tenure: '1 month',
      date: '24/08/2024',
      status: 'Approved'
    }
  ];


  const moveToOptions = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(true);
    setShowSuccess(false);
  };
  const moveToOne = () => {
    setShowOne(true);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
    setShowInvestmentBacked(false);
  };
  const moveToTwo = () => {
    setShowOne(false);
    setShowTwo(true);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
  };
  const moveToThree = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(true);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
  };
  const moveToFour = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(true);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
    setShowInvestmentBacked(false);
  };
  const moveToFive = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(true);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
  };
  const moveToSix = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(true);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
  };
  const moveToVerifyEmail = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(true);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
  };
  function showPayLoan() {
    setLoanType('pay')
    setShowOne(false);
    setShowTwo(true);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
  }
  function showStaffLoan() {
    setLoanType('staff')
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(true);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(false);
  }
  const showInvestmentLoan = () => {
    setLoanType('invest')
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(true);
    setShowOptions(false);
    setShowSuccess(false);
  };
  const showInvestmentBackedLoan = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowInvestmentBacked(true);
    setShowOptions(false);
    setShowSuccess(false);
  };
  const moveToSuccess = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowFour(false);
    setShowFive(false);
    setShowSix(false);
    setShowStaffLoan(false);
    setShowVerifyEmail(false);
    setShowInvestment(false);
    setShowOptions(false);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (showNewLoan) {
      moveToOne();
      if (onLoanHandled) {
        onLoanHandled();
      }      
    }
  }, [showNewLoan]);



  return (
    <>
      {showOptions && currentLoans.length > 0 ? (
        <CurrentLoans currentLoans={currentLoans} />
      ) : (!showOne && !showTwo && !showThree && !showFour && !showFive && !showSix && !showStaff && !showInvestment && !showSuccess && !showInvestmentBacked && !showVerifyEmail) ? (
        <EmptyLoan moveToOne={moveToOne} />
      ) : null}

      {showOne && (
        <LoanType
          moveToTwo={moveToTwo}
          moveToOptions={moveToOptions}
          showStaffLoan={showStaffLoan}
          showPayLoan={showPayLoan}
          showInvestmentLoan={showInvestmentLoan}
        />
      )}

      {showTwo && (
        <PayDayLoan moveToOne={moveToOne} moveToThree={moveToThree} />
      )}

      {showStaff && (
        <StaffLoan
          title={"Staff Loan"}
          moveToOne={moveToOne}
          moveToThree={moveToVerifyEmail}
        />
      )}

      {showInvestment && (
        <InvestmentLoan
          title={"Ongoing Loan"}
          moveToOne={moveToOne}
          moveNext={showInvestmentBackedLoan}
          showStaffLoan={showStaffLoan}
          showPayLoan={showPayLoan}
          showInvestmentLoan={showInvestmentLoan}
        />
      )}

      {showInvestmentBacked && (
        <InvestmentBackedLoan
          title={"Investment Backed Loan"}
          moveToOne={moveToOne}
          moveToFour={moveToFour}
        />
      )}

      {showThree && (
        <ConfirmScreen
          title={"Maximum Loan Eligibility"}
          moveToOne={moveToOne}
          moveToFour={moveToFour}
        />
      )}

      {showFour && (
        <LoanDetails
          moveToOne={moveToOne}
          title={"Loan Details"}
          moveNext={moveToFive}
        />
      )}

      {showFive && (
        <TwoAccounts
          moveToOne={moveToOne}
          title={"Please add two Bank Accounts"}
          moveNext={moveToSix}
        />
      )}

      {showSix && (
        <LoanOffer
          moveToOne={moveToOne}
          title={"Please add two Bank Accounts"}
          moveNext={moveToSuccess}
        />
      )}

      {showVerifyEmail && (
        <VerifyEmail
          title={"Verify your email"}
          moveToOne={moveToOne}
          moveNext={moveToThree}
        />
      )}

      {showSuccess && <SuccessScreen moveToOptions={moveToOptions} type={loanType} />}
    </>
  );
};
