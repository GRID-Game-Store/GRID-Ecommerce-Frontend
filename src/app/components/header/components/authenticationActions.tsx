"use client"
import { useRouter } from 'next/navigation';
import {
  Button,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useSession, signIn, signOut } from "next-auth/react";

const Login:React.FC<IAuthenticationActionsProps>  = ({setShowMenu}) => {
    const { push } = useRouter();
  
    return <Button onClick={() => signIn("keycloak")} sx={{height:"37px"}}>Login</Button>
}
const Registrations:React.FC<IAuthenticationActionsProps>  = ({setShowMenu}) => {
    const { push } = useRouter();    
    const handleChange = () => {
        push('/registrations')
        setShowMenu && setShowMenu(false)
    }
    return <Button onClick={handleChange} sx={{height:"37px"}}>Registrations</Button>
}
interface IAuthenticationActionsProps {
    setShowMenu?: (state: boolean) => void;
  }
const AuthenticationActions:React.FC<IAuthenticationActionsProps> = ({setShowMenu}) => {
    const matches = useMediaQuery('(min-width:1200px)');
    return <Stack direction={"row"} spacing={"20px"} position={!matches ? "fixed" : undefined} bottom={!matches ? "50px" : undefined} >
        <Login setShowMenu={setShowMenu} />
        <Registrations setShowMenu={setShowMenu}/>
    </Stack>
}

export { AuthenticationActions };