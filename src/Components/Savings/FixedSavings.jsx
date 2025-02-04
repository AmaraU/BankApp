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


function FixedSavings() {

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
    onCloseInvite();
  }

  const activeSavings = [
    {
      name: 'Japa Moves',
      interest: 1000000,
      fixed_amount: 13000000,
      saved_amount: 13000000,
      days_left: 24,
      type: 'personal'
    },
    {
      name: 'Japa Moves',
      interest: 1540000,
      fixed_amount: 13000000,
      saved_amount: 3000000,
      days_left: 24,
      type: 'group'
    },
    {
      name: 'Japa Moves',
      interest: 1300000,
      fixed_amount: 13000000,
      saved_amount: 1005000,
      days_left: 24,
    },
    {
      name: 'Japa Moves',
      interest: 100000,
      fixed_amount: 13000000,
      saved_amount: 1005000,
      days_left: 24,
    },
    {
      name: 'Japa Moves',
      interest: 1300000,
      fixed_amount: 13000000,
      saved_amount: 1005000,
      days_left: 24,
    },
    {
      name: 'Japa Moves',
      interest: 100000,
      fixed_amount: 13000000,
      saved_amount: 1005000,
      days_left: 24,
    }
  ];
  const completedSavings = [];


  return (
    <div className={styles.whole}>

      {showSavings && <HStack alignItems='center' spacing='8px' mb="16px" onClick={()=>navigate('/overview/savings')} cursor='pointer'>
        <img src={getImageUrl('icons/blackLeftArrow.png')} alt="" />
        <Text fontSize="24px" fontWeight={700} color={"#101828"}>
          Fixed Savings
        </Text>
      </HStack>}
        
      {!showSavings && <Text  mb="24px" fontSize="24px" fontWeight={700} color={"#101828"}>Fixed Savings</Text>}

      <HStack alignItems='center' justifyContent='space-between'>

        <Box></Box>

        {showSavings && <Button onClick={showModal} alignSelf={'end'} bg='#A41857' _hover={{bg: '#90164D'}} borderRadius='34px' fontSize='13px' fontWeight={500} color='#FFFFFF' mb='24px'>
          <img src={getImageUrl('icons/whitePlus.png')} style={{width: '16px', height: '16px', marginRight: '4px', marginBottom: '3px'}} />
          Create New Fixed Savings
        </Button>}
      </HStack>

      {showSavings && <Box>
        <HStack bg='#EAECF0' px='26px' py='14px' borderRadius='12px 12px 0 0'>
          <Text width='100%' textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>My Fixed Savings</Text>
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
                    <img src={getImageUrl('icons/fixedSavings.png')} style={{width: '90px', height: '90px'}} />
                    <Text fontSize='16px' fontWeight={400} color='#667085'>No active fixed savings</Text>
                    <Button w='70%' my={4} color='#FFF' bg='#A41856' _hover={{bg: '#90164D'}} onClick={showModal}>Create Fixed Savings</Button>
                  </Stack>
                ) : (
                  <Grid gridTemplateColumns='repeat(3, auto)' gap='8px' w='100%'>
                    {activeSavings.map((save, index) => (
                      <GridItem p='18px' borderRadius='8px' border='1px solid #EAECF0' key={index}>
                        <HStack justifyContent='space-between' mb='16px'>
                          <Text fontSize='1vw' fontWeight={600} color='#101828'>{save.name}</Text>
                          <Box bg='#3448F01A' px='8px' py='2px' borderRadius='34px'><Text fontSize='0.7vw' fontWeight={450} color='#4E61FF'>₦{formatNumberMK(save.interest)} Interest</Text></Box>
                        </HStack>

                        <progress className={styles.progress} max={save.fixed_amount} value={save.saved_amount} />

                        <HStack alignItems='start' justifyContent='space-between' mt='8px' mb='24px'>
                          <Stack spacing={0}>
                            <Text fontSize='14px' fontWeight={600} color='#667085'>₦{formatNumber(save.fixed_amount)}</Text>
                            <Text fontSize='10px' fontWeight={450} color='#667085'>Fixed Amount</Text>
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
                    <img src={getImageUrl('icons/fixedSavings.png')} style={{width: '90px', height: '90px'}} />
                    <Text fontSize='16px' fontWeight={400} color='#667085'>No completed fixed savings</Text>
                  </Stack>
                ) : (
                  <Stack></Stack>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Box>}

      {showCreate && <NewFixedSaving type={type} goBack={moveToSavings} showSuccess={movetoSuccess} />}

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
      
      {showDetails && <FixedSavingsDetails type={selected.type} title={selected.name} goBack={moveToSavings} showSuccess={movetoSuccess} />}

      <FixedSavingsOption
        isOpen={modalopen}
        close={() => setModalOpen(false)}
        setType={setType}
        moveNext={moveToCreate}
      />

      <InviteFriendsModal isOpen={isOpenInvite} onClose={onCloseInvite} handleProceed={()=>moveToDetails(activeSavings[1])} />


    </div>
    
  );
}

export default FixedSavings;




// /* eslint-disable react/prop-types */
// import {
//   FormControl,
//   FormLabel,
//   Stack,
//   Input,
//   Select,
//   InputLeftElement,
//   InputGroup,
//   Button,
//   Card,
//   Text,
// } from "@chakra-ui/react";
// import styles from "../../Pages/SavingsPage/Savings.module.css";
// import { useState } from "react";
// import FinalizeSavings from "../../elements/Modals/FinalizeSavings";

// function FixedSavings({ moveToOptions }) {
//   const CATEGORIES = [
//     "Rent/Accomodation",
//     "Travel/Vacation",
//     "Education/Study",
//     "Fees/Debt",
//     "Starting/Growing a business",
//     "Birthday",
//     "Gadgets",
//     "Home appliances",
//     "Investment",
//   ];

//   const FREQUENCY = ["Daily", "Weekly", "Monthly", "Manual"];

//   const DURATION = ["1 Month", "2 Months", "3 Months", "4 Months"];
//   const [frequency, setFrequency] = useState("");

//   const [open, setOpen] = useState(false);

//   return (
//     <Stack maxWidth={"500px"} width={"100%"}>
//       <FormControl className={styles["personal-saving-form"]}>
//         <div>
//           <FormLabel>What are you saving for?</FormLabel>
//           <Input />
//         </div>

//         <div>
//           <FormLabel>Category</FormLabel>
//           <Select>
//             {CATEGORIES.map((option, i) => (
//               <option key={i}>{option}</option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <FormLabel>What is your target amount?</FormLabel>
//           <InputGroup>
//             <InputLeftElement>₦</InputLeftElement>
//             <Input inputMode={"numeric"} type={"number"} />
//           </InputGroup>
//         </div>

//         <div>
//           <FormLabel>How often do you want to save?</FormLabel>
//           <Select
//             value={frequency}
//             onChange={(e) => setFrequency(e.target.value)}
//           >
//             {FREQUENCY.map((option, i) => (
//               <option key={i}>{option}</option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <FormLabel>How long do you want to save for?</FormLabel>
//           <Select>
//             {DURATION.map((option, i) => (
//               <option key={i}>{option}</option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <FormLabel>Start Date</FormLabel>
//           <Input type="date" />
//         </div>

//         <div>
//           <FormLabel>Preferred Time</FormLabel>
//           <Input type="time" />
//         </div>

//         <div>
//           <div>
//             <FormLabel>How much do you want to save {frequency} </FormLabel>
//             <InputGroup>
//               <InputLeftElement>₦</InputLeftElement>
//               <Input inputMode={"numeric"} type={"number"} />
//             </InputGroup>
//           </div>
//         </div>
//       </FormControl>

//       <Card shadow={"none"} bg={"#EFECE9"} p={"4"}>
//         <Text>Estimated interest to earn</Text>
//         <Text fontSize={"25px"} fontWeight={"600"}>
//           ₦230,000
//         </Text>
//       </Card>

//       <Button
//         onClick={() => setOpen(true)}
//         my={"4"}
//         w={"100%"}
//         size={"lg"}
//         color={"white"}
//         bg={"#A41856"}
//       >
//         {" "}
//         Continue
//       </Button>

//       <FinalizeSavings
//         isOpen={open}
//         close={() => setOpen(false)}
//         showSuccess={() => moveToOptions(3)}
//       />
//     </Stack>
//   );
// }

// export default FixedSavings;
