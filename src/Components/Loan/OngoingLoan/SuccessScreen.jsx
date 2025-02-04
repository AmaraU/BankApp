import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { getImageUrl } from "../../../../utils";

export const SuccessScreen = ({ moveToOptions, type }) => {
    return (
        <>
        <Box bg='#EAECF0' h='50px' w='100%' borderRadius={'12px 12px 0 0'}></Box>
        <Stack spacing={'20px'} alignItems={'center'} border={'1px solid #EFECE9'} bg={'#FFFFFF'} borderRadius={'0 0 12px 12px'} py={'16px'} pb={'114px'}>                                
            
            <img style={{width: '200px', height: 'auto'}} src={getImageUrl('icons/success.png')} />

            <Stack>
                <Text mt={'12px'} fontSize={'18px'} fontWeight={700} color={'#000000'} textAlign={'center'}>Success!</Text>
                {type === 'staff' ? 
                    <Text fontSize='14px' fontWeight={500} color='#667085' textAlign='center'>Your loan request is being reviewed and will be disbursed shortly.</Text>
                    : <Text fontSize='14px' fontWeight={500} color='#667085' textAlign='center'>Your loan has been disbursed into your your account</Text>}
            </Stack>

            <Button
                mt='16px' w='75%' h='48px'
                bg='#A41856' _hover={{bg: '#90164D'}}
                color='#FFFFFF' fontSize='14px' fontWeight={600}
                onClick={moveToOptions}
            >
                Proceed to loan dashboard
            </Button>
        </Stack>
        </>
    )
}