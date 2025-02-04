import React, { useState } from "react";
import { Stack, HStack, Text, Box, useDisclosure, Button, FormControl, FormLabel, InputGroup, InputLeftElement, Input, Select, Switch } from "@chakra-ui/react";
import CardContainer from "../../elements/CardContainer";
import styles from "../../Pages/SavingsPage/Savings.module.css";
import { getImageUrl } from "../../../utils";
import { TopUpModal } from "../../elements/Modals/TopUpModal";
import { TopUpModalComplete } from "../../elements/Modals/TopUpModalComplete";
import { CompleteTransaction } from "../CompleteTrans";
import { WithdrawModal } from "../../elements/Modals/WithdrawModal";
import { ExtendModal } from "../../elements/Modals/ExtendModal";
import { EditNameModal } from "../../elements/Modals/EditNameModal";
import { BreakWarningModal } from "../../elements/Modals/BreakWarningModal";
import OtpInput from "../../elements/PinInput";


export const TargetSavingsDetails = ({ title, goBack, type, isMember=true }) => {

    const isComplete = true;
    const { isOpen: isOpenTopup, onOpen: onOpenTopup, onClose: onCloseTopup } = useDisclosure();
    const { isOpen: isOpenTopupComplete, onOpen: onOpenTopupComplete, onClose: onCloseTopupComplete } = useDisclosure();
    const { isOpen: isOpenWithdraw, onOpen: onOpenWithdraw, onClose: onCloseWithdraw } = useDisclosure();
    const { isOpen: isOpenExtend, onOpen: onOpenExtend, onClose: onCloseExtend } = useDisclosure();
    const { isOpen: isOpenBreak, onOpen: onOpenBreak, onClose: onCloseBreak } = useDisclosure();
    const { isOpen: isOpenRename, onOpen: onOpenRename, onClose: onCloseRename } = useDisclosure();

    const [ header, setHeader ] = useState('');
    const [ showDetails, setShowDetails ] = useState(true);
    const [ showWithdraw, setShowWithdraw ] = useState(false);
    const [ showMembers, setShowMembers ] = useState(false);
    const [ showBreakPlan, setShowBreakPlan ] = useState(false);
    const [ showComplete, setShowComplete ] = useState(false);



    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };
    const formatNumberDecimals = (number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };

    const handleTopUp = () => {
        setHeader('Top Up');
        if (isComplete) onOpenTopupComplete()
        else onOpenTopup()
    };
    const proceedTopUp = () => {
        onCloseTopupComplete();
        onOpenTopup();
    };
    const handleExtend = () => {
        setHeader('Extension');
        onOpenExtend();
    }

    const moveToDetails = () => {
        setShowDetails(true);
        setShowWithdraw(false);
        setShowMembers(false);
        setShowBreakPlan(false);
        setShowComplete(false);
        onCloseWithdraw();
        window.scrollTo({ top: 0 });
    }
    const moveToWithdraw = () => {
        setHeader('Withdrawal');
        setShowDetails(false);
        setShowWithdraw(true);
        setShowMembers(false);
        setShowBreakPlan(false);
        setShowComplete(false);
        window.scrollTo({ top: 0 });
    }
    const moveToMembers = () => {
        // setHeader('Members');
        setShowDetails(false);
        setShowWithdraw(false);
        setShowMembers(true);
        setShowBreakPlan(false);
        setShowComplete(false);
        window.scrollTo({ top: 0 });
    }
    const moveToBreak = () => {
        setShowDetails(false);
        setShowWithdraw(false);
        setShowBreakPlan(true);
        setShowComplete(false);
        onCloseBreak();
        // window.scrollTo({ top: 0 });
    }
    const moveToComplete = () => {
        setShowDetails(false);
        setShowWithdraw(false);
        setShowBreakPlan(false);
        setShowComplete(true);
        onCloseTopup();
        onCloseWithdraw();
        onCloseExtend();
        onCloseBreak();
        onCloseRename();
        onCloseBreak();
        // window.scrollTo({ top: 0 });
    }

    const ACTIVITES = [
        {
            description: 'top up target',
            date: '24/08/2024',
            type: 'credit',
            amount: 100500
        },
        {
            description: 'break target',
            date: '24/08/2024',
            type: 'debit',
            amount: 100500
        },
        {
            description: 'top up target',
            date: '24/08/2024',
            type: 'credit',
            amount: 100500
        },
        {
            description: 'top up target',
            date: '24/08/2024',
            type: 'credit',
            amount: 100500
        }
    ]
    const GROUP_ACTIVITES = [
        {
            description: 'Member broke plan',
            date: '24/08/2024',
            type: 'break'
        },
        {
            description: 'New member joined',
            date: '24/08/2024',
            type: 'join'
        },
        {
            description: 'New member joined',
            date: '24/08/2024',
            type: 'join'
        },
        {
            description: 'Member topped up plan',
            date: '24/08/2024',
            type: 'topup'
        }
    ]
    const REASONS = ["Business", "Education", "Travel", "Entertainment", "Rent", "Low return on savings", "Others"]
    const MEMBERS = [
        {
            name: 'Adeola Obansanjo',
            total: 200000,
            saved: 10000
        },
        {
            name: 'Johnson Olayemi',
            total: 200000,
            saved: 123000
        },
        {
            name: 'Austin Kleon',
            total: 200000,
            saved: 100500
        },
        {
            name: 'Thalia Balsam',
            total: 200000,
            saved: 23000
        },
        {
            name: 'John Slattery',
            total: 200000,
            saved: 50000
        },
        {
            name: 'Donald Draper',
            total: 200000,
            saved: 12000
        },
        {
            name: 'Muyiwa Babatunde',
            total: 200000,
            saved: 120000
        },
        {
            name: 'Omolola Adeniyi',
            total: 200000,
            saved: 200000
        }
    ]


    return (
        <div>
            {showDetails && <CardContainer title={title} moveToOne={goBack}>
                <Stack maxWidth="800px" width="80%" border='1px solid #EAECF0' borderRadius='8px' px='20px' py='25px' spacing={0}>
                    <Text fontSize='12px' fontWeight={450} color='#667085'>TARGET AMOUNT</Text>
                    <Text fontSize='20px' fontWeight={600} color='#101828'>₦13,000,000</Text>
                    <HStack justifyContent='space-between' mt='16px' mb='8px'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>TARGET PROGRESS</Text>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>39% complete</Text>                        
                    </HStack>
                    <progress className={styles.progress} max={13000000} value={2080000} />

                    {type === 'personal' && <HStack justifyContent='space-between' mt='16px' spacing='24px'>
                        <Stack spacing={2} w='100%'>
                            <Text fontSize='12px' fontWeight={450} color='#667085'>PLAN BALANCE</Text>
                            <Text fontSize='18px' fontWeight={600} color='#101828'>₦2,080,000</Text>
                        </Stack>

                        <Stack spacing={2} w='100%'>
                            <Text fontSize='12px' fontWeight={450} color='#667085'>AMOUNT SAVED</Text>
                            <Text fontSize='18px' fontWeight={600} color='#101828'>₦13,080,000</Text>
                        </Stack>

                        <Stack spacing={2} w='100%'>
                            <Text fontSize='12px' fontWeight={450} color='#667085'>INTEREST EARNED (8% PA)</Text>
                            <Text fontSize='18px' fontWeight={600} color='#101828'>₦380,000</Text>
                        </Stack>

                        <Stack spacing={2} w='100%'>
                            <Text fontSize='12px' fontWeight={450} color='#667085'>FREQUENCY</Text>
                            <Text fontSize='18px' fontWeight={600} color='#101828'>Weekly</Text>
                        </Stack>
                    </HStack>}

                    {type === 'group' && <HStack justifyContent='space-between' mt='16px' spacing='24px'>
                        <Stack spacing={2} w='100%'>
                            <Text fontSize='12px' fontWeight={450} color='#667085'>GROUP BALANCE</Text>
                            <Text fontSize='18px' fontWeight={600} color='#101828'>₦2,080,000</Text>
                        </Stack>

                        <Stack spacing={2} w='100%'>
                            <Text fontSize='12px' fontWeight={450} color='#667085'>TOTAL SAVED</Text>
                            <Text fontSize='18px' fontWeight={600} color='#101828'>₦13,080,000</Text>
                        </Stack>

                        <Stack spacing={2} w='100%'>
                            <Text fontSize='12px' fontWeight={450} color='#667085'>MEMBERS</Text>
                            <Text fontSize='18px' fontWeight={600} color='#101828'>13</Text>
                        </Stack>

                        <Stack spacing={2} w='100%'>
                            <Text fontSize='12px' fontWeight={450} color='#667085'>INTEREST EARNED (8% PA)</Text>
                            <Text fontSize='18px' fontWeight={600} color='#101828'>₦380,000</Text>
                        </Stack>
                    </HStack>}
                </Stack>

                {type === 'personal' && <HStack justifyContent='space-between' spacing='24px' maxWidth="800px" width="80%">
                    <Stack borderRadius='8px' border='1px solid #EAECF0' p='20px' w='100%'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>START DATE</Text>
                        <Text fontSize='18px' fontWeight={600} color='#101828'>22/07/2024</Text>
                    </Stack>
                    <Stack borderRadius='8px' border='1px solid #EAECF0' p='20px' w='100%'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>END DATE</Text>
                        <Text fontSize='18px' fontWeight={600} color='#101828'>22/08/2024</Text>
                    </Stack>
                    <Stack borderRadius='8px' border='1px solid #EAECF0' p='20px' w='100%'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>DAYS LEFT UNTIL MATURITY</Text>
                        <Text fontSize='18px' fontWeight={600} color='#101828'>33 Days</Text>
                    </Stack>
                </HStack>}

                {type === 'group' && <HStack justifyContent='space-between' maxWidth="800px" width="80%">
                    <Stack borderRadius='8px' border='1px solid #EAECF0' p='16px' w='100%'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>AMOUNT PER USER</Text>
                        <Text fontSize='18px' fontWeight={600} color='#101828'>₦200,000</Text>
                    </Stack>
                    <Stack borderRadius='8px' border='1px solid #EAECF0' p='16px' w='100%'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>FREQUENCY</Text>
                        <Text fontSize='18px' fontWeight={600} color='#101828'>₦2,500/week</Text>
                    </Stack>
                    <Stack borderRadius='8px' border='1px solid #EAECF0' p='16px' w='100%'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>START DATE</Text>
                        <Text fontSize='18px' fontWeight={600} color='#101828'>22/07/2024</Text>
                    </Stack>
                    <Stack borderRadius='8px' border='1px solid #EAECF0' p='16px' w='100%'>
                        <Text fontSize='12px' fontWeight={450} color='#667085'>END DATE</Text>
                        <Text fontSize='18px' fontWeight={600} color='#101828'>22/08/2024</Text>
                    </Stack>
                    <Stack borderRadius='8px' border='1px solid #EAECF0' p='16px' w='100%'>
                        <Text fontSize='11px' fontWeight={450} color='#667085'>DAYS LEFT TO PAYOUT</Text>
                        <Text fontSize='18px' fontWeight={600} color='#101828'>33 Days</Text>
                    </Stack>
                </HStack>}

                {!isMember && <Button mt='40px' w='80%' maxWidth='700px' h='48px' color='#FFFFFF' bg='#A41856' _hover={{bg: '#90164D'}} onClick={moveToComplete} >Join Group</Button>}


                <HStack maxWidth="800px" width="80%" justifyContent='space-evenly' mt='40px'>
                    <Stack alignItems='center' cursor='pointer' onClick={handleTopUp}>
                        <Box borderRadius='110px' h='48px' w='48px' bg='#A418571A' display='flex' alignItems='center' justifyContent='center'>
                            <img src={getImageUrl('icons/topup.png')} alt="" />
                        </Box>
                        <Text fontSize='14px' fontWeight={450} color='#667085'>Top Up</Text>
                    </Stack>
                    <Stack alignItems='center' cursor='pointer' onClick={moveToWithdraw}>
                        <Box borderRadius='110px' h='48px' w='48px' bg='#A418571A' display='flex' alignItems='center' justifyContent='center'>
                            <img style={{width: '24px', height: '24px'}} src={getImageUrl('icons/withdraw.png')} alt="" />
                        </Box>
                        <Text fontSize='14px' fontWeight={450} color='#667085'>Withdraw</Text>
                    </Stack>
                    {type === 'group' && <Stack alignItems='center' cursor='pointer' onClick={moveToMembers}>
                        <Box borderRadius='110px' h='48px' w='48px' bg='#A418571A' display='flex' alignItems='center' justifyContent='center'>
                            <img src={getImageUrl('icons/members.png')} alt="" />
                        </Box>
                        <Text fontSize='14px' fontWeight={450} color='#667085'>Members</Text>
                    </Stack>}
                    <Stack alignItems='center' cursor='pointer' onClick={handleExtend}>
                        <Box borderRadius='110px' h='48px' w='48px' bg='#A418571A' display='flex' alignItems='center' justifyContent='center'>
                            <img src={getImageUrl('icons/extend.png')} alt="" />
                        </Box>
                        <Text fontSize='14px' fontWeight={450} color='#667085'>Extend</Text>
                    </Stack>
                    <Stack alignItems='center' cursor='pointer' onClick={onOpenBreak}>
                        <Box borderRadius='110px' h='48px' w='48px' bg='#A418571A' display='flex' alignItems='center' justifyContent='center'>
                            <img src={getImageUrl('icons/break.png')} alt="" />
                        </Box>
                        <Text fontSize='14px' fontWeight={450} color='#667085'>Break Plan</Text>
                    </Stack>
                    <Stack alignItems='center' cursor='pointer' onClick={onOpenRename}>
                        <Box borderRadius='110px' h='48px' w='48px' bg='#A418571A' display='flex' alignItems='center' justifyContent='center'>
                            <img src={getImageUrl('icons/redEdit.png')} alt="" />
                        </Box>
                        <Text fontSize='14px' fontWeight={450} color='#667085'>Edit Plan Name</Text>
                    </Stack>
                </HStack>

                <Stack  maxWidth="800px" width="80%" mt='16px'>
                    <Text w='100%' borderBottom='1px solid #EAECF0' fontSize='18px' fontWeight={600} color='#101828'>Activities</Text>

                    {type === 'personal' && ACTIVITES.map((act, index) => (
                        <HStack key={index} justifyContent='space-between' borderBottom='0.5px solid #EAECF0' pt='16px'pb='4px'>
                            <HStack spacing={2} alignItems='start'>
                                {act.type === 'credit' ? <img style={{width: '32px', height: '32px'}} src={getImageUrl('icons/credit.png')} />
                                : act.type === 'debit' ? <img style={{width: '32px', height: '32px'}} src={getImageUrl('icons/debit.png')} /> : ''}
                                <Stack>
                                    <Text fontSize='14px' fontWeight={450} color='#394455'>{act.description}</Text>
                                    <Text fontSize='12px' fontWeight={450} color='#667085'>{act.date}</Text>
                                </Stack>
                            </HStack>
                            {act.type === 'credit' ? <Text fontSize='14px' fontWeight={600} color='#394455'>₦{formatNumber(act.amount)}</Text>
                            : act.type === 'debit' ? <Text fontSize='14px' fontWeight={600} color='#ED405C'>-₦{formatNumber(act.amount)}</Text> : ''}
                        </HStack>
                    ))}

                    {type === 'group' && GROUP_ACTIVITES.map((act, index) => (
                        <HStack key={index} borderBottom='0.5px solid #EAECF0' pt='16px'pb='4px' spacing={2} alignItems='start'>
                            {act.type === 'topup' ? <img style={{width: '32px', height: '32px'}} src={getImageUrl('icons/greyTopup.png')} />
                            : act.type === 'withdraw' ? <img style={{width: '32px', height: '32px'}} src={getImageUrl('icons/greyTopup.png')} />
                            : act.type === 'extend' ? <img style={{width: '32px', height: '32px'}} src={getImageUrl('icons/greyTopup.png')} />
                            : act.type === 'break' ? <img style={{width: '32px', height: '32px'}} src={getImageUrl('icons/greyBreak.png')} />
                            : act.type === 'join' ? <img style={{width: '32px', height: '32px'}} src={getImageUrl('icons/greyJoin.png')} /> : ''}
                            <Stack spacing={0}>
                                <Text fontSize='14px' fontWeight={450} color='#394455'>{act.description}</Text>
                                <Text fontSize='12px' fontWeight={450} color='#667085'>{act.date}</Text>
                            </Stack>
                        </HStack>
                    ))}
                </Stack>
            </CardContainer>}

            
            {showWithdraw && <CardContainer title='Withdraw' moveToOne={moveToDetails}>
                <Stack maxWidth="700px" width="75%" borderRadius='8px' px='20px' py='25px' spacing={0} bg='#667085'>
                    <Text fontSize='16px' fontWeight={400} color='#FFFFFF'>Target Amount</Text>
                    <Text fontSize='24px' fontWeight={600} color='#FFFFFF'>₦{formatNumberDecimals(13000000)}</Text>
                    <HStack justifyContent='space-between'>
                        <Stack>
                            <Text fontSize='16px' fontWeight={400} color='#FFFFFF'>Plan Balance</Text>
                            <Text fontSize='24px' fontWeight={600} color='#FFFFFF'>₦{formatNumberDecimals(13000000)}</Text>        
                        </Stack>
                        <Stack>
                            <Text fontSize='16px' fontWeight={400} color='#FFFFFF'>Interest Earned</Text>
                            <Text fontSize='24px' fontWeight={600} color='#FFFFFF'>₦{formatNumberDecimals(3100000)}</Text>        
                        </Stack>               
                    </HStack>
                </Stack>

                <FormControl maxWidth='700px' w='75%'>
                    <FormLabel fontSize='16px' fontWeight={400} color='#101828'>How much would you like to withdraw?</FormLabel>
                    <InputGroup>
                        <InputLeftElement>₦</InputLeftElement>
                        <Input bg='#F7F7F7' border='1px solid #EAECF0' inputMode="numeric" type="number" />
                    </InputGroup>

                    <FormLabel fontSize='16px' fontWeight={400} color='#101828' mt='16px'>Reason</FormLabel>
                    <Select bg='#F7F7F7' border='1px solid #EAECF0'>
                        {REASONS.map((option, i) => (
                        <option key={i}>{option}</option>
                        ))}
                    </Select>
                </FormControl>

                <HStack w='75%' maxWidth='700px'>
                    <Switch size="md" color="#A41856" colorScheme="#A41856" sx={{ ".chakra-switch__track[data-checked]:not([data-theme])": {backgroundColor: "#A41856"}}}/>
                    <Text fontSize='14px' fontWeight={450} color='#667085'>I hereby agree to this “You can withdraw up to 50% of your savings four (4) times every 30 days but you will lose part of your interest if you don’t meet your target amount.”</Text>
                </HStack>

                <Button onClick={onOpenWithdraw} mt='33px' w='75%' h='48px' maxWidth='700px' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Continue</Button>

            </CardContainer>}

            
            {showMembers && <CardContainer title='Members' moveToOne={moveToDetails}>
                <Stack w='80%' maxWidth='800px' spacing='16px'>
                    {MEMBERS.map((mem, index) => (
                        <Stack key={index} border='1px solid #EAECF0' borderRadius='8px' p='16px' w='100%' spacing={1}>
                            <HStack justifyContent='space-between'>
                                <Text fontSize='18px' fontWeight={600} color='#0C111D'>{mem.name}</Text>
                                <Text fontSize='18px' fontWeight={600} color='#0C111D'>₦{formatNumber(mem.total)}</Text>
                            </HStack>
                            <HStack justifyContent='space-between'>
                                <Text fontSize='12px' fontWeight={450} color='#667085'>{(mem.saved / mem.total * 100).toFixed()}% Progress</Text>
                                <Text fontSize='12px' fontWeight={500} color='#667085'>AMOUNT SAVED</Text>
                            </HStack>
                            <progress max={mem.total} value={mem.saved} className={styles.progress} />
                        </Stack>
                    ))}
                </Stack>
            </CardContainer>}

            
            {showBreakPlan && <CardContainer title='Break Plan' moveToOne={moveToDetails}>
                
                <Stack maxWidth="700px" width="75%" borderRadius='8px' p='14px' spacing={2} bg='#667085'>
                    <Text textAlign='center' fontSize='16px' fontWeight={450} color='#FFFFFF'>{title}</Text>
                    <HStack justifyContent='space-between'>
                        <Stack spacing={0}>
                            <Text fontSize='16px' fontWeight={400} color='#FFFFFF'>Target Amount</Text>
                            <Text fontSize='24px' fontWeight={600} color='#FFFFFF'>₦{formatNumberDecimals(13000000)}</Text>        
                        </Stack>
                        <Stack spacing={0} textAlign='right'>
                            <Text fontSize='16px' fontWeight={400} color='#FFFFFF'>Plan Balance</Text>
                            <Text fontSize='24px' fontWeight={600} color='#FFFFFF'>₦{formatNumberDecimals(13000000)}</Text>        
                        </Stack>               
                    </HStack>
                    <HStack justifyContent='space-between'>
                        <Stack spacing={0}>
                            <Text fontSize='16px' fontWeight={400} color='#FFFFFF'>Interest Earned</Text>
                            <Text fontSize='24px' fontWeight={600} color='#FFFFFF'>₦{formatNumberDecimals(13000000)}</Text>        
                        </Stack>
                        <Stack spacing={0} textAlign='right'>
                            <Text fontSize='16px' fontWeight={400} color='#FFFFFF'>Maturity Date</Text>
                            <Text fontSize='24px' fontWeight={600} color='#FFFFFF'>25/Sept/2024</Text>        
                        </Stack>               
                    </HStack>
                </Stack>

                <HStack w='75%' maxWidth='700px' mt='16px'>
                    <Switch size="md" color="#A41856" colorScheme="#A41856" sx={{ ".chakra-switch__track[data-checked]:not([data-theme])": {backgroundColor: "#A41856"}}}/>
                    <Text fontSize='14px' fontWeight={450} color='#667085'>I hereby agree to be charged a portion of my interest accrued because I’m breaking this target before the withdrawal date</Text>
                </HStack>

                <Button onClick={moveToComplete} mt='33px' w='75%' h='48px' maxWidth='700px' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Break Plan</Button>

            </CardContainer>}

            
            {showComplete && <Box>
                <HStack bg='#EAECF0' px={'26px'} py={'14px'} borderRadius={'12px 12px 0 0'}>
                    <Button onClick={moveToDetails} h='24px' bg='#EAECF0' p={0} _hover={{ bg: '#EAECF0' }}><img src={getImageUrl('icons/blackLeftArrow.png')} alt="back" /></Button>
                    <Text width='90%' textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>Complete {header}</Text>
                </HStack>

                <CompleteTransaction type='savings' backToSaving={moveToDetails} />
                {/* <OtpInput type='savings' length={4} size='lg' width='800px' setOtp  backToSaving={moveToDetails} /> */}

            </Box>}

            <TopUpModal isOpen={isOpenTopup} onClose={onCloseTopup} handleProceed={moveToComplete} />
            <TopUpModalComplete isOpen={isOpenTopupComplete} onClose={onCloseTopupComplete} handleProceed={proceedTopUp} />
            <WithdrawModal isOpen={isOpenWithdraw} onClose={onCloseWithdraw} handleProceed={moveToComplete} cancel={moveToDetails} />
            <ExtendModal isOpen={isOpenExtend} onClose={onCloseExtend} handleProceed={moveToComplete} />
            <BreakWarningModal isOpen={isOpenBreak} onClose={onCloseBreak} handleProceed={moveToBreak} />
            <EditNameModal isOpen={isOpenRename} onClose={onCloseRename} handleProceed={moveToComplete} />

        </div>
    )
}