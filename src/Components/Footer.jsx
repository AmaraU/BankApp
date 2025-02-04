import React from "react";
import { Flex, Text } from "@chakra-ui/react";


export const Footer = () => {

    const goToPolicy = () => {
        window.location.href = '/privacy-policy'
    }

    return (
        <Flex px={{base: '20px', md: '38px'}} py={'44px'} ml={{base: '0', sm: '250px'}} justifyContent={'space-between'}>
            <Text fontSize={{base: '10px', md: '14px'}} color={'#667085'}>© 2024 ARM MFB by ARM Group. All rights reserved.</Text>
            <Text fontSize={{base: '10px', md: '14px'}} color={'#667085'} cursor={'pointer'} _hover={{textDecoration: 'underline'}}>Help Center</Text>
            <Text fontSize={{base: '10px', md: '14px'}} color={'#667085'} cursor={'pointer'} _hover={{textDecoration: 'underline'}} onClick={goToPolicy}>Privacy Policy</Text>
        </Flex>
    )
}