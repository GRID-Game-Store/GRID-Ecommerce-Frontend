"use client"
import { signIn } from 'next-auth/react';

import {
  Button,
  Stack,
  useMediaQuery,
} from '@mui/material';

const Login:React.FC<IAuthenticationActionsProps>  = ({setShowMenu}) => {
    return <Button onClick={() => signIn("keycloak")} sx={{height:"37px"}}>Login</Button>
}
interface IAuthenticationActionsProps {
    setShowMenu?: (state: boolean) => void;
  }
const AuthenticationActions:React.FC<IAuthenticationActionsProps> = ({setShowMenu}) => {
    const matches = useMediaQuery('(min-width:1200px)');
    return <Stack direction={"row"} spacing={"20px"} position={!matches ? "fixed" : undefined} bottom={!matches ? "50px" : undefined} >
        <Login setShowMenu={setShowMenu} />
    </Stack>
}

export { AuthenticationActions };