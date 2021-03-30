import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import jwtDecode from "jwt-decode";

/**
 * Implementation of the DemoTab content page
 */
export const DemoTab = () => {

    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();
    const [name, setName] = useState<string>();
    const [error, setError] = useState<string>();
    const [token, setToken] = useState<any>();
    


    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.authentication.getAuthToken({
                successCallback: (token: string) => {
                    const decoded: { [key: string]: any; } = jwtDecode(token) as { [key: string]: any; };
                    setToken(token);
                    setName(decoded!.name);
                    
                    microsoftTeams.appInitialization.notifySuccess();
                },
                failureCallback: (message: string) => {
                    setError(message);
                    microsoftTeams.appInitialization.notifyFailure({
                        reason: microsoftTeams.appInitialization.FailedReason.AuthFailed,
                        message
                    });
                },
                resources: [process.env.DEMOTAB_APP_URI as string]
            });
        } else {
            setEntityId("Not in Microsoft Teams");
        }
    }, [inTeams]);

    useEffect(() => {
        if (context) {
            setEntityId(context.entityId);
        }
    }, [context]);

    /**
     * The render() method to create the UI of the tab
     */


    async function fetchData(token) {

        const response = await fetch("https://teamsnewsapp.azurewebsites.net/api/teamsapp/GetMessagesForTenant/79c08c44-f997-49a5-8409-1d770362ed10",{
        method:"GET",
        headers: {"Authorization": "Bearer " + "hansiburli", "Content-Type": "application/json",
    },
      })
      const data = await response.json();
      console.log(data);
    //   .then(response =>{console.log(response.data)})
    //   .then(result => {
    //     console.log(result);
    // })
    // .catch(e => {
    //     console.log(e);
    // });
  
        // const data = await response;
        // console.log(response);
        }

    const handleClick =()=> {
        fetchData(token)
    };


    return (
        <Provider theme={theme}>
            <Flex fill={true} column styles={{
                padding: ".8rem 0 .8rem .5rem"
            }}>
                <Flex.Item>
                    <Header content="This is your tab" />
                </Flex.Item>
                <Flex.Item>
                    <div>
                        <div>
                            <Text content={`Hello ${name}`} />
                            <p>{token}</p>
                            <h3>updated14</h3>
                             
                        </div>
                        {error && <div><Text content={`An SSO error occurred ${error}`} /></div>}

                        <div>
                            <Button onClick = {handleClick}>Click Me</Button>
                        </div>
                    </div>
                </Flex.Item>
                <Flex.Item styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Text size="smaller" content="(C) Copyright Johannes Zarre" />
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
