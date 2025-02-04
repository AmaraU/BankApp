/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Stack, Text, Box, Button, HStack, Select } from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import Pagination from "../../Components/Pagination/Pagination";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styles from "../DashboardPage/Overview.module.css";
import "../../App.css";
import { getTransactionHistory } from "../../store/transactions.slice";
import TransactionSkeleton from "../../elements/Loader/TransactionSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { formatTransactionDate } from "../../utils/formatter";

export const AccountHistory = ({ backHome }) => {
  const [search, setSearch] = useState("");
  const [actionsOpen, setActionsOpen] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const popupRef = useRef(null);
  const filterRef = useRef(null);
  const { transactions: history, loading } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionHistory(10));
  }, [dispatch]);

  const [dateFilteredHistory, setDateFilteredHistory] = useState([]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };
  const applyFilter = () => {
    const { startDate, endDate } = dateRange[0];
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
    const filtered = history.filter((item) => {
      const itemDate = new Date(item.trandate);
      return itemDate >= startDate && itemDate < adjustedEndDate;
    });
    setDateFilteredHistory(filtered);
    setShowCalendar(false);
  };
  const cancelFilter = () => {
    setDateFilteredHistory(history);
    setShowCalendar(false);
  };

  const filteringHistory = dateFilteredHistory.length
    ? dateFilteredHistory
    : history;
  const filteredHistory = filteringHistory.filter((transaction) => {
    const searchLower = search.toLowerCase();
    return (
      transaction.amount.toLowerCase().includes(searchLower) ||
      transaction.trandate.toLowerCase().includes(searchLower) ||
      transaction.narration.toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = filteredHistory;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  const handlePageNumber = (itemNumber) => {
    setItemsPerPage(itemNumber);
    setCurrentPage(1);
    window.scrollTo({ top: 0 });
  };

  const toggleAction = (index) => {
    setActionsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActionsOpen(false);
    }
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <Box>
        <HStack bg="#EAECF0" px={{base: "14px", md: "26px"}} py="14px" borderRadius="12px 12px 0 0">
          <Button
            onClick={backHome}
            h="24px"
            bg="#EAECF0"
            p={0}
            _hover={{ bg: "#EAECF0" }}
          >
            <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
          </Button>
          <Text
            width="100%"
            textAlign="center"
            fontSize={{base: "16px", md: "18px"}}
            fontWeight={600}
            color="#101828"
          >
            My Account History
          </Text>
        </HStack>

        <Stack
          spacing="16px"
          alignItems="center"
          border="1px solid #EFECE9"
          bg="#FFFFFF"
          borderRadius="0 0 12px 12px"
          px={{base: "12px", md: "40px"}}
          pb="114px"
          pt="48px"
        >
          <HStack w="100%" mb="12px" justifyContent="space-between">
            <HStack
              border="1px solid #DCD6CF"
              px={{base: "10px", md: "20px"}}
              py="10px"
              borderRadius="8px"
              width="50%"
            >
              <input
                onChange={handleSearch}
                placeholder="Search"
                style={{
                  width: "100%",
                  outline: "transparent",
                  border: "none",
                  fontSize: "16px",
                  color: "#A0A4A9",
                  padding: "0",
                }}
              />
              <img
                style={{ width: "24px", height: "24px" }}
                src={getImageUrl("icons/search.png")}
                alt="search"
              />
            </HStack>
            <div>
              <HStack
                border="1px solid #DCD6CF"
                p="10px"
                borderRadius="8px"
                cursor="pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <img src={getImageUrl("icons/filter.png")} alt="search" />
                <Text fontSize="16px" color="#A0A4A9">
                  Filter
                </Text>
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
                    <button className="cancel" onClick={cancelFilter}>
                      Cancel
                    </button>
                    <button className="apply" onClick={applyFilter}>
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </HStack>

          {currentHistory.length === 0 && !loading ? (
            <>
              <Text
                w="100%"
                alignSelf="center"
                textAlign="center"
                fontSize="20px"
                color="#394455"
                fontWeight={450}
                py="25px"
              >
                NO ENTRIES FOUND
              </Text>
            </>
          ) : (
            <table className={styles.historyTable}>
              <thead>
                <th>Transfers</th>
                <th>Amount</th>
                <th>Date</th>
                <th></th>
              </thead>

              {currentHistory.length === 0 && loading && (
                <TransactionSkeleton width={"63vw"} length={5} />
              )}
              <tbody>
                {currentHistory.map((transaction, index) => (
                  <tr key={index}>
                    <td>
                      <HStack>
                        {parseInt(transaction.amount) > 0 ? (
                          <img
                            className={styles.credDeb}
                            src={getImageUrl("icons/credit.png")}
                          />
                        ) : (
                          ""
                        )}
                        {parseInt(transaction.amount) < 0 ? (
                          <img
                            className={styles.credDeb}
                            src={getImageUrl("icons/debit.png")}
                          />
                        ) : (
                          ""
                        )}
                        <Stack gap={0}>
                          <Text
                            fontSize="14px"
                            color="#394455"
                            fontWeight={450}
                          >
                            {parseInt(transaction.amount) > 0 ||
                              transaction.category
                              ? transaction.narration
                              : `To ${transaction.beneficiaryName}`}{" "}
                          </Text>
                          <Text
                            fontSize="12px"
                            color="#667085"
                            fontWeight={450}
                          >
                            {parseInt(transaction.amount) > 0
                              ? "credit"
                              : "debit"}
                          </Text>
                        </Stack>
                      </HStack>
                    </td>
                    <td>₦{formatNumber(Math.abs(transaction.amount))}</td>
                    <td>
                      {formatTransactionDate(
                        transaction.trandate.split(" ")[0]
                      )}
                    </td>
                    <td>
                      <div>
                        <button onClick={() => toggleAction(index)}>
                          <img src={getImageUrl("icons/three_dots.png")} />
                        </button>
                        <Box
                          className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions
                            }`}
                          ref={popupRef}
                        >
                          <button
                            onClick={() => setActionsOpen(false)}
                            style={{ alignSelf: "end" }}
                          >
                            <img
                              style={{ width: "14px", height: "14px" }}
                              src={getImageUrl("icons/blackX.png")}
                            />
                          </button>
                          <HStack
                            cursor="pointer"
                            _hover={{ bg: "#EAECF0" }}
                            p="8px"
                          >
                            <img src={getImageUrl("icons/greyReceipt.png")} />
                            <Text
                              fontSize="14px"
                              fontWeight={500}
                              color="#667085"
                            >
                              Download Receipt
                            </Text>
                          </HStack>
                          <HStack
                            cursor="pointer"
                            _hover={{ bg: "#EAECF0" }}
                            p="8px"
                          >
                            <img src={getImageUrl("icons/greySend.png")} />
                            <Text
                              fontSize="14px"
                              fontWeight={500}
                              color="#667085"
                            >
                              Repeat Transaction
                            </Text>
                          </HStack>
                        </Box>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <Stack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{base: "column", md: "row"}}
          >
            <Pagination
              filteredData={filteredHistory}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
            <HStack
              flex="50%"
              justifyContent="space-between"
              alignItems="center"
            >
              {currentHistory.length === 0 ? (
                <Text fontSize="12px" color="#667085" fontWeight={450}>
                  Showing 0 entries
                </Text>
              ) : (
                <Text fontSize="12px" color="#667085" fontWeight={450}>
                  Showing {indexOfFirstItem + 1} to{" "}
                  {currentHistory.length + (currentPage - 1) * itemsPerPage} of{" "}
                  {filteredHistory.length} entries
                </Text>
              )}
              <Select
                w="100px"
                border="1px solid #EFECE9"
                fontSize="12px"
                fontWeight={450}
                color="#101828"
                onChange={(e) => handlePageNumber(e.target.value)}
              >
                <option value={8}>Show 8</option>
                <option value={10}>Show 10</option>
                <option value={15}>Show 15</option>
              </Select>
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
