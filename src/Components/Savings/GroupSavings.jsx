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
import CardContainer from "../../elements/CardContainer";
import { getImageUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { InviteFriendsModal } from "../../elements/Modals/InviteFriendsModal";
import { NewFixedSaving } from "./NewFixedSaving";
import FixedSavingsOption from "../../elements/Modals/FixedSavingsOption";
import { FixedSavingsDetails } from "./FixedSavingsDetails";
import GroupSavingsOption from "../../elements/Modals/GroupSavingsOption";
import { NewSaving } from "./NewSaving";
import { TargetSavingsDetails } from "./TargetSavingsDetails";


function GroupSavings() {

  const { isOpen: isOpenInvite, onOpen: onOpenInvite, onClose: onCloseInvite } = useDisclosure();
  const [ showSavings, setShowSavings ] = useState(true);
  const [ showCreate, setShowCreate ] = useState(false);
  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ showDetails, setShowDetails ] = useState(false);

  const [ selected, setSelected ] = useState({});
  const [ modalopen, setModalOpen ] = useState(false);
  const [ innerTabIndex, setInnerTabIndex ] = useState(0);
  const [ type, setType ] = useState('');
  const navigate = useNavigate();

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const formatNumberMK = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`;
    } else {
      return num.toString();
    }
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
    console.log(save);
    onCloseInvite();
  }

  const groupSavings = [
    {
      name: 'Japa Moves',
      amount_each: 200000,
      members_no: 100,
      amount_saved: 200000,
      total_amount: 1000000,
      days_left: 24,
      type: 'Target'
    },
    {
      name: 'Japa Moves',
      amount_each: 200000,
      members_no: 100,
      amount_saved: 200000,
      total_amount: 1000000,
      days_left: 24,
      type: 'Target'
    },
    {
      name: 'Japa Moves',
      amount_each: 200000,
      members_no: 20,
      amount_saved: 200000,
      total_amount: 1000000,
      days_left: 24,
      type: 'Fixed'
    },
    {
      name: 'Japa Moves',
      amount_each: 200000,
      members_no: 100,
      amount_saved: 200000,
      total_amount: 1000000,
      days_left: 24,
      type: 'Target'
    },
    {
      name: 'Japa Moves',
      amount_each: 200000,
      members_no: 20,
      amount_saved: 200000,
      total_amount: 1000000,
      days_left: 24,
      type: 'Fixed'
    },
    {
      name: 'Japa Moves',
      amount_each: 200000,
      members_no: 100,
      amount_saved: 200000,
      total_amount: 1000000,
      days_left: 24,
      type: 'Target'
    },
    {
      name: 'Japa Moves',
      amount_each: 200000,
      members_no: 20,
      amount_saved: 200000,
      total_amount: 1000000,
      days_left: 24,
      type: 'Fixed'
    },
    {
      name: 'Japa Moves',
      amount_each: 200000,
      members_no: 100,
      amount_saved: 200000,
      total_amount: 1000000,
      days_left: 24,
      type: 'Target'
    }
  ];


  return (
    <div className={` ${styles.whole} ${styles.flex}`}>

      {showSavings && <HStack alignItems='center' spacing='8px' mb="16px" onClick={()=>navigate('/overview/savings')} cursor='pointer'>
        <img src={getImageUrl('icons/blackLeftArrow.png')} alt="" />
        <Text fontSize="24px" fontWeight={700} color={"#101828"}>
          Group Savings
        </Text>
      </HStack>}
        
      {!showSavings && <Text  mb="24px" fontSize="24px" fontWeight={700} color={"#101828"}>Group Savings</Text>}


      {showSavings && <Button onClick={showModal} w='fit-content' alignSelf='end' bg='#A41857' mb="24px" _hover={{bg: '#90164D'}} borderRadius='34px' fontSize='13px' fontWeight={500} color='#FFFFFF'>
        <img src={getImageUrl('icons/whitePlus.png')} style={{width: '16px', height: '16px', marginRight: '4px', marginBottom: '3px'}} />
        Create Group Savings
      </Button>}


      {showSavings && <Box>
        <HStack bg='#EAECF0' px='26px' py='14px' borderRadius='12px 12px 0 0'>
          <Text width='100%' textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>My Target Savings</Text>
        </HStack>
        <Stack spacing='24px' alignItems='center' border='1px solid #EFECE9' bg='#FFFFFF' borderRadius='0 0 12px 12px' px='16px' pb='114px' pt='48px'>

        <Stack px='24px' w='100%' maxW='1000px' alignItems='center'>

          <HStack mb='12px' spacing='8px'  maxWidth='800px' w='80%'>
            <HStack border='1px solid #DCD6CF' px='20px' py='10px' borderRadius='8px' w='100%'>
              <input onChange={''} placeholder="Search" style={{ width: '100%', outline:'transparent', border:'none', fontSize:'16px', color:'#A0A4A9', padding: '0'}}/>
              <img style={{width: '24px', height:'24px'}} src={getImageUrl('icons/search.png')} alt="search" />
            </HStack>
            <HStack border='1px solid #DCD6CF' py='10px' px='16px' borderRadius='8px'>
              <img src={getImageUrl('icons/filter.png')} alt="search" />
              <Text fontSize='16px' color='#A0A4A9' mr='16px'>Filter</Text>
            </HStack>
          </HStack>


          {groupSavings.length === 0 ? (
            <Stack alignItems='center'>
              <img src={getImageUrl('icons/fixedSavings.png')} style={{width: '90px', height: '90px'}} />
              <Text fontSize='16px' fontWeight={400} color='#667085'>No group savings</Text>
              <Button w='70%' my={4} color='#FFF' bg='#A41856' _hover={{bg: '#90164D'}} onClick={showModal}>Create Group Savings</Button>
            </Stack>
          ) : (

            <Grid gridTemplateColumns='repeat(3, auto)' gap='8px' w='100%'>
              {groupSavings.map((save, index) => (
                <GridItem p='18px' borderRadius='8px' border='1px solid #EAECF0' key={index}>
                  <HStack justifyContent='space-between' mb='16px'>
                    <Text fontSize='16px' fontWeight={600} color='#101828'>{save.name}</Text>
                    <Box bg='#3448F01A' px='8px' py='2px' borderRadius='34px'><Text fontSize='12px' fontWeight={450} color='#4E61FF'>₦{formatNumberMK(save.amount_each)} each ({save.type})</Text></Box>
                  </HStack>

                  <progress className={styles.progress} max={save.total_amount} value={save.amount_saved} />

                  <HStack alignItems='start' justifyContent='space-between' mt='8px' mb='24px'>
                    <Text fontSize='14px' fontWeight={500} color='#667085'>{save.members_no} members</Text>
                    <Text fontSize='14px' fontWeight={450} color='#667085'>{save.days_left} Days Left {save.type === 'Fixed' ? 'to Start' : ''}</Text>
                  </HStack>

                  <Button w='100%' color='#101828' fontSize='14px' bg='#EFECE9' _hover={{bg: '#E3E1DE'}} onClick={()=>moveToDetails(save)}>View Details</Button>
                </GridItem>
              ))}
            </Grid>

          )}
        
        </Stack>
      </Stack>
      </Box>}

      {showCreate && 
        type.toLowerCase() === 'fixed' ? <NewFixedSaving type={'group'} goBack={moveToSavings} showSuccess={movetoSuccess} />
        : type.toLowerCase() === 'target' ? <NewSaving type={'group'} goBack={moveToSavings} showSuccess={movetoSuccess} />
        : ''
      }

      {showSuccess && <CardContainer title={'My Fixed Savings'}>
        <Stack spacing={1} w='75%' alignItems='center'>
          <img src={getImageUrl('icons/success.png')}  style={{height: '84px', width: 'auto'}}/>
          <Text fontSize='18px' fontWeight={700} color='#000000'>Success!</Text>
          <Text fontSize='14px' fontWeight={450} color='#667085'>Your fixed savings has been created successfully</Text>

          {type === 'personal' && <Button h='48px' my={8} w="80%" color={"white"} bg={"#A41856"} _hover={{bg: '#90164D'}} onClick={()=>navigate('/overview/savings')}>Okay, Thank You</Button>}

          {type === 'group' && <Stack my={8} w='80%'>
            <Button h='48px' w="100%" color='white' bg='#A41856' _hover={{bg: '#90164D'}} onClick={onOpenInvite}>Invite Friends</Button>
            <Button h='48px' w="100%" color='#667085' bg='#EFECE9' _hover={{bg: '#E3E1DE'}} onClick={()=>moveToDetails(activeSavings[1])}>Go to Group</Button>
          </Stack>}
        </Stack>
      </CardContainer>}

      {showDetails && 
        selected.type === 'Fixed' ? <FixedSavingsDetails type={'group'} title={selected.name} goBack={moveToSavings} showSuccess={movetoSuccess} isMember={false} />
        : selected.type === 'Target' ? <TargetSavingsDetails type={'group'} title={selected.name} goBack={moveToSavings} showSuccess={movetoSuccess} isMember={false}/>
        : ''
      }

      <GroupSavingsOption
        isOpen={modalopen}
        close={() => setModalOpen(false)}
        setType={setType}
        moveNext={moveToCreate}
      />

      <InviteFriendsModal isOpen={isOpenInvite} onClose={onCloseInvite} handleProceed={()=>moveToDetails(activeSavings[1])} />

    </div>
    
  );
}

export default GroupSavings;