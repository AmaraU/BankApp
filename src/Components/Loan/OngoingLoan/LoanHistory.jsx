import React from "react";
import { Box, Button, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { getImageUrl } from "../../../../utils";

export const LoanHistory = () => {

    const pastLoans = [
        {
            type: 'Pay Day',
            amount: 1500000,
            date: '24/08/2024'
        },
        {
            type: 'Staff',
            amount: 1500000,
            date: '24/08/2024'
        }
    ];

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    return (
        <Box>
            <HStack bg='#EAECF0' px={'26px'} py={'14px'} borderRadius={'12px 12px 0 0'}>
                <Button onClick={''} h='24px' bg='#EAECF0' p={0} _hover={{ bg: '#EAECF0' }}><img src={getImageUrl('icons/blackLeftArrow.png')} alt="back" /></Button>
                <Text width='90%' textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>Loan History</Text>
            </HStack>
            
            <Stack spacing='24px' alignItems='center' border='1px solid #EFECE9' bg='#FFFFFF' borderRadius='0 0 12px 12px' px='16px' pb='114px' pt='24px'>
                
                <Grid w='80%' gridTemplateColumns='repeat(2, auto)' gap='24px'>
                    {pastLoans.map((loan, i) => (
                        <Box key={i} bg='#EFECE9' borderRadius='6px' border='1px solid #EAECF0' px='25px' py='18px'>
                            <Box bg='#DCD6CF' px='6px' py='9px' borderRadius='4px'><Text fontSize='18px' fontWeight={600} color='#101828'>{loan.type} Loan</Text></Box>
                            <HStack justifyContent='space-between' mt='18px'>
                                <Stack spacing={0}>
                                    <Text fontSize='12px' fontWeight={450} color='#667085'>LOAN AMOUNT</Text>
                                    <Text fontSize='18px' fontWeight={700} color='#101828'>₦{formatNumber(loan.amount)}</Text>
                                </Stack>

                                <Stack spacing={0}>
                                    <Text fontSize='12px' fontWeight={450} color='#667085'>DATE COMPLETED</Text>
                                    <Text fontSize='18px' fontWeight={700} color='#101828'>₦{loan.date}</Text>
                                </Stack>
                            </HStack>
                        </Box>
                    ))}
                </Grid>
            </Stack>

        </Box>
    )
}