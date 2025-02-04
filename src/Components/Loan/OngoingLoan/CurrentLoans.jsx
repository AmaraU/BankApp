import React, { useState } from "react";
import { Box, Button, Grid, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { getImageUrl } from "../../../../utils";
import { CompleteTransaction } from "../../CompleteTrans";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiHide, BiShow } from "react-icons/bi";
import styles from '../Loan.module.css';


export const CurrentLoans = ({ currentLoans }) => {

    const { isOpen: isOpenMethod, onOpen: onOpenMethod, onClose: onCloseMethod } = useDisclosure();
    const [ totalBalanceVisible, setTotalBalanceVisible ] = useState(true);
    const [ showOne, setShowOne ] = useState(true);
    const [ showTwo, setShowTwo ] = useState(false);
    const [ showThree, setShowThree ] = useState(false);
    const [ selected, setSelected ] = useState('');

    const moveToOne = () => {
        setShowOne(true);
        setShowTwo(false);
        setShowThree(false);
        window.scrollTo({ top: 0 });
    };
    const moveToTwo = () => {
        setShowOne(false);
        setShowTwo(true);
        setShowThree(false);
        window.scrollTo({ top: 0 });
    };
    const moveToThree = () => {
        setShowOne(false);
        setShowTwo(false);
        setShowThree(true);
        onCloseMethod();
        window.scrollTo({ top: 0 });
    };

    const hideBalance = () => {
        return "****************";
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    const formatNumberDecimals = (number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };
    
    const handleToggleVisibility = () => {
        setTotalBalanceVisible(!totalBalanceVisible);
    };

    return (
        <>
        {showOne && <Box>
            <HStack bg='#EAECF0' px={'26px'} py={'14px'} borderRadius={'12px 12px 0 0'}>
                <Button onClick={''} h='24px' bg='#EAECF0' p={0} _hover={{ bg: '#EAECF0' }}><img src={getImageUrl('icons/blackLeftArrow.png')} alt="back" /></Button>
                <Text width='90%' textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>Ongoing Loans</Text>
            </HStack>

            <Stack spacing='24px' alignItems='center' border='1px solid #EFECE9' bg='#FFFFFF' borderRadius='0 0 12px 12px' px='36px' pb='114px' pt='24px'>

                <Grid w='100%' gridTemplateColumns='repeat(2, auto)' gap='24px'>
                    {currentLoans.map((loan, i) => (
                        <Box key={i} bg='#EFECE9' borderRadius='6px' border='1px solid #EAECF0' px='25px' py='18px' h='fit-content'>

                            <HStack bg='#DCD6CF' px='6px' py='9px' borderRadius='4px' justifyContent='space-between' alignItems='center'>
                                <Text fontSize='18px' fontWeight={600} color='#101828'>{loan.type} Loan</Text>
                                {loan.status.toLowerCase() === 'pending' && <Box bg='#FFF9EF' px='8px' py='6px' borderRadius='5px' >
                                    <Text fontSize='12px' fontWeight={600} color='#DB9308'>Pending Approval</Text>
                                </Box>}

                            </HStack>

                            <Stack spacing={0} mt='18px'>
                                <Text fontSize='12px' fontWeight={450} color='#667085'>LOAN AMOUNT</Text>
                                <Text fontSize='32px' fontWeight={700} color='#101828'>₦{formatNumber(loan.amount)}</Text>
                            </Stack>

                            <HStack justifyContent='space-between' mt='23px'>
                                <Stack spacing={0}>
                                    <Text fontSize='12px' fontWeight={450} color='#667085'>TOTAL AMOUNT TO BE REPAID</Text>
                                    <Text fontSize='18px' fontWeight={700} color='#101828'>₦{formatNumber(loan.repay_amount)}</Text>
                                </Stack>

                                <Stack spacing={0} textAlign='right'>
                                    <Text fontSize='12px' fontWeight={450} color='#667085'>TENURE</Text>
                                    <Text fontSize='18px' fontWeight={700} color='#101828'>{loan.tenure}</Text>
                                </Stack>
                            </HStack>
                            {loan.status.toLowerCase() === 'approved' && <HStack justifyContent='space-between' mt='18px'>
                                <Stack spacing={0}>
                                    <Text fontSize='12px' fontWeight={450} color='#667085'>NEXT REPAYMENT AMOUNT</Text>
                                    <Text fontSize='18px' fontWeight={700} color='#101828'>₦{formatNumber(loan.next_repayment)}</Text>
                                </Stack>

                                <Stack spacing={0} textAlign='right'>
                                    <Text fontSize='12px' fontWeight={450} color='#667085'>NEXT REPAYMENT DATE</Text>
                                    <Text fontSize='18px' fontWeight={700} color='#101828'>{loan.date}</Text>
                                </Stack>
                            </HStack>}

                            {loan.status.toLowerCase() === 'approved' && <Button onClick={moveToTwo} w='100%' mt='18px' bg='#A41857' _hover={{ bg: '#90164D' }} borderRadius='8px' fontSize='14px' fontWeight={600} color='#FFFFFF'>Pay Off Loan</Button>}
                            {loan.status.toLowerCase() === 'pending' && <HStack w='100%' spacing='16px' mt='18px'>
                                <Button p={0} w='100%' bg='#A41857' _hover={{ bg: '#90164D' }} borderRadius='8px' fontSize='14px' fontWeight={600} color='#FFFFFF'>Add Bank Accounts</Button>
                                <Button p={0} w='100%' bg='transparent' _hover={{ bg: '#E1DDD9' }} border='1px solid #A41857' borderRadius='8px' fontSize='14px' fontWeight={600} color='#A41857'>Cancel Loan Application</Button>
                            </HStack>}

                        </Box>
                    ))}
                </Grid>
            </Stack>
        </Box>}


        {showTwo && <Box>
            <HStack bg='#EAECF0' px={'26px'} py={'14px'} borderRadius={'12px 12px 0 0'}>
                <Button onClick={moveToOne} h='24px' bg='#EAECF0' p={0} _hover={{ bg: '#EAECF0' }}><img src={getImageUrl('icons/blackLeftArrow.png')} alt="back" /></Button>
                <Text width='90%' textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>Loans Details</Text>
            </HStack>

            <Stack spacing='24px' alignItems='center' border='1px solid #EFECE9' bg='#FFFFFF' borderRadius='0 0 12px 12px' px='36px' pb='114px' pt='24px'>

                <Stack w='75%' bg='#EFECE9' border='#EAECF0' p='24px' spacing='4px' borderRadius='6px'>
                    <Text fontSize='18px' fontWeight={600} color='#101828' mb='12px'>Pay Day Loan</Text>

                    <Text fontSize='12px' fontWeight={450} color='#667085'>OUTSTANDING LOAN AMOUNT</Text>
                    <Text fontSize='32px' fontWeight={700} color='#101828'>₦1,000,000</Text>

                    <HStack justifyContent='space-between'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>REPAYMENT PROGRESS</Text>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>39% completed</Text>
                    </HStack>
                    <progress className={styles.progress} max={100} value={39} />
                </Stack>

                <HStack w='75%' backgroundColor='#000000' backgroundImage={getImageUrl('backgroundGrey.png')} bgSize='100% 100%' borderRadius='12px' p='14px' pt='24px' justifyContent='space-between'>
                    <Box>
                        <Text fontSize='14px' fontWeight={400} color='#FFFFFF'>Total Available Balance</Text>
                        <HStack ml="-1px" spacing={0}>
                            <Box fontSize="22px" color="#FFFFFF"><TbCurrencyNaira /></Box>
                            <Text fontSize="18px" fontWeight={600} color="#FFFFFF">{totalBalanceVisible ? `${formatNumberDecimals(40618898300)}` : hideBalance()}</Text>
                            <Box pl={3} cursor="pointer">
                                {totalBalanceVisible && <BiShow fontSize="lg" color="#FFFFFF" onClick={handleToggleVisibility} />}
                                {!totalBalanceVisible && <BiHide fontSize="lg" color="#FFFFFF" onClick={handleToggleVisibility} />}
                            </Box>
                        </HStack>
                    </Box>

                    <Box alignSelf='start' borderRadius='36px' px='12px' py='8px' bg='#2C323A' color='#FFFFFF' fontSize='10px' fontWeight={500}>Tier 3 Savings Account</Box>
                </HStack>

                <Button h='48px' onClick={onOpenMethod} p={0} w='75%' bg='#A41857' _hover={{ bg: '#90164D' }} borderRadius='8px' fontSize='14px' fontWeight={600} color='#FFFFFF'>Continue</Button>
            </Stack>
        </Box>}

        {showThree && <Box>
            <HStack bg='#EAECF0' px={'26px'} py={'14px'} borderRadius={'12px 12px 0 0'}>
                <Button onClick={moveToTwo} h='24px' bg='#EAECF0' p={0} _hover={{ bg: '#EAECF0' }}><img src={getImageUrl('icons/blackLeftArrow.png')} alt="back" /></Button>
                <Text width='90%' textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>Loans Details</Text>
            </HStack>

            <CompleteTransaction type='transaction' />

        </Box>}


        <Modal isCentered size='lg' closeOnOverlayClick={true} isOpen={isOpenMethod} onClose={onCloseMethod} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>Loan Repayment</Text>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <div style={{ overflow: 'auto', maxHeight: '60vh' }}>

                        <Text fontSize='16px' fontWeight={400} color='#667085' mb='16px'>Kindly choose your preferred option</Text>

                        <HStack w='100%' spacing='38px'>

                            <Stack w='100%' py='10px' px='20px' spacing='0' bg='#EFECE9' borderRadius='8px' border={selected === 'NI' ? '1px solid #A41856' : '1px solid transparent'} cursor='pointer' onClick={()=>setSelected('NI')}>
                                <Text fontSize='18px' fontWeight={selected === 'NI' ? 700 : 400} color={selected === 'NI' ? '#A41856' : '#101828'}>Pay Next Installment</Text>
                                <Text fontSize='18px' fontWeight={selected === 'NI' ? 700 : 400} color={selected === 'NI' ? '#A41856' : '#101828'}>(₦150,000)</Text>
                            </Stack>

                            <Stack w='100%' py='10px' px='20px' spacing='0' bg='#EFECE9' borderRadius='8px' border={selected === 'LL' ? '1px solid #A41856' : '1px solid transparent'} cursor='pointer' onClick={()=>setSelected('LL')}>
                                <Text fontSize='18px' fontWeight={selected === 'LL' ? 700 : 400} color={selected === 'LL' ? '#A41856' : '#101828'}>Liquidate Loan</Text>
                                <Text fontSize='18px' fontWeight={selected === 'LL' ? 700 : 400} color={selected === 'LL' ? '#A41856' : '#101828'}>(₦1,000,000)</Text>
                            </Stack>
                        </HStack>
                    </div>
                </ModalBody>

                <ModalFooter pt={0}>
                    <Button mt='16px' w='100%' h='48px' bg='#A41856' _hover={{ bg: '#90164D' }} color='#FFFFFF' fontSize='14px' fontWeight={600} onClick={moveToThree}>Proceed</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}