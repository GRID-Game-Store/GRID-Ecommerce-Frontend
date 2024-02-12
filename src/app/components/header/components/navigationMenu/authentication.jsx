import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Avatar from '../avatar';
import { AuthenticationActions } from '../authenticationActions';




const Authentication = () => {
    // const { data, isSuccess, isLoading, isFetched, isError } = useQuery({
    //     queryKey: ["auth"],
    //     queryFn: () => fetch("http://localhost:8082/api/v1/users/test", {
    //         include: "true"
    //     })
    //   });
    useEffect(() => {
        fetch("http://localhost:8082/api/v1/users/test", {
                        credentials: "include",
                })
    }, [])
      
    return (
        <div>

            {false ? <Avatar name='Kirill'/> : <AuthenticationActions/>}

        </div>
    );
}

export { Authentication };
