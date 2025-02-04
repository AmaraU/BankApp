import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getImageUrl } from "../../utils";
import styles from './styling.module.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export const AccountStatement = () => {

    useEffect(() => {
        generatePDF();
    }, [1])
    

    const generatePDF = () => {
        const input = document.getElementById('statement');
        console.log(input);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('account_statement.pdf');
            });
        
    };

    const statement = [
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '',
            credit: '₦80,000',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '₦80,000',
            credit: '',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '',
            credit: '₦80,000',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '₦80,000',
            credit: '',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '₦80,000',
            credit: '',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '₦80,000',
            credit: '',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '',
            credit: '₦80,000',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '₦80,000',
            credit: '',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '₦80,000',
            credit: '',
            balance: '₦836,587,800.00'
        },
        {
            date: '21/09/2024',
            transRef: 'ARM>MFB 00256',
            transDets: 'Transfer to Kuda - Money for Dress',
            debit: '₦80,000',
            credit: '',
            balance: '₦836,587,800.00'
        }
    ]



    return (
        <Box id="statement" width='600px' ml='auto' mr='auto' bg='#FFFFFF' p='40px' bgImage={getImageUrl('onboardingBackground.png')} bgSize='100% 100%'>
            <HStack justifyContent='space-between' alignItems='center'>
                {/* <img style={{width: '95px', height: 'auto'}} src={getImageUrl('logos/arm_logo.png')} /> */}
                <Text fontSize='20px' fontWeight={600} color='#101828'>Account Statement</Text>
            </HStack>
            <HStack w='100%' justifyContent='space-between' alignItems='center' mt='24px'>
                <Stack>
                    <Text fontSize='10px' fontWeight={450} color='#667085'>ACCOUNT HOLDER</Text>
                    <Text fontSize='10px' fontWeight={600} color='#101828'>Adeola Jennifer Obansanjo</Text>
                </Stack>
                <Stack>
                    <Text fontSize='10px' fontWeight={450} color='#667085'>ACCOUNT HOLDER</Text>
                    <Text fontSize='10px' fontWeight={600} color='#101828'>Adeola Jennifer Obansanjo</Text>
                </Stack>
            </HStack>
            <Box border='1px solid #EAECF0' py='16px' px='24px' mt='24px' borderRadius='8px'>
                <Text fontSize='10px' fontWeight={450} color='#101828'>ACCOUNT DETAILS</Text>

                <HStack justifyContent='space-between'>
                    <Stack spacing={0}>
                        <Text fontSize='9px' fontWeight={700} color='#101828'>ACCOUNT NUMBER</Text>
                        <Text fontSize='9px' fontWeight={450} color='#101828'>02178365878</Text>
                        <Text fontSize='9px' fontWeight={700} color='#101828'>ACCOUNT TYPE</Text>
                        <Text fontSize='9px' fontWeight={450} color='#101828'>TIER 3 SAVINGS ACCOUNT</Text>
                    </Stack>
                    <Stack spacing={0}>
                        <Text fontSize='9px' fontWeight={700} color='#101828'>OPENING BALANCE</Text>
                        <Text fontSize='9px' fontWeight={450} color='#101828'>₦836,587,800.00</Text>
                        <Text fontSize='9px' fontWeight={700} color='#101828'>CLOSING BALANCE</Text>
                        <Text fontSize='9px' fontWeight={450} color='#101828'>₦736,587,800.00</Text>
                    </Stack>
                    <Stack spacing={0}>
                        <Text fontSize='9px' fontWeight={700} color='#101828'>START DATE</Text>
                        <Text fontSize='9px' fontWeight={450} color='#101828'>21/08/2024</Text>
                        <Text fontSize='9px' fontWeight={700} color='#101828'>END DATE</Text>
                        <Text fontSize='9px' fontWeight={450} color='#101828'>21/09/2024</Text>
                    </Stack>
                </HStack>
            </Box>

            <table className={styles.acctStmntTable}>
                <thead>
                    <th>DATE</th>
                    <th>TRANSACTION REFERENCE</th>
                    <th>TRANSACTION DETAILS</th>
                    <th>DEBIT</th>
                    <th>CREDIT</th>
                    <th>BALANCE</th>
                </thead>
                
                <tbody>
                    {statement.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.transRef}</td>
                            <td>{entry.transDets}</td>
                            <td>{entry.debit}</td>
                            <td>{entry.credit}</td>
                            <td>{entry.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Stack textAlign='center' mt='24px' spacing={0}>
                <Text fontSize='8px' fontWeight={400} color={'#667085'}>© 2024 ARM MFB by ARM Group. All rights reserved.</Text>
                <Text fontSize='8px' fontWeight={400} color={'#667085'}>ARM MFB is licensed by the Central Bank of Nigeria. Deposits are insured by the Nigerian Deposit Insurance Corporation (NDIC)</Text>
            </Stack>

        </Box>
    )
}