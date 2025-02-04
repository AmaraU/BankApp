/* eslint-disable react/prop-types */
import {
  Stack,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Text,
  Box,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import styles from "../../Pages/SavingsPage/Savings.module.css";
import { useState } from "react";
import TargetSavingsOption from "../../elements/Modals/TargetSavingsOption";
import CardContainer from "../../elements/CardContainer";
import { getImageUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { NewSaving } from "./NewSaving";
import { TargetSavingsDetails } from "./TargetSavingsDetails";
import { InviteFriendsModal } from "../../elements/Modals/InviteFriendsModal";


function TargetSavings() {

  const { isOpen: isOpenInvite, onOpen: onOpenInvite, onClose: onCloseInvite } = useDisclosure();
  const [ showSavings, setShowSavings ] = useState(true);
  const [ showCreate, setShowCreate ] = useState(false);
  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ showDetails, setShowDetails ] = useState(false);

  const [ selected, setSelected ] = useState(null);
  const [ modalopen, setModalOpen ] = useState(false);
  const [ innerTabIndex, setInnerTabIndex ] = useState(0);
  const [ type, setType ] = useState('');
  const navigate = useNavigate();

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const showModal = () => {
    setModalOpen(true);
  };
  const handleInnerTabsChange = (index) => {
    setInnerTabIndex(index);
  }

  const moveToSavings = () => {
    setShowSavings(true);
    setShowCreate(false);
    setShowSuccess(false);
    setShowDetails(false);
  }
  const moveToCreate = () => {
    setShowSavings(false);
    setShowCreate(true);
    setShowSuccess(false);
    setShowDetails(false);
    setModalOpen(false);
  }
  const movetoSuccess = () => {
    setShowSavings(false);
    setShowCreate(false);
    setShowSuccess(true);
    setShowDetails(false);
  }
  const moveToDetails = (save) => {
    setShowSavings(false);
    setShowCreate(false);
    setShowSuccess(false);
    setShowDetails(true);
    setSelected(save);
    onCloseInvite();
  }

  const activeSavings = [
    {
      name: 'Japa Moves',
      amount_saved: 100000,
      target_amount: 2080000,
      days_left: 24,
      type: 'personal'
    },
    {
      name: 'Japa Moves',
      amount_saved: 100000,
      target_amount: 2080000,
      days_left: 24,
      type: 'group'
    },
    {
      name: 'Japa Moves',
      amount_saved: 100000,
      target_amount: 2080000,
      days_left: 24
    },
    {
      name: 'Japa Moves',
      amount_saved: 100000,
      target_amount: 2080000,
      days_left: 24
    },
    {
      name: 'Japa Moves',
      amount_saved: 100000,
      target_amount: 2080000,
      days_left: 24
    },
    {
      name: 'Japa Moves',
      amount_saved: 100000,
      target_amount: 2080000,
      days_left: 24
    }
  ];
  const completedSavings = [];


  return (
    <div className={styles.whole}>

      {showSavings && <HStack alignItems='center' spacing='8px' mb="16px" onClick={()=>navigate('/overview/savings')} cursor='pointer'>
        <img src={getImageUrl('icons/blackLeftArrow.png')} alt="" />
        <Text fontSize="24px" fontWeight={700} color={"#101828"}>
          Target Savings
        </Text>
      </HStack>}
        
      {!showSavings && <Text  mb="24px" fontSize="24px" fontWeight={700} color={"#101828"}>Target Savings</Text>}

      <HStack alignItems='center' justifyContent='space-between' mr={4}>

        <Box></Box>

        {showSavings && <Button onClick={showModal} mb='24px' bg='#A41857' _hover={{bg: '#90164D'}} borderRadius='34px' fontSize='13px' fontWeight={500} color='#FFFFFF'>Create New Target</Button>}
      </HStack>

      {showSavings && <Box>
        <HStack bg='#EAECF0' px='26px' py='14px' borderRadius='12px 12px 0 0'>
          <Text width='100%' textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>My Target Savings</Text>
        </HStack>
        <Stack spacing='24px' alignItems='center' border='1px solid #EFECE9' bg='#FFFFFF' borderRadius='0 0 12px 12px' px='16px' pb='114px' pt='48px'>

          <Tabs index={innerTabIndex} onChange={handleInnerTabsChange} w='75%' display='flex' flexDirection='column' alignItems='center'>
            <TabList borderBottom='none' gap='5px' mb='24px' border='1px solid #EAECF0' borderRadius='8px' p='4px' w='50%'>
              <Tab
                rounded="6px"
                fontSize="12px"
                color="#667085"
                fontWeight={500}
                border="none"
                py="8px"
                w='100%'
                _selected={{
                  color: "#FFFFFF",
                  bg: "#A41857",
                }}
              >
                Active
                <Box ml='8px' bg={innerTabIndex === 0 ? '#FFF' : '#EBEBEB'} color={innerTabIndex === 0 ? '#A41857' : '#667085'} borderRadius='50px' px='10px'>{activeSavings.length}</Box>
              </Tab>
              <Tab
                rounded="6px"
                fontSize="12px"
                color="#667085"
                fontWeight={500}
                border="none"
                py="8px"
                w='100%'
                _selected={{
                  color: "#FFFFFF",
                  bg: "#A41857",
                }}
              >
                Completed
                <Box ml='8px' bg={innerTabIndex === 1 ? '#FFF' : '#EBEBEB'} color={innerTabIndex === 1 ? '#A41857' : '#667085'} borderRadius='50px' px='10px'>{completedSavings.length}</Box>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {activeSavings.length === 0 ? (
                  <Stack alignItems='center'>
                    <img src={getImageUrl('icons/greyTarget.png')} style={{width: '90px', height: '90px'}} />
                    <Text fontSize='16px' fontWeight={400} color='#667085'>No active target savings</Text>
                    <Button w='70%' my={4} color='#FFF' bg='#A41856' _hover={{bg: '#90164D'}} onClick={showModal}>Create Target Savings</Button>
                  </Stack>
                ) : (
                  <Grid gridTemplateColumns='repeat(3, auto)' gap='8px' w='100%'>
                    {activeSavings.map((save, index) => (
                      <GridItem p='18px' borderRadius='8px' border='1px solid #EAECF0'>
                        <HStack justifyContent='space-between' mb='16px'>
                          <Text fontSize='1vw' fontWeight={600} color='#101828'>{save.name}</Text>
                          <Box bg='#3448F01A' px='4%' py='2px' borderRadius='34px'><Text fontSize='0.7vw' fontWeight={450} color='#4E61FF'>₦{save.amount_saved/1000}k saved</Text></Box>
                        </HStack>

                        <progress className={styles.progress} max={save.target_amount} value={save.amount_saved} />

                        <HStack alignItems='start' justifyContent='space-between' mt='8px' mb='24px'>
                          <Stack spacing={0}>
                            <Text fontSize='14px' fontWeight={600} color='#667085'>₦{formatNumber(save.target_amount)}</Text>
                            <Text fontSize='10px' fontWeight={450} color='#667085'>Target Amount</Text>
                          </Stack>

                          <Text fontSize='14px' fontWeight={450} color='#667085'>{save.days_left} Days Left</Text>
                        </HStack>

                        <Button w='100%' color='#101828' fontSize='14px' bg='#EFECE9' _hover={{bg: '#E3E1DE'}} onClick={()=>moveToDetails(save)}>View Details</Button>
                      </GridItem>
                    ))}

                  </Grid>
                )}
              </TabPanel>

              <TabPanel>
                {completedSavings.length === 0 ? (
                  <Stack alignItems='center'>
                    <img src={getImageUrl('icons/greyTarget.png')} style={{width: '90px', height: '90px'}} />
                    <Text fontSize='16px' fontWeight={400} color='#667085'>No completed target savings</Text>
                  </Stack>
                ) : (
                  <Stack></Stack>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Stack>
      </Box>}

      {showCreate && <NewSaving type={type} goBack={moveToSavings} showSuccess={movetoSuccess} />}

      {showSuccess && <CardContainer title={'My Target Savings'}>
        <Stack spacing={1} w='75%' alignItems='center'>
          <img src={getImageUrl('icons/success.png')}  style={{height: '84px', width: 'auto'}}/>
          <Text fontSize='18px' fontWeight={700} color='#000000'>Success!</Text>
          <Text fontSize='14px' fontWeight={450} color='#667085'>Your target savings has been created successfully</Text>

          {type === 'personal' && <Button h='48px' my={8} w="80%" color={"white"} bg={"#A41856"} _hover={{bg: '#90164D'}} onClick={()=>navigate('/overview/savings')}>Okay, Thank You</Button>}

          {type === 'group' && <Stack my={8} w='80%'>
            <Button h='48px' w="100%" color='white' bg='#A41856' _hover={{bg: '#90164D'}} onClick={onOpenInvite}>Invite Friends</Button>
            <Button h='48px' w="100%" color='#667085' bg='#EFECE9' _hover={{bg: '#E3E1DE'}} onClick={()=>moveToDetails(activeSavings[1])}>Go to Group</Button>
          </Stack>}
        </Stack>
      </CardContainer>}
      
      {showDetails && <TargetSavingsDetails type={selected.type} title={selected.name} goBack={moveToSavings} showSuccess={movetoSuccess} />}


      <TargetSavingsOption
        isOpen={modalopen}
        close={() => setModalOpen(false)}
        setType={setType}
        moveNext={moveToCreate}
      />

      <InviteFriendsModal isOpen={isOpenInvite} onClose={onCloseInvite} handleProceed={()=>moveToDetails(activeSavings[1])} />


    </div>
    
  );
}

export default TargetSavings;
