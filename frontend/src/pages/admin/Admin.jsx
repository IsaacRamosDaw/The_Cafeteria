import ProfileBar from "../../components/profileBar/ProfileBar";
import SchoolContainer from "../../components/adminComponents/schoolContainer/SchoolContainer";
import AdminContainer from "../../components/adminComponents/adminContainer/AdminContainer";
import WorkerContainer from "../../components/adminComponents/workerContainer/WorkerContainer";
import "./Admin.scss";

// Speed dial components
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import Work from '@mui/icons-material/Work';
import AccountCircle from '@mui/icons-material/AccountCircle'
import School from '@mui/icons-material/School'
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate()
  
  
  const actions = [
    { icon: <Work />, name: 'Work', to: '/work' },
    { icon: <School />, name: 'School', to: '/school' },
    { icon: <AccountCircle />, name: 'account', to: '/admin' },
  ];

  const goTo = (page) => {
    navigate(page)
  }

  return (
    <div className="page-admin-container">
      <ProfileBar />

      <main id="admin-home">

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction 
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => goTo(action.to)}
          />
        ))}
      </SpeedDial>

        <details>
          <summary>
            <h2>Admins</h2>
          </summary>
          <AdminContainer />
        </details>

        <details>
          <summary>
            <h2>Schools</h2>
          </summary>
          <SchoolContainer />
        </details>

        <details>
          <summary>
            <h2>Workers</h2>
          </summary>
          <WorkerContainer />
        </details>

      </main>
    </div>
  );
}

export default Admin;
