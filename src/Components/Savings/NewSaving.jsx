import React, { useState } from "react";
import { FormControl, FormLabel, Stack, Input, Select, InputLeftElement, InputGroup, Button, HStack, Text, Box } from "@chakra-ui/react";
import CardContainer from "../../elements/CardContainer";
import FinalizeSavings from "../../elements/Modals/FinalizeSavings";
import styles from "../../Pages/SavingsPage/Savings.module.css";


export const NewSaving = ({ goBack, type, showSuccess }) => {

    const [ frequency, setFrequency ] = useState("");
    const [ open, setOpen ] = useState(false);

    const CATEGORIES = [
        "Rent/Accomodation",
        "Travel/Vacation",
        "Education/Study",
        "Fees/Debt",
        "Starting/Growing a business",
        "Birthday",
        "Gadgets",
        "Home appliances",
        "Investment",
    ];
    const FREQUENCY = ["Daily", "Weekly", "Monthly", "Manual"];
    const DURATION = ["1 Month", "2 Months", "3 Months", "4 Months"];
    const INVITERS = ["Any member", "Only Admin"];


    return (
        <div>
            <CardContainer
                title={type === 'personal' ? 'Create a Personal Target Savings'
                    : type === 'group' ? 'Create a Target Savings for Group' : ''}
                moveToOne={goBack}
            >
                <Stack maxWidth={"600px"} width={"75%"}>
                <FormControl className={styles["personal-saving-form"]}>
                    <HStack w='100%' spacing='16px'>
                        <div style={{width: '100%'}}>
                        <FormLabel fontSize='16px' fontWeight={400} color='#101828'>Group Name</FormLabel>
                        <Input bg='#F7F7F7' border='1px solid #EAECF0' />
                        </div>

                        <div style={{width: '100%'}}>
                        <FormLabel fontSize='16px' fontWeight={400} color='#101828'>Category</FormLabel>
                        <Select bg='#F7F7F7' border='1px solid #EAECF0'>
                            {CATEGORIES.map((option, i) => (
                            <option key={i}>{option}</option>
                            ))}
                        </Select>
                        </div>
                    </HStack>

                    {type === 'group' && <HStack w='100%' spacing='16px'>
                        <div style={{width: '100%'}}>
                        <FormLabel fontSize='16px' fontWeight={400} color='#101828'>Who can invite members?</FormLabel>
                        <Select bg='#F7F7F7' border='1px solid #EAECF0'>
                            {INVITERS.map((option, i) => (
                            <option key={i}>{option}</option>
                            ))}
                        </Select>
                        </div>

                        <div style={{width: '100%'}}>
                        <FormLabel fontSize='16px' fontWeight={400} color='#101828'>Is savings group private or public</FormLabel>
                        <Select bg='#F7F7F7' border='1px solid #EAECF0'>
                            <option>Private</option>
                            <option>Public</option>
                        </Select>
                        </div>
                    </HStack>}

                    <div>
                    <FormLabel fontSize='16px' fontWeight={400} color='#101828'>How often do you want to save?</FormLabel>
                    <Select value={frequency} onChange={(e) => setFrequency(e.target.value)} bg='#F7F7F7' border='1px solid #EAECF0'>
                        {FREQUENCY.map((option, i) => (
                        <option key={i}>{option}</option>
                        ))}
                    </Select>
                    </div>

                    <div>
                    <FormLabel fontSize='16px' fontWeight={400} color='#101828'>What is your target amount?</FormLabel>
                    <InputGroup>
                        <InputLeftElement>₦</InputLeftElement>
                        <Input bg='#F7F7F7' border='1px solid #EAECF0' inputMode={"numeric"} type={"number"} />
                    </InputGroup>
                    </div>

                    <div>
                    <FormLabel fontSize='16px' fontWeight={400} color='#101828'>How long do you want to save for?</FormLabel>
                    <Select bg='#F7F7F7' border='1px solid #EAECF0'>
                        {DURATION.map((option, i) => (
                        <option key={i}>{option}</option>
                        ))}
                    </Select>
                    </div>

                    <HStack w='100%'>
                        <div style={{width: '100%'}}>
                        <FormLabel fontSize='16px' fontWeight={400} color='#101828'>Start Date</FormLabel>
                        <Input type="date" bg='#F7F7F7' border='1px solid #EAECF0' />
                        </div>

                        <div style={{width: '100%'}}>
                        <FormLabel fontSize='16px' fontWeight={400} color='#101828'>Preferred Time</FormLabel>
                        <Input type="time" bg='#F7F7F7' border='1px solid #EAECF0' />
                        </div>
                    </HStack>

                    <div>
                        <FormLabel fontSize='16px' fontWeight={400} color='#101828'>Amount to save {frequency === 'Manual' ? '' : frequency.toLowerCase()} </FormLabel>
                        <InputGroup>
                            <InputLeftElement>₦</InputLeftElement>
                            <Input bg='#F7F7F7' border='1px solid #EAECF0' inputMode={"numeric"} type={"number"} />
                        </InputGroup>
                    </div>

                    <Text fontSize='12px' fontWeight={400} color='#667085'>You can modify this amount by entering the exact amount in the input field but it will affect your target amount</Text>
                </FormControl>

                <Box bg='#EFECE9' borderRadius='8px' p='16px' mt='8px'>
                    <Text fontSize='12px' fontWeight={450} color='#101828'>Estimated Intrest to Earn</Text>
                    <Text fontSize='24px' fontWeight={700} color='#101828'>₦230,000</Text>
                </Box>

                <Button
                    onClick={() => setOpen(true)}
                    my={"4"}
                    w={"100%"}
                    size={"lg"}
                    color={"white"}
                    bg={"#A41856"}
                    _hover={{bg: '#90164D'}}
                >
                    Continue
                </Button>

                <FinalizeSavings
                    isOpen={open}
                    close={() => setOpen(false)}
                    showSuccess={showSuccess}
                />
                </Stack>
            </CardContainer>
        </div>
    )
}