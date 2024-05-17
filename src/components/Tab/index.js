
import React, { useContext } from 'react';
import App from "components";
import PropTypes from "prop-types";
import TabPanel from '@mui/lab/TabPanel';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createContext } from 'react';
import TabContext from '@mui/lab/TabContext';
export const TabsContext = createContext({
  index: 0,
  setIndex: () => { }
});

const TabsUC = ({ tab, handleChange }) => {
  const { index, setIndex } = useContext(TabsContext);
  const HandleChange = (event, newValue) => {
    if (App.service.isNullOrEmpty(handleChange)) {
      setIndex(newValue)
    } else {
      handleChange(() => setIndex(newValue))
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: App.color.white,
        p: "14px",
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.15)",
      }}
      mb={1}
    >
      <Tabs
        value={index}
        onChange={HandleChange}
        sx={{ width: "100%", "& .MuiTabs-flexContainer": { width: "100%" } }}
        TabIndicatorProps={{
          style: {
            backgroundColor: App.color.transparent,
          },
        }}
      >
        {tab &&
          tab.map((e, i) => {
            return (

              <Tab
                key={i}
                value={e.value}
                disabled={e.disabled || false}
                label={
                  <Box sx={{
                    position: "relative", width: "100%",
                  }}>

                    {e.label}
                    <Box sx={{
                      position: "absolute", right: 0, top: 0,
                      backgroundColor: App.color.main,
                      display: e.badge > 0 ? 'block' : 'none',
                      // pr: .5,
                      // pl: .5,
                      // pt: .5,
                      // pb: .5,
                      px: .7,
                      py: .2,
                      borderRadius: "4px"
                    }}>
                      <App.Label text={e.badge > 99 ? "99+" : e.badge}
                        color={App.color.white}
                        size={App.text.size.sm} />
                    </Box>
                  </Box>
                }
                sx={{
                  width: `calc(100% / ${tab.length})`,
                  maxWidth: `calc(100% / ${tab.length})`,
                  "&.Mui-selected": {
                    // color:
                    //   e.value === index ? App.color.main
                    //     : App.color.textCaption,
                    backgroundColor: App.color.disabled,
                    borderRadius: "40px"
                  },
                }}

              ></Tab>


            );
          })}
      </Tabs>
    </Box>
  );
};
const TabContextUC = ({ children }) => {
  const { index } = useContext(TabsContext);
  return <TabContext value={index}>
    {children}
  </TabContext>
}
const TabPanelUC = ({ value, children }) => {
  return <TabPanel value={value} sx={{ p: 0 }}>
    {children}
  </TabPanel>
}
TabsUC.propTypes = {
  tab: [{ value: PropTypes.any, label: PropTypes.string }],
};
TabContextUC.propTypes = {
  children: PropTypes.node,
};
TabPanelUC.propTypes = {
  value: PropTypes.any,
  children: PropTypes.node,
};
export const TabPanels = TabPanelUC;
export const TabContexts = TabContextUC;

export default TabsUC;
