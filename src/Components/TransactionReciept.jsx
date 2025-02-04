import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getImageUrl } from "../../utils";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export const TransactionReceipt = () => {

    useEffect(() => {
        generatePDF();
    }, [1])


    const generatePDF = () => {
        const input = document.getElementById('receipt');
        console.log(input);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('transaction_receipt.pdf');
            });
        
    };

    return (
        <Box id="receipt" width='600px' ml='auto' mr='auto' bg='#FFFFFF' p='40px' bgImage={getImageUrl('onboardingBackground.png')} bgSize='100% 100%'>
            <HStack justifyContent='space-between' alignItems='center'>
                {/* <img style={{width: '95px', height: 'auto'}} src={getImageUrl('logos/arm_logo.png')} /> */}
                <Text fontSize='20px' fontWeight={600} color='#101828'>Transaction Receipt</Text>
            </HStack>
            <Stack textAlign='center' alignItems='center' mt='24px'>
                <Text fontSize='16px' fontWeight={400} color='#101828'>Transaction Amount</Text>
                <Text fontSize='32px' fontWeight={700} color='#101828'>₦40,618.00</Text>
                <Text fontSize='14px' fontWeight={400} color='#101828'>21 Aug 2024 // 10:48 AM</Text>
                <Text fontSize='14px' fontWeight={400} color='#2AD062'>SUCCESSFUL</Text>
            </Stack>
            <Stack spacing='16px' mb='24px' mt='12px'>
                <Text fontSize='12px' fontWeight={600} color={'#A41857'} pb='16px' borderBottom='1px solid #EFECE9'>BENEFICIARY DETAILS</Text>
                
                <HStack justifyContent='space-between'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Name:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>Adeola Jennifer Obasanjo</Text>
                </HStack>
                <HStack justifyContent='space-between'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Bank:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>Kuda Microfinance Bank</Text>
                </HStack>
                <HStack justifyContent='space-between'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Account Number:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>0256252414</Text>
                </HStack>
            </Stack>

            <Stack spacing='16px'>
                <Text fontSize='12px' fontWeight={600} color={'#A41857'} pb='16px' borderBottom='1px solid #EFECE9'>SENDER DETAILS</Text>

                <HStack justifyContent='space-between'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Name:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>Adebola Samson Adegbite</Text>
                </HStack>
                <HStack justifyContent='space-between' pb='16px' borderBottom='1px solid #EFECE9'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Bank:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>ARM Microfinance Bank</Text>
                </HStack>

                <HStack justifyContent='space-between'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Fees:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>₦10.50</Text>
                </HStack>
                <HStack justifyContent='space-between'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Remarks:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>Payment for Dress</Text>
                </HStack>
                <HStack justifyContent='space-between'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Transaction Reference:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>2338828377438299399X93ARM{'<'}MFB</Text>
                </HStack>
                <HStack justifyContent='space-between'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>Payment Type:</Text>
                    <Text fontSize='14px' fontWeight={500} color='#101828'>Bank Transfer</Text>
                </HStack>
            </Stack>

            <Stack textAlign='center' mt='50px'>
                <Text fontSize='12px' fontWeight={400} color={'#667085'}>© 2024 ARM MFB by ARM Group. All rights reserved.</Text>
                <Text fontSize='12px' fontWeight={400} color={'#667085'}>ARM MFB is licensed by the Central Bank of Nigeria. Deposits are insured by the Nigerian Deposit Insurance Corporation (NDIC)</Text>
            </Stack>

        </Box>
    )
}