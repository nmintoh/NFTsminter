import { useState, useEffect } from "react";
import { useToast, Box, Text } from '@chakra-ui/react'
import axios from "axios";
import LogsContainer from "./LogsContainer"
import Log from "./Log"

const Home = () => {
    const [logsData, setLogsData] = useState([]);
    const alert = useToast();

    useEffect(() => {
        axios.get("/api/webhook/get")
        .then(res => {
            setLogsData(res.data);
        })
        .catch(err => {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        });
    }, [])

    return (
        <>
            <div className="main-pane">
                <Box
                    display='flex'
                    flexDir='column'
                    h='full'
                    alignItems='center'
                    mt='6'
                >
                    <Box 
                        maxWidth='1200px' 
                        width='100%'>
                        <Text fontSize='28pt'>Home</Text>
                    </Box>
                    <LogsContainer>
                        {logsData.map((log, idx) => (
                            <Log {...log} key={idx} />
                        ))}
                    </LogsContainer>
                </Box>
            </div>
        </>
    )
}

export default Home