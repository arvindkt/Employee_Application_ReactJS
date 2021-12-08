import React from 'react';
import {
  Heading,
  Tabs,
  TabPane,
  GridRow,
  GridCol,
  Button
} from '@athena/forge';

import UpdateEmployee from '../components/UpdateEmployee';
import ViewEmployee from '../components/ViewEmployee';
import {useAuth} from '../context/Auth';

export default function Home(){
    
    const {logout} = useAuth();
    
    function handleClick() {
        logout('/');
    }
 
    return (
      <div className="fe_u_padding">
        <GridRow>
		<GridCol width={{ small: 10 }}>
        <Tabs>
          <TabPane label="View Profile" padded mountedWhileHidden={true}>
            <ViewEmployee />
          </TabPane>
          <TabPane label="Update Profile" padded>
            <Heading text="Update" variant="section" headingTag="h2" />
                <UpdateEmployee />
          </TabPane>
        </Tabs>
        </GridCol>
        <div className="fe_u_margin--right-medium">
        <Button text="Logout" variant="tertiary" onClick ={handleClick}/>
        </div>
        
     </GridRow>
      </div>
    )
  
}