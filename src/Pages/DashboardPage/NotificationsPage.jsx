import { useEffect, useRef, useState } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Text, Box, HStack, Stack } from "@chakra-ui/react";
import styles from './Overview.module.css';
import CardContainer from "../../elements/CardContainer";
import { getImageUrl } from "../../../utils";
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../../App.css';


export const NotificationsPage = () => {

    const [ tabIndex, setTabIndex ] = useState(0);
    const [ dateRange, setDateRange ] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    const [ showCalendar, setShowCalendar ] = useState(false);
    const filterRef = useRef(null);
    const filterReff = useRef(null);
    const filterRefff = useRef(null);

    const notifications = [
        {
          title: 'Account Credited',
          details: "You've received a credit transfer of ₦100,500 from Jonah Jameson",
          time: '2024-10-31',
          read: false,
        },
        {
          title: 'Transfer Successful',
          details: "Your transfer of ₦100,500 to Angela Folarin was successful.",
          time: '2024-10-30',
          read: false,
        },
        {
          title: 'Airtime Purchase Successful',
          details: "You made MTN airtime purchase of ₦100,500 to 08101790957",
          time: '2024-10-29',
          read: false,
        },
        {
          title: 'Account Credited',
          details: "You've received a credit transfer of ₦100,500 from Jonah Jameson",
          time: '2024-10-28',
          read: true,
        },
        {
          title: 'Transfer Successful',
          details: "Your transfer of ₦100,500 to Adeola Obasanjo was successful",
          time: '2024-10-27',
          read: true,
        },
    ]

    const [ dateFilteredNotifs, setDateFilteredNotifs ] = useState(notifications);

    const handleTabsChange = (index) => {
        setTabIndex(index);
        setDateFilteredNotifs(notifications);
        window.scrollTo({ top: 0});
    }

    const handleSelect = ranges => {
        setDateRange([ranges.selection]);
    };
    const applyFilter = () => {
        const { startDate, endDate } = dateRange[0];
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        const filtered = notifications.filter(item => {
          const itemDate = new Date(item.time);
          return itemDate >= startDate && itemDate < adjustedEndDate;
        });
        setDateFilteredNotifs(filtered);
        setShowCalendar(false);
    };
    const cancelFilter = () => {
        setDateFilteredNotifs(notifications);
        setShowCalendar(false);
    };

    const handleClickOutside = (event) => {
        if ((filterRef.current && !filterRef.current.contains(event.target))
        && (filterReff.current && !filterReff.current.contains(event.target))
        && (filterRefff.current && !filterRefff.current.contains(event.target))) {
            setShowCalendar(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    
    return (
        <div className={styles.whole}>
            <Text fontSize='24px' fontWeight={700} color='#101828' mb='16px'>Notifications</Text>
            
            <Tabs index={tabIndex} onChange={handleTabsChange}>
                <TabList borderBottom={'none'} gap={'5px'} mb={'24px'}>
                    <Tab rounded='50px' fontSize='13px' color='#667085' fontWeight={500} border='1px solid #EAECF0' py='12px' px='14px'  _selected={{ color: '#FFFFFF', bg: '#667085', border: '1px solid transparent', boxShadow: '0px 0px 1px 0px #00000066'}}> All </Tab>
                    <Tab rounded='50px' fontSize='13px' color='#667085' fontWeight={500} border='1px solid #EAECF0' py='12px' px='14px'  _selected={{ color: '#FFFFFF', bg: '#667085', border: '1px solid transparent', boxShadow: '0px 0px 1px 0px #00000066'}}>Read</Tab>
                    <Tab rounded='50px' fontSize='13px' color='#667085' fontWeight={500} border='1px solid #EAECF0' py='12px' px='14px'  _selected={{ color: '#FFFFFF', bg: '#667085', border: '1px solid transparent', boxShadow: '0px 0px 1px 0px #00000066'}}>Unread</Tab>
                </TabList>


                <TabPanels maxWidth={'1000px'}>
                    
                    <TabPanel ml={-4}>
                        <CardContainer title={'Recent Notifications'}>
                            
                            <Stack width={{base: "90%", md: '80%'}}>
                                <HStack justifyContent='space-between' alignItems='center' mb='16px'>
                                    <Text fontSize='16px' fontWeight={500} color='#A41857' cursor='pointer' textDecoration='underline'>Mark all as read</Text>
                                    <div>
                                        <HStack border='1px solid #DCD6CF' p='10px' borderRadius='8px' cursor='pointer' onClick={()=>setShowCalendar(!showCalendar)}>
                                            <img src={getImageUrl('icons/filter.png')} alt="search" />
                                            <Text fontSize='16px' color='#A0A4A9'>Filter</Text>
                                        </HStack>
                                        {showCalendar && (
                                            <div className="calendarDiv" ref={filterRef}>
                                                <DateRange
                                                    editableDateInputs={true}
                                                    onChange={handleSelect}
                                                    moveRangeOnFirstSelection={false}
                                                    ranges={dateRange}
                                                />
                                                <div className="calendarButtons">
                                                    <button className="cancel" onClick={cancelFilter}>Cancel</button>
                                                    <button className="apply" onClick={applyFilter}>Apply</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </HStack>

                                {dateFilteredNotifs.length === 0 ? <Stack>
                                    <Text>No Recent Notifications</Text>
                                    <Text>New notifications will appear here</Text>
                                </Stack>
                                :
                                dateFilteredNotifs.map((notif, i) => (
                                    <HStack key={i}
                                        justifyContent='space-between'
                                        py='12px' px='8px'
                                        borderRadius='8px'
                                        bg={i%2 === 1 ? '#F7F7F7' : ''}
                                        border={i%2 === 1 ? '1px solid #EAECF0' : ''}
                                        alignItems='start'
                                    >
                                        <Stack spacing='2px'>
                                            <Text fontSize='18px' fontWeight={600} color='#0C111D' >{notif.title}</Text>
                                            <Text fontSize='16px' fontWeight={400} color='#667085' >{notif.details}</Text>
                                            <Text fontSize='14px' fontWeight={400} color='#667085' >{format(new Date(notif.time), 'dd-MMM-yyyy')}</Text>
                                        </Stack>
                                        {!notif.read && <Box width='6px' height='6px' borderRadius='50px' bg='#A41857'></Box>}
                                    </HStack>
                                ))}
                            </Stack>
                        </CardContainer>
                    </TabPanel>
                    
                    <TabPanel ml={-4}>
                        <CardContainer title={'Read Notifications'}>
                        
                            <Stack width='80%'>
                                <HStack justifyContent='space-between' alignItems='center' mb='16px'>
                                    <Box></Box>
                                    <div>
                                        <HStack border='1px solid #DCD6CF' p='10px' borderRadius='8px' cursor='pointer' onClick={()=>setShowCalendar(!showCalendar)}>
                                            <img src={getImageUrl('icons/filter.png')} alt="search" />
                                            <Text fontSize='16px' color='#A0A4A9'>Filter</Text>
                                        </HStack>
                                        {showCalendar && (
                                            <div className="calendarDiv" ref={filterReff}>
                                                <DateRange
                                                    editableDateInputs={true}
                                                    onChange={handleSelect}
                                                    moveRangeOnFirstSelection={false}
                                                    ranges={dateRange}
                                                />
                                                <div className="calendarButtons">
                                                    <button className="cancel" onClick={cancelFilter}>Cancel</button>
                                                    <button className="apply" onClick={applyFilter}>Apply</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </HStack>

                                {dateFilteredNotifs.filter((e => e.read)).length === 0 ? <Stack>
                                    <Text>No Notifications</Text>
                                    <Text>New notifications will appear here</Text>
                                </Stack>
                                :
                                dateFilteredNotifs.filter((e => e.read)).map((notif, i) => (
                                    <HStack key={i}
                                        justifyContent='space-between'
                                        py='12px' px='8px'
                                        borderRadius='8px'
                                        bg={i%2 === 1 ? '#F7F7F7' : ''}
                                        border={i%2 === 1 ? '1px solid #EAECF0' : ''}
                                        alignItems='start'
                                    >
                                        <Stack spacing='2px'>
                                            <Text fontSize='18px' fontWeight={600} color='#0C111D' >{notif.title}</Text>
                                            <Text fontSize='16px' fontWeight={400} color='#667085' >{notif.details}</Text>
                                            <Text fontSize='14px' fontWeight={400} color='#667085' >{format(new Date(notif.time), 'dd-MMM-yyyy')}</Text>
                                        </Stack>
                                        {!notif.read && <Box width='6px' height='6px' borderRadius='50px' bg='#A41857'></Box>}
                                    </HStack>
                                ))}
                            </Stack>
                        </CardContainer>
                    </TabPanel>
                    
                    <TabPanel ml={-4}>
                        <CardContainer title={'Unread Notifications'}>
                            
                            <Stack width='80%'>
                                <HStack justifyContent='space-between' alignItems='center' mb='16px'>
                                    <Text fontSize='16px' fontWeight={500} color='#A41857' cursor='pointer' textDecoration='underline'>Mark all as read</Text>
                                    <div>
                                        <HStack border='1px solid #DCD6CF' p='10px' borderRadius='8px' cursor='pointer' onClick={()=>setShowCalendar(!showCalendar)}>
                                            <img src={getImageUrl('icons/filter.png')} alt="search" />
                                            <Text fontSize='16px' color='#A0A4A9'>Filter</Text>
                                        </HStack>
                                        {showCalendar && (
                                            <div className="calendarDiv" ref={filterRefff}>
                                                <DateRange
                                                    editableDateInputs={true}
                                                    onChange={handleSelect}
                                                    moveRangeOnFirstSelection={false}
                                                    ranges={dateRange}
                                                />
                                                <div className="calendarButtons">
                                                    <button className="cancel" onClick={cancelFilter}>Cancel</button>
                                                    <button className="apply" onClick={applyFilter}>Apply</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </HStack>

                                {dateFilteredNotifs.filter((e => e.read === false)).length === 0 ? <Stack>
                                    <Text>No Unread Notifications</Text>
                                    <Text>New notifications will appear here</Text>
                                </Stack>
                                :
                                dateFilteredNotifs.filter((e => e.read === false)).map((notif, i) => (
                                    <HStack key={i}
                                        justifyContent='space-between'
                                        py='12px' px='8px'
                                        borderRadius='8px'
                                        bg={i%2 === 1 ? '#F7F7F7' : ''}
                                        border={i%2 === 1 ? '1px solid #EAECF0' : ''}
                                        alignItems='start'
                                    >
                                        <Stack spacing='2px'>
                                            <Text fontSize='18px' fontWeight={600} color='#0C111D' >{notif.title}</Text>
                                            <Text fontSize='16px' fontWeight={400} color='#667085' >{notif.details}</Text>
                                            <Text fontSize='14px' fontWeight={400} color='#667085' >{format(new Date(notif.time), 'dd-MMM-yyyy')}</Text>
                                        </Stack>
                                        {!notif.read && <Box width='6px' height='6px' borderRadius='50px' bg='#A41857'></Box>}
                                    </HStack>
                                ))}
                            </Stack>
                        </CardContainer>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}