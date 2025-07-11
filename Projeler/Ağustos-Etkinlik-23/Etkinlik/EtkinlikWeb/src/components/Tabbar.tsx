import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Power } from 'react-bootstrap-icons';
import SessionStorageService from '../services/StorageService';
import { useNavigate } from 'react-router-dom';

function ResponsiveTabs({ items, spreadWidth, value, onChange }:any) {
  const navigate=useNavigate()
  return (
    <div className="container">
      <div className="d-flex flex-row justify-content-between align-items-center  w-100 mt-3">
    {/* <img height={34} src="sampas-logo.svg" alt="" /> */}
    <Box className="rounded-2 " sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        
        value={value}
        onChange={onChange}
        variant={spreadWidth ? 'fullWidth' : 'scrollable'}
        indicatorColor="primary"  
        textColor="primary"
        aria-label="responsive tabs example"
      >
        {items.map((item:any, index:any) => (
          <Tab label={item.title} key={index} />
        ))}
      </Tabs>
    </Box>
    <Power cursor={"pointer"} size={34}  className='border p-2 bg-danger text-white rounded-5' onClick={() => {
      SessionStorageService.clearAll()
      navigate("/")
    }} />
  </div>
    </div>
   
  );
}

ResponsiveTabs.propTypes = {
  items: PropTypes.array.isRequired,
  spreadWidth: PropTypes.bool,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ResponsiveTabs;
