/* eslint-disable react/prop-types */
import {
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Input,
    Button,
    Stack,
    ModalHeader,
} from "@chakra-ui/react";

function TermsAndConditionsModal({ isOpen, close }) {

    return (
        <Modal
            isCentered
            size={"xl"}
            closeOnOverlayClick={false}
            isOpen={isOpen}
            maxHeight={"70%"}
            onClose={close}
        >
            <ModalOverlay />

            <ModalContent>

                <ModalHeader>
                    <Text textAlign='center' fontSize='18px' fontWeight={600}>TERMS AND CONDITIONS</Text>
                </ModalHeader>
                <ModalCloseButton onClick={close}></ModalCloseButton>

                <ModalBody p={0}>
                    <Stack py='16px' px='40px' gap='16px'>

                        <Text fontSize='16px' fontWeight={600}>1. ACCEPTANCE OF TERMS</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            1.1  Bank Limited(“BANK”) is duly licensed by the Central Bank of Nigeria(“CBN”) to provide Microfinance banking services and other financial services to the public, and it also operates digitally.
                            <br /><br />
                            1.2  The BANK Terms & Conditions(the “Conditions”) is a legally binding contract between you, the individual end user(collectively, “You” or “Your”) and The Bank Limited(“BANK”, “us” or “we”, or the “Company”) and its affiliates and applies to Your use of all the banking services provided by or on behalf of the bank in connection to the application(the “BANK Services”) including but not limited to savings accounts, loan facilities, online payment services, internet - bank services, Mobile – bank Services and SMS bank services.
                            <br /><br />
                            1.3  BANK reserves the right to modify the terms of the Conditions, any Terms of Use and other policies at any time by posting an updated version. The bank will change the Conditions by posting a new version at such URL, so please continue to review the Conditions from time to time.To the fullest extent permitted under applicable Law, your continued use of the Bank Services after any such modification constitutes your acceptance of the Conditions as modified and your agreement to be bound by same.If you do not agree to any modification of the Conditions, You must immediately stop accessing the Bank Services.
                            <br /><br />
                        </Text>

                        <Text fontSize='16px' fontWeight={600}>2. DEFINITIONS AND INTERPRETATIONS</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            <b>Account(s)</b>
                            <br />
                            Any savings or current account(s) of the Customer, opened with Bank, used to perform banking operations.
                            <br /><br />

                            <b>Statements</b>
                            <br />
                            A list of Operations made on the Account.
                            <br /><br />

                            <b>Payment Cards</b>
                            <br />
                            Payment Cards A payment-enabled card (e.g., Visa, MasterCard, Verve) issued by the bank to customers for making payments and withdrawing funds. These cards may be debit, credit, or prepaid cards and must be used by the customer in accordance with the bank's general rules, terms, and conditions, as well as applicable regulatory requirements.
                            <br /><br />

                            <b>Confidential Information</b>
                            <br />
                            Any and all data, reports, records, correspondences, notes, compilations, studies and other information disclosed, directly or indirectly, by a disclosing party or any of its representatives, officers or employees to a receiving party, or the business activities of the disclosing party or any affiliate of the disclosing party or any of their business activities (actual or proposed), whether such information is disclosed orally, in writing, in machine readable form or by any other means, regardless of whether such information is identified as confidential, and includes without limitation, any information ascertainable by inspection.
                            <br /><br />

                            <b>Customer</b>
                            <br />
                            A legal or juristic person whose name and other identification data are specified in the account opening documents.
                            <br /><br />

                            <b>Operation</b>
                            <br />
                            Any payment, withdrawal, deposit or banking activity made by the Customer using Payment Cards or initiated from any other channel such as the digital banking platform for the bank.
                            <br /><br />

                            <b>Remote Banking</b>
                            <br />
                            A set of banking products by using of which the Customer may make certain banking Operations/receive certain information without the need to physically visit the bank. The Remote Banking includes the following banking products/services: using the Debit Card, online payments, internet and mobile banking, USSD banking, Agency Banking, SMS-banking, telephone banking, Email banking and any other channels that may be introduced by the bank in the future.
                            <br /><br />

                            <b>Services</b>
                            <br />
                            The banking services offered by the bank under these Terms and Conditions and requested by the Customer including but not limited to the operation of savings, current and corporate accounts, loan facilities, online payment services, internet banking services, Mobile banking services, USSD banking services, Agency banking services and SMS bank services.
                            <br /><br />

                            <b>Third Party</b>
                            <br />
                            An entity or person other than the bank, You, and Your or the bank's Affiliates
                            <br /><br />
                            
                        </Text>

                        <Text fontSize='16px' fontWeight={600}>3. ACCOUNT OPENING</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            3.1  To open and operate an account with the bank, you must be at least (18) years of age, provide a valid identification card, proof of residence, fulfillment of our onboarding and Know-Your-Customer (KYC) checks, in line with the applicable laws. You can access
                            the bank Services once our onboarding process and Know-Your-Customer (KYC) exercise have been completed.
                            <br /><br />

                            3.2  For compliance purposes, the bank is required to carry out due diligence measures. We are hereby authorized by you to obtain, record and verify information directly or through a third party. To enable us comply with KYC and Anti-Money Laundering (AML) regulations, it is pertinent that you, as our Customer, ensure that all information and documentation provided is accurate, complete, and up to date.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>4. PRODUCTS AND SERVICES</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            4.1  Accounts: the bank shall offer various types of accounts, including savings accounts, current accounts, and business accounts.
                            <br /><br />

                            4.2  Loans and Credit Services: the bank shall offer multiple lending services through the digital platform or other channels, subject to the bank's lending policies, eligibility criteria, terms and conditions and applicable regulations.
                            <br /><br />

                            4.3  Savings: the bank shall offer multiple savings products through the digital platform or other channels, subject to the bank's terms and conditions and applicable regulations.
                            <br /><br />

                            4.4  Payments and Transfers: ARMMFB shall allow and enable you make payments, transfer funds, and conduct other financial transactions using the digital banking platform or other channel subject to ARMMFB’s terms and conditions and applicable regulations.
                            <br /><br />

                            4.5  Other Services: ARMMFB may offer additional financial services directly or in partnership with third parties subject to ARMMFB’s terms and conditions and applicable regulations.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>5. ACCOUNT MAINTENANCE</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            5.1 You agree to maintain sufficient funds in your Account for any transactions, fees, or charges due to ARMMFB.
                            <br /><br />

                            5.2 You must use reasonable and responsible means to prevent any unauthorized access to or the use of your ARMMFB account. Upon any such unauthorized access, report should be made immediately to ARMMFB.
                            <br /><br />

                            5.3 You are responsible for ensuring that your account information is kept up to date, including your contact details, identification information, and any other details required by ARMMFB, upon any change in the information provided, report should immediately be made to ARMMFB.
                            <br /><br />

                            5.4 ARMMFB may charge fees for certain services, such as account maintenance, withdrawals, loan processing, or late payments. A detailed fee schedule is available on ARMMFB’s website.
                            <br /><br />

                            5.5 ARMMFB reserves the right to suspend or terminate your Account for non-compliance with these Terms and Conditions, or if any information provided is found to be false or incomplete.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>6. DEPOSITS AND WITHDRAWALS</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            6.1 You can deposit funds into your Account using various methods provided by ARMMFB, including bank transfers, mobile money, or other authorized payment systems.
                            <br /><br />

                            6.2 Withdrawals from your Account will be processed according to ARMMFB’s policies and subject to applicable withdrawal limits and fees.
                            <br /><br />

                            6.3 All deposits and withdrawals are subject to verification and regulatory compliance checks. ARMMFB may delay or block transactions if required by law or for fraud prevention purposes.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>7. LOANS AND CREDIT PRODUCTS</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            7.1 ARMMFB offers various loan products, including personal loans, business loans, which are subject to eligibility criteria, including creditworthiness, income verification, and other risk assessments.
                            <br /><br />

                            7.2 Loan terms, including interest rates, repayment schedules, and fees, will be disclosed at the time of loan application. You agree to repay loans according to the terms specified in the loan agreement.
                            <br /><br />

                            7.3 You must ensure that you repay your loan on time. Failure to repay loans may result in penalties, additional interest charges, report to credit bureau and other agencies, use of recovery agents, legal action or any other lawful means as necessary.
                            <br /><br />

                            7.4 If your loan is secured by collateral, ARMMFB reserves the right to seize the collateral in the event of default.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>8. FEES AND CHARGES</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            8.1 ARMMFB may charge fees for certain services, including but not limited to:
                            <ul style={{marginLeft: '20px'}}>
                                <li>Account maintenance fees</li>
                                <li>Loan processing fees</li>
                                <li>Withdrawal fees</li>
                                <li>Transaction fees</li>
                                <li>Late payment fees</li>
                                <li>Others</li>
                            </ul>
                            <br /><br />

                            8.2  A schedule of applicable fees will be made available to you on ARMMFB's website.
                            <br /><br />

                            8.3  ARMMFB reserves the right to modify or update its fees and charges at any time. Any changes will be communicated to you via email, SMS, Website /in-app notifications.
                            <br /><br />

                            8.4  Taxes: Where applicable, certain payments made or received by you in connection with your ARMMFB Account or any Services provided to you by ARMMFBM may be subject to taxes. If any taxes (whether in force now or introduced in the future) are payable in connection with these payments, you understand that you are liable for these taxes.
                            You hereby consent and agree that ARMMFB may withhold amounts in your Account if we are required to do so in accordance with the directives of any tax authority, regulator or by law or regulation. You will, however, be notified if such deductions are made or you will be able to see details of such deductions on your bank statements.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>9. SECURITY AND PRIVACY</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            9.1  You are responsible for maintaining the confidentiality of your account credentials, PIN, password, and any other security information. ARMMFB is not liable for any unauthorized access resulting from your failure to secure your account.
                            <br /><br />

                            9.2 ARMMFB employs security measures, including encryption and secure protocols, to protect your personal and financial information. However, no system is entirely foolproof, and ARMMFB cannot guarantee absolute security.
                            <br /><br />

                            9.3 You agree to promptly notify ARMMFB if you suspect any unauthorized access to your account or if your credentials are lost, stolen, or compromised.
                            <br /><br />

                            9.4 ARMMFB will only share your personal data with third parties in accordance with its privacy policy or where required by law.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>10. DISCLAIMER</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            10.1  You expressly acknowledge that computer network-based services may be subject to outages, interruptions, attacks by third parties and delay occurrences. ARMMFB specifically disclaims all representations, warranties, and conditions whether express or implied, arising by statute, operation of law, usage of trade, course of dealing, or otherwise, including but not limited to, warranties or conditions of merchantability, fitness for a particular purpose, non-infringement, or title.
                            <br /><br />

                            10.2  All such warranties, representations, conditions, undertakings and terms, whether express or implied, are hereby excluded.
                            <br /><br />

                            10.3  ARMMFB assumes no liability or responsibility for any inaccurate or incomplete information or claims that may result from reliance on such information. Without limiting the foregoing and for avoidance of doubt, ARMMFB, its Affiliates, and their respective licensors, shall not be liable for, and hereby expressly disclaim any liabilities and warranties with respect to, any Third-Party components of Materials.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>11. LIMITATION OF LIABILITY</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            11.1  ARMMFB is not liable for any loss or damage arising from:
                            <br />
                            i. Unauthorized access to your account
                            <br />
                            ii. Delays or failures in ARMMFB's services caused by technical issues
                            <br />
                            iii. Force majeure events such as natural disasters, strikes, or government actions
                            <br /><br />

                            11.2  To the full extent permitted by law, ARMMFB and our affiliates shall not be liable for any indirect, consequential, incidental, special or punitive damages, including without limitation damages for loss of profits or revenues, business interruption, loss of business opportunities, loss of business, injury to business reputation or goodwill; or cost of procurement of substitute services, loss of data or loss of other economic interests, whether in contract, negligence, tort or otherwise, arising from your use of or inability to use its digital banking platform
                            <br /><br />

                            11.3  ARMMFB does not exclude or limit our liability to you in any way where it would be unlawful to do so. To the full extent permitted by applicable law, ARMMFB's total liability in any dispute shall not exceed the amount of fees paid by you for the service related to the claim.
                            <br /><br />

                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>12. INDEMNIFICATION</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            You agree to indemnify ARMMFB and our Affiliates and our employees, directors, officers, agents and representatives and to hold them harmless, from any and all losses, damages, actions, claims and liabilities (including legal costs on a full indemnity basis) which may arise, directly or indirectly, from your use of the ARMMFB Services or from your breach of the Conditions.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>13. DATA PROTECTION</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            13.1 By opening this Account, You consent to us processing your personal information:
                            <br />
                            i. To provide products and services to you in terms of this agreement and any other products and services for which you may apply;
                            <br /><br />

                            ii. To carry out statistical and other analyses to identify potential markets and trends, evaluate and improve our business (this includes improving existing and developing new products and services);
                            <br /><br />

                            iii. In countries outside Nigeria where the products or services are being used and where such countries do not have the same data protection laws as applicable in Nigeria, we will, where possible, ask the receiving party to agree to our privacy policies.
                            <br /><br />

                            13.2 ARMMFB confirms that it shall comply with all the obligations imposed on a controller as provided under the Nigeria Data Protection Regulation (“NDPR”) as well as other applicable data protection laws. ARMMFB shall;
                            <br /><br />

                            i. Process personal data only lawfully and for the purpose(s) that it is obtained for and shall not disclose or allow unauthorized access to personal data;
                            <br /><br />

                            ii. Ensure that it has all necessary notices and consents in place to enable lawful transfer of personal data;
                            <br /><br />

                            iii. Ensure that it has in place appropriate technical and organizational measures to protect against unauthorized or unlawful processing of any of the personal data and against accidental loss or destruction of, or damage to, any of personal data
                            <br /><br />

                            iv. Retain personal data in compliance with applicable laws and as may be required for the purpose of performing any obligation
                            <br /><br />

                            v. Not transfer any personal data outside Nigeria unless it complies with the provisions of the NDPR or any other applicable laws on transfer of personal data outside Nigeria.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>14. ANTI-MONEY LAUNDERING AND ANTI-TERROR FINANCING POLICY</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            It is the policy of ARMMFB to prohibit and actively pursue the prevention of money laundering and any activity that facilitates money laundering or the financing of terrorist or criminal activities. ARMMFB is committed to anti-money laundering compliance in accordance with applicable law and requires its directors, officers, and employees to adhere to these standards in preventing the use of its products and services for money laundering purposes.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>15. LAW AND DISPUTE RESOLUTION</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            15.1 The Conditions shall be governed by the laws of the Federal Republic of Nigeria without regard to conflict of law principles.
                            <br /><br />

                            15.2 You irrevocably consent that any dispute or claim arising from or in connection with the Conditions or your use of the ARMMFB Services, will be resolved through amicable negotiations.
                            <br /><br />

                            15.3 If such dispute is still not resolved within fourteen (14) days of the date of the initial reference (or such longer time as the parties may jointly agree) either party may give to the other party a notice that a dispute or difference exists, specifying its nature, the point(s) in issue and its intention to refer the dispute to mediation at the Lagos Multi-Door Court House.
                            <br /><br />

                            15.4 If the parties fail to resolve such dispute or difference by mediation within a period of fourteen (14) days from the date upon which such notice was referred to mediation, or such longer time as parties may jointly agree, any party may refer the dispute to be settled by arbitration in accordance with the Arbitration and Mediation Act 2023. In the event that the parties are unable to agree on the appointment of the arbitrator within fourteen (14) days from the date of the referral to arbitration, such appointment shall be made by the President of the Lagos Court of Arbitration and the arbitration shall be administered by the Lagos Court of Arbitration. Unless the parties agree otherwise, the arbitration shall be conducted in English and in Lagos, Nigeria.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>16. CONFIDENTIALITY</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            16.1 You agree to hold all Confidential Information in strict confidence, not to disclose, distribute or disseminate the Confidential Information or information derived therefrom in any way to any third party and not to use the Confidential Information for Your own benefit or the benefit of others, or for any purpose except in connection with the prescribed use of the ARMMFB Services, the exercise of Your rights and Your performance of Your obligations further to the Conditions.
                            <br /><br />

                            16.2 You agree to maintain strict confidentiality regarding all Confidential Information related to ARMMFB and its services. You shall exercise the highest standard of care to prevent unauthorized access, use, or disclosure. You commit that you shall use and disclose such Confidential Information solely for the purposes for which it was provided, and in accordance with these Conditions.
                            <br /><br />

                            16.3 You acknowledge that breach of this Section may result in irreparable harm to ARMMFB, for which money damages may be an insufficient remedy, and therefore ARMMFB will be entitled to seek injunctive relief to enforce the provisions of this section without requirement of posting a bond or providing special evidence.
                            <br /><br />
                        </Text>
                            
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default TermsAndConditionsModal;