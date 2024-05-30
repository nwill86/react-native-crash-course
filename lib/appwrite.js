import { Account, Client, ID } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.narew.aora',
    projectId: '6658f35800067c100508',
    databaseId: '6658f5a300076774dc06',
    userCollectionId: '6658f602001ede21410f',
    videoCollectionId: '6658f666002592a91343',
    storageId: '6658f84100267fab5c3c'

}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    
;
    const account = new Account(client);

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

}

