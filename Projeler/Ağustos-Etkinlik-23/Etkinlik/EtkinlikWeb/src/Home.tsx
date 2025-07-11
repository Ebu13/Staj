import { SetStateAction, useState } from "react";
import MisafirPage from "./Misafir";
import ResponsiveTabs from "./components/Tabbar";
import { Box } from "@mui/material";
import BelediyePage from "./Belediye";
import UnvanPage from "./Unvan";

const Home = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (_event: unknown, newValue: SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <div>
      <ResponsiveTabs
        items={[
          { title: "Misafir Ekle", onClick: () => console.log("Tab 1 clicked") },
          { title: "Belediye Ekle", onClick: () => console.log("Tab 2 clicked") },
          { title: "Unvan Ekle", onClick: () => console.log("Tab 3 clicked") },
        ]}
        value={value}
        onChange={handleTabChange}
        spreadWidth={false}
      />
      <Box >
        {value === 0 && <MisafirPage />}
        {value === 1 && <BelediyePage />}
        {value === 2 && <UnvanPage />}
      </Box>
    </div>
  );
};

export default Home;
