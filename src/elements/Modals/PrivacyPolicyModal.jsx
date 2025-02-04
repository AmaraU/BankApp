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

function PrivacyPolicyModal({ isOpen, close }) {

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
                    <Text textAlign='center' fontSize='18px' fontWeight={600}>BANK PRIVACY POLICY</Text>
                </ModalHeader>
                <ModalCloseButton onClick={close}></ModalCloseButton>

                <ModalBody p={0}>
                    <Stack py='16px' px='40px' gap='4px'>

                        <Text fontSize='16px' fontWeight={600}>INTRODUCTION</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            This Bank was established to complement and strengthen the MFB 's presence in the financial services industry. Operating under a State Microfinance Bank license, this bank aims to provide a broad range of banking services to both retail and SME customers, focusing primarily on Lagos. The bank positions itself as a key partner for young and middle-aged professionals, as well as micro, small, and medium-sized enterprises (MSMEs).
                            <br /><br />
                            This Privacy Policy outlines the types of information we collect about you, the methods we use to gather this information, and how we process and share it. While you are not obligated to share your personal information, certain details will be required to access our services. Additionally, this policy explains the circumstances under which we may share your information with third parties, such as service providers and regulatory entities
                            <br /><br />
                        </Text>

                        <Text fontSize='16px' fontWeight={600}>WHAT WE COLLECT</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            We may collect the following Personal Data:
                            <br /><br />
                            
                            <b>Personal Identification Information</b>
                            <br />
                            We collect and use information about You to administer Our business. Information collected shall include:
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>Your contact information such as Name, contact address, email addresses, gender, and telephone numbers and details of next of kin;</li>
                                <li>Demographic information;</li>
                                <li>Occupation, Career history, professional background and other CV related information;</li>
                                <li>International and National passport, driving license or any other form of proof of identification;</li>
                                <li>Transactional data, including financial details, your photograph; and</li>
                                <li>And any other information We may deem necessary and which may be determined by extant Nigerian laws and regulations.</li>
                            </ul>
                            <br />
                            We may collect personal identification information from you in a variety of ways, including, but not limited to, when you visit our Site, register on the Site, make payments for our products and services, subscribe to Our newsletter, respond to a survey, or fill out a form, and in connection features or resources made available on our Site.
                            <br /><br />

                            <b>Non-Personal Identification Information</b>
                            <br />
                            This is information received whenever You interact with Our Site. Non-personal identification information may include:
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>Unique IDs such as your mobile device identifier or cookie ID on your browser;</li>
                                <li>IP address and information that maybe derived from IP address, such as geographic location;</li>
                                <li>Information about a device you use, such as browser, device type, operating system and the internet service providers utilized.</li>
                            </ul>
                            <br />
                            Other information relevant to customer surveys and/or offers
                            <br /><br />

                            <b>True Depth API Usage</b>
                            <br />
                            This bank uses the True Depth API within the camera module to enhance the liveness check during the Know Your Customer (KYC) process, as required by account opening regulations. This technology ensures that the video submitted is being recorded live and belongs to the user.
                            <br /><br />

                            <b>What We Collect</b>
                            <br />
                            The app gathers the following data during the liveness check:
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>Camera Intrinsic Matrix: Information about the camera's internal properties.</li>
                                <li>Facial Expressions and Head Orientation: To verify live interaction.</li>
                                <li>Camera Position: To validate that the video is captured in real-time and is not pre-recorded.</li>
                            </ul>
                            <br />

                            <b>How We Use This Data</b>
                            <br />
                            The app gathers the following data during the liveness check:
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li></li>
                                <li>The data is deleted after the verification process, in compliance with applicable laws and regulations.</li>
                            </ul>
                            <br />

                            <b>Third-Party Obligations</b>
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>Our third-party service provider is bound by data protection laws and prohibited from using the data for marketing or any other purpose outside the agreed scope.</li>
                            </ul>
                            <br />

                            <b>User Rights</b>
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>Users can opt out of the video capture process at any time. However, opting out may limit the ability to complete KYC verification, restricting access to certain services.</li>
                            </ul>
                            <br />
                            This process ensures that this bank meets regulatory requirements while prioritizing user privacy and security.
                            <br /><br />

                            <b>What We Collect</b>
                            <br />
                            The app gathers the following data during the liveness check:
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>Camera Intrinsic Matrix: Information about the camera's internal properties.</li>
                                <li>Facial Expressions and Head Orientation: To verify live interaction.</li>
                                <li>Camera Position: To validate that the video is captured in real-time and is not pre-recorded.</li>
                            </ul>
                            <br />
                        </Text>

                        <Text fontSize='16px' fontWeight={600}>Why we collect your Personal Data</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            All Personal Data which we collect, and process is justified by lawful processing on the legitimate basis that:
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>You have given consent to the processing;</li>
                                <li>Processing is necessary for the performance of a contract to which you are a party or take steps to enter into a contract;</li>
                                <li>Processing is necessary for compliance with a legal and regulatory obligations to which we are subject;</li>
                                <li>Processing is necessary in order to protect your vital interests or another natural person; and</li>
                                <li>Processing is necessary for the performance of a task carried out in the public interest.</li>
                            </ul>
                            <br />
                        </Text>

                        <Text fontSize='16px' fontWeight={600}>What we do with the information we gather?</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            What we do with the information we gather?
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>Internal record keeping;</li>
                                <li>To respond to your enquiries about the bank;</li>
                                <li>To improve our products and services;</li>
                                <li>To improve customer service delivery;</li>
                                <li>To send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided;</li>
                                <li>To contact you occasionally for market research purposes. We may contact you by email, phone, fax or mail;</li>
                                <li>To deliver technical and functional management on our site;</li>
                                <li>To provide specific services in accordance with an agreement you are entering, or have entered into with us;</li>
                                <li>To manage the security of our sites, networks and systems;</li>
                                <li>To comply with applicable laws and regulations and to operate our business;</li>
                                <li>To run a promotion, contest, survey or other site features; and</li>
                                <li>To improve our Site through feedback you provide on our products and services.</li>
                            </ul>
                            <br />
                            The bank will not share with other parties, information which you may provide when using the Site, except to the extent necessary to provide services to you, further, to obtaining your consent.
                            <br /><br />
                            With your express consent, we will share your personal data among subsidiaries within the bank , only to the extent of your permission, and which is necessary to provide services to you. In this case, your right to withdraw consent shall be exercisable at all times.
                            <br /><br />

                            <b>Marketing</b>
                            <br />
                            We may wish to share with you, information about our products and services which we think you may be interested including those of our subsidiaries. If you have agreed to receive marketing materials, you can always opt out at a later date. You reserve the right at any time and at no cost to you, to stop us from contacting you for marketing purposes or giving your data to our subsidiaries.

                        </Text>


                        <Text fontSize='16px' fontWeight={600}>How we collect Personal Data</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            We collect information about you and any other party whose details you provide to us when you:
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>Provide feedback on our products and services to improve our Site;</li>
                                <li>Complete online forms;</li>
                                <li>Take part in surveys;</li>
                                <li>Interact with us using our social media platforms;</li>
                                <li>Download information such as publications or participate in any other interactive areas that appear on our website or portals;</li>
                                <li>Contact us offline, for example by telephone, SMS, email, post or any other means of communication;</li>
                                <li>Access and use any of our websites or portals from your devices (including mobile devices) and applications; and</li>
                                <li>Share Personal Data with third parties that are entitled to share that data, but in each case as permitted by applicable laws.</li>
                                <li>In the event that our ability to communicate with you is disrupted by reason of a change in your contact information, we shall take steps to re-establish same including procuring your personal data from third parties who possess the authority to disclose such information in compliance with applicable data protection laws. Such information shall be used solely for the purpose of reconnecting with you and updating your previously provided information, and where required, to safeguard your interests</li>
                            </ul>
                            <br />
                        </Text>

                        
                        <Text fontSize='16px' fontWeight={600}>Where We Store Your Personal Data</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            The Personal Data that we collect from you will be transferred to and stored at destinations within Nigeria. By submitting your Personal Data, you agree to this transfer, storing or processing. We will take all steps reasonably necessary to ensure that your Personal Data is treated securely and in accordance with this Policy.
                            <br /><br />
                        </Text>


                        <Text fontSize='16px' fontWeight={600}>Do We use Cookies?</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            We use cookies to improve your browsing experience on our website. By browsing on our website, you consent to our use of cookies in accordance with our privacy policy.
                            <br /><br />

                            <b>About Cookies</b>
                            Cookies are a kind of short-term memory for the web. They are stored in your browser and enable a site to 'remember' little bits of information between pages or visits. Cookies can be used by web servers to identify and track users as they navigate different pages on a website, and to identify users returning to a website. Cookies may be either “persistent” cookies or “session” cookies. A persistent cookie consists of a text file sent by a web server to a web browser, which will be stored by the browser and will remain valid until its set expiry date (unless deleted by the user before the expiry date). A session cookie, on the other hand, will expire at the end of the user session, when the web browser is closed.
                            <br /><br />

                            <b>Our Website cookies</b>
                            <br />
                            We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on Your device until you delete them). We need the cookies to enable technical performance of Our websites and allow us to 'remember' the choices you make and your preferences (Functionality) and to allow us collect certain information about how You navigate the Sites (Performance/Analytical).
                            <br />
                            By this, we are able to understand which parts of Our websites are interesting to You and which are not, as well as what We can do to improve them.
                            <br /><br />

                            <b></b>
                            <br />
                        </Text>


                        <Text fontSize='16px' fontWeight={600}>How We Use cookies</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            Cookies do not contain any information that personally identifies You, but Personal Data that We store about You may be linked, by us, to the information stored in and obtained from cookies. The cookies used on Our website include those which are strictly necessary for access and navigation, cookies that track usage (performance cookies) and those used to remember your choices (functionality cookies). We may use the Personal Data We obtain from Your use of our cookies for the following purposes:
                            <br />
                            <ul  style={{marginLeft: '20px'}}>
                                <li>To provide you with a better website experience by enabling us to monitor which pages You find useful and which you do not;</li>
                                <li>To recognise Your computer and track you when You visit Our website;</li>
                                <li>To retain investors' email addresses and passwords when they log in to Our investment centre; and</li>
                                <li>To analyse the use of Our website - such as how many people visit us each day.</li>
                            </ul>
                            <br /><br />

                            <b>Third-party Cookies</b>
                            <br />
                            Our website uses cookies provided by trusted third-party such as Google Analytics, which is one of the most widespread and trusted analytics solutions on the web. This helps us to understand how You use the site and ways that We can improve Your experience.
                            <br /><br />

                            <b>Accepting, Declining and Disabling Cookies</b>
                            <br />
                            You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but You can usually modify your browser setting to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website. You can also disable cookies if You wish. However, this will affect the functionality of Our website and many other websites that You visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore, it is recommended that you do not disable cookies.
                            <br /><br />
                        </Text>
                        

                        <Text fontSize='16px' fontWeight={600}>Links to other websites</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            Our Site may contain links to other websites of interest. However, once You have used these links to leave Our Site, You should note that We do not have any control over such websites. Therefore, We cannot be responsible for the protection and privacy of any information which You provide whilst visiting such websites and such websites are not governed by this Privacy Policy. You should exercise caution and review the privacy statement(s) applicable to the websites.
                            <br /><br />
                        </Text>


                        <Text fontSize='16px' fontWeight={600}>Controlling your Personal Data</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            You may choose to restrict the collection or use of your Personal Data in the following ways:
                            <br />
                            <ul style={{marginLeft: '20px'}}>
                                <li>Whenever You are asked to fill in a form on the Site, the privacy policy link will be available. You can decide not to fill the form if you do not accept the terms of the policy;</li>
                                <li>If You have previously agreed to us using Your Personal Data for direct marketing purposes, You may change Your mind at any time by emailing us at <a style={{color: '#A41857'}} href="mailto:privacy@bank.com.ng">privacy@bank.com.ng</a>.</li>
                            </ul>
                            <br />
                            We will not sell, distribute or lease Your Personal Data to third parties unless we have Your permission or are required by law to do so. We may use Your Personal Data to send You promotional information about third parties which We think You may find interesting subject to your written permission to do so.
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>How we protect your Personal Data</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            We are committed to ensuring that Your Personal Data information is secure. In order to prevent unauthorised access or disclosure, We have put in place reasonable physical, electronic and managerial procedures to safeguard and secure the Personal Data We collect online.
                            <br /><br />

                            In particular, We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of Your personal transaction information and data stored on our Site.
                            <br />
                            Sensitive and private data exchange between the Site and its Users happens over a secured communication channel and is encrypted and protected. Transactions are also handled over a secure payment gateway. Also, the bank has implemented appropriate technical, physical and organisational measures designed to protect Personal Data against accidental or unlawful destruction, accidental loss, damage, alteration, unauthorised disclosure or access, as well as all other forms of unlawful processing.
                            <br /><br />

                            We will not sell, distribute or lease Your Personal Data to third parties unless we have Your permission or are required by law to do so. We may use Your Personal Data to send You promotional information about third parties which We think You may find interesting subject to your written permission to do so.
                            <br /><br />
                        </Text>

                        
                        <Text fontSize='16px' fontWeight={600}>Retention of your Personal Data</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            We maintain Personal Data not longer than we need to use it in accordance with the bank's Data Retention Policy. In some circumstances, we may retain your Personal Data for longer periods if it is in accordance with regulatory, legal, tax or accounting obligations. The bank has an established retention procedure it applies to records and Personal Data collected and stored. In all cases, where your Personal Data is no longer required or you request for deletion, we will ensure it is disposed of in a secure manner.
                            <br /><br />
                        </Text>
                        

                        <Text fontSize='16px' fontWeight={600}>Sharing your Personal Data</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            We do not sell, trade, or rent Users Personal Data to others. We may share generic aggregated demographic information not linked to any Personal Data regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above. We will not disclose Your Personal Data to anyone outside the bank without Your consent to do so unless one of the following circumstances applies:
                            <br />
                            <ol style={{marginLeft: '20px'}}>
                                <li>
                                    <b>With your consent</b>
                                    <br />
                                    We will share Personal Data with companies, organizations or individuals outside of the when bank We have your consent to do so.
                                    We shall obtain your consent before sharing of any sensitive Personal Data.
                                </li>
                                <li>
                                    <b>Processing of Personal Data of minors</b>
                                    <br />
                                    Where we collect the Personal Data of a minor, we shall obtain the consent of a parent or guardian and we shall ensure 
                                    that the purpose of processing or collecting the Personal Data is clear to both the minor and the parent or guardian.
                                </li>
                                <li>
                                    <b>For external processing</b>
                                    <br />
                                    We provide Personal Data to our affiliates or other trusted businesses or persons to process it for us, 
                                    based on our instructions and in compliance with our Privacy Policy and any other appropriate confidentiality and security measures.
                                </li>
                                <li>
                                    <b>For legal reasons</b>
                                    <br />
                                    We will share Personal Data with companies, organizations or individuals outside of the bank if we have a 
                                    good-faith belief that access, use, preservation or disclosure of the information is reasonably necessary to:

                                    <ul style={{marginLeft: '20px', marginTop: '4px'}}>
                                        <li>meet any Applicable Law, regulation, such as the Nigeria Data Protection Act 2023, Nigeria Data Protection Regulation (NDPR), legal process or enforceable governmental request.</li>
                                        <li>detect, prevent, or otherwise address fraud, security or technical issues.</li>
                                        <li>protect against harm to the rights, property or safety of the bank, our Users or the public as required or permitted by law.</li>
                                    </ul>
                                </li>
                            </ol>
                        </Text>
                        

                        <Text fontSize='16px' fontWeight={600}>Your acceptance of these terms</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            By using this Site, You signify Your acceptance of this policy. If You do not agree to this policy, please do not use Our Site. Your continued use of the Site following the posting of changes to this policy will be deemed Your acceptance of those changes.
                            <br /><br />
                        </Text>
                        

                        <Text fontSize='16px' fontWeight={600}>Accessing and updating your Personal Data</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            Whenever You use Our services, We aim to provide You with access to Your Personal Data. 
                            If that Personal Data is wrong, We strive to give You ways to update it quickly or to delete it - 
                            unless We have to keep that Personal Data for legitimate business or legal purposes. 
                            When updating Your Personal Data, We may ask You to verify Your identity before We can act on Your request.
                            <br /><br />

                            We shall, at your request, confirm what Personal Data We hold about You and how such Personal Data is processed. 
                            The following information are available upon Your request.

                            <ul style={{marginLeft: '20px'}}>
                                <li>Contact details of the Data Protection Officer, where applicable;</li>
                                <li>The purpose of the processing as well as the legal basis for processing;</li>
                                <li>The categories of Personal Data collected, stored and processed;</li>
                                <li>Recipient(s) or categories of recipients that the data is/will be disclosed to;</li>
                                <li>Recipient(s) or categories of recipients that the data is/will be disclosed to;</li>
                                <li>
                                    Information about how We ensure transfer of Personal Data to a third party or international organisation is done securely. 
                                    The Attorney General of the Federation will approve sending Personal Data to some countries because they meet a minimum standard of data protection.
                                    In other cases, We will ensure there are specific measures in place to secure your information;
                                </li>
                                <li>How long the data will be stored;</li>
                                <li>Details of Your rights to correct, erase, restrict or object to such processing;</li>
                                <li>Information about Your right to withdraw consent at any time;</li>
                                <li>How to lodge a complaint with the supervisory authority, Nigeria Data Protection Commission (the Commission);</li>
                                <li>
                                    Whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract, 
                                    as well as whether you are obliged to provide the Personal Data and the possible consequences of failing to provide such data;
                                </li>
                                <li>The source of Personal Data if it was not collected directly from you; and</li>
                                <li>
                                    Any details and information of automated decision making, such as profiling, and any meaningful information about the logic involved, 
                                    as well as the significance and expected consequences of such processing.
                                </li>
                            </ul>
                            <br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>Your Rights as a Data Subject</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            At any point while we are in possession of or processing your Personal Data, You, the data subject, have the following rights:
                            <br /><br />
                            <ul style={{marginLeft: '20px'}}>
                                <li>Right of Access - You have the right to request a copy of the information that We hold about you</li>
                                <li>Right of Rectification - You have a right to correct data that We hold about You that is inaccurate or incomplete</li>
                                <li>Right to be Erased/Forgotten - In certain circumstances You can ask for the data We hold about You to be erased from our records</li>
                                <li>Right to Restriction of Processing - Where certain conditions apply to have a right to restrict the processing</li>
                                <li>Right of Portability - You have the right to have the data We hold about you transferred to another organisation (to be reused for Your own purposes)</li>
                                <li>Right to Object - You have the right to object to certain types of processing such as direct marketing</li>
                                <li>Right to Object to automated processing, including profiling - You also have the right to be subject to the legal effects of automated processing or profiling</li>
                                <li>Right to Withdraw - You have the right to withdraw Your consent at any time</li>
                            </ul>
                            <br />

                        </Text>
                        

                        <Text fontSize='16px' fontWeight={600}>Filing a Complaint</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            In the event you are dissatisfied with the way in which we process your data we advise that you 
                            submit your complaint to our DPO via <a style={{color: '#A41857'}} href="mailto:privacy@bank.com.ng">privacy@bank.com.ng</a>.
                            You may also lodge your complaint with the Commission using the contact information as provided in our Compliance with Regulations Clause of this Privacy Policy.
                            <br /><br />

                            Where you remain dissatisfied, you reserve the right to explore other appropriate legal remedies as guaranteed under Nigerian law.
                            <br /><br />
                        </Text>
                        

                        <Text fontSize='16px' fontWeight={600}>Changes to this privacy policy</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            Our Privacy Policy may change from time to time. 
                            We will not reduce your rights under this Policy without your explicit consent. 
                            We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice 
                            (including, for certain services, email notification of privacy policy changes) or via a pop-up notice or statement of changes on our website)
                            <br /><br />

                            You acknowledge and agree that it is Your responsibility to review this Policy periodically and become aware of modifications. 
                            This Privacy Notice or Policy was last updated in December 2024. The most up-to-date version can be found on this website.
                            <br /><br />
                        </Text>
                        

                        <Text fontSize='16px' fontWeight={600}>Compliance with the Regulations</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            This Privacy Policy is in line with the provisions of the Nigerian Data Protection Act 2023 (NDPA) and regulations made pursuant to the NDPA, 
                            the Nigerian Data Protection Regulations 2019 (NDPR) and its Implementation Framework including guidelines made pursuant to the NDPR, 
                            any regulations or guidelines made by a specific industry regulator as it relates to data protection (“Applicable Law”), 
                            which describe how organisations including the bank must collect, handle and store Personal Data and applies regardless of whether data is stored electronically, on paper or on other materials.
                            <br /><br />
                            
                            According to Applicable Law, bank shall notify Nigeria Data Protection Commission (the Commission) 
                            within 72 hours of knowledge of a breach of security leading to accidental or unlawful destruction, 
                            loss, alteration unauthorized disclosure of, or access to your Personal Data. 
                            <br /><br />
                            
                            If you feel that your Personal Data has not been handled correctly or you are unhappy with our response to any requests 
                            you have made to us regarding the use of your Personal Data, you have a right to lodge a complaint with the Commission. 
                            The contact details are:
                            <br /><br />
                            
                            Nigeria Data Protection Commission
                            <br />
                            Tel: +234 (0) 916 061 5551
                            <br />
                            Email: <a href="mailto:info@ndpc.gov.ng">info@ndpc.gov.ng</a>
                            <br />
                            Website: <a href="https://ndpc.gov.ng" target="_blank">https://ndpc.gov.ng/</a>
                            <br /><br />
                        </Text>
                        
                        <Text fontSize='16px' fontWeight={600}>Contact Us</Text>
                        <Text fontSize='14px' fontWeight={400}>
                            If you have any questions or suggestions regarding our privacy policy, please contact our Data Protection Officer.
                            <br /><br />
                            Contact details of the Data Protection Officer:
                            <br /><br />
                            Contact Name: Chukwu Augustine
                            <br />
                            Email: <a style={{color: '#A41857'}} href="mailto:privacy@bank.com.ng">privacy@bank.com.ng</a>
                            <br />
                            Telephone: + 234 (1) 2701653
                            <br /><br />
                        </Text>  
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default PrivacyPolicyModal;