import { Flex, Stack, Text, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import {  useState, useRef, useCallback } from "react";
import Webcam from 'react-webcam';
import { getImageUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";
import styles from './Onboarding.module.css';

const initialConstraints = {
    width: 1000,
    facingMode: 'user'
}


export const TakeSelfie = () => {

    const webcamRef = useRef(null);
    const [videoConstraints] = useState(initialConstraints);
    const navigate = useNavigate();


    const capturePhoto = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        
        if (!imageSrc) {
            console.error("No image captured from webcam");
            return;
        }
        try {
            const croppedImage = await cropImage(imageSrc, 322, 322);
            navigate('/confirm-picture', { state: { croppedImage } });
        } catch (error) {
            console.error("Error: ", error)
        }
    }, [webcamRef, navigate]);

    const onUserMedia = (e) => {
        console.log(e);
    }

    const cropImage = (src, width, height) => {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                // canvas.width = width;
                // canvas.height = height;
                canvas.width = image.width / 2;
                canvas.height = image.width / 2;
                const ctx = canvas.getContext('2d');

                const startX = (image.width - canvas.width) / 2;
                const startY = (image.height - canvas.height) / 2;

                ctx.drawImage(image, startX, startY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                
                ctx.globalCompositeOperation = 'destination-in';
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
                
                resolve(canvas.toDataURL('image/png'));
            }
        });
    }


    
    return (
        <>
        <Stack
            alignItems="center"
            spacing={5}
            pt={"38px"}
            px={{base: "24px", md: "15%", lg: "25%"}}
            bgImage={getImageUrl("onboardingBackground.png")}
            bgSize="100% 100%"
        >
            
            <Flex justifyContent={'space-between'} w={'100%'}>
                <a href='/verify-number'><img src={getImageUrl('icons/blackLeftArrow.png')} alt="back" /></a>       
                <CircularProgress value={40} size={'32px'} color={'#A41857'}>
                    <CircularProgressLabel fontWeight={700} fontSize={'9px'}>40%</CircularProgressLabel>
                </CircularProgress>

            </Flex>

            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                onUserMedia={onUserMedia}
                mirrored={videoConstraints.facingMode === 'user'}
                className={styles.webcam}
            />

            <Stack
                alignItems={'center'}
                spacing={2}
                bg={'#000000'}
                borderRadius={'11px 11px 0 0'}
                w={'100%'}
                p={'10px'}
                pb={'24px'}
            >
                <Text fontSize={{base: '12px', md: '16px'}} textAlign="center" fontWeight={500} color={'#FFFFFF'} >Keep your head inside the circle</Text>
                <button onClick={capturePhoto}><img className={styles.snap} src={getImageUrl('icons/capture.png')} alt="capture" /></button>
            </Stack>
        </Stack>
        </>
    )
}