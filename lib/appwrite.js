import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

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
    const avatars = new Avatars(client);
    const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

}


export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password)

    return session;
  } catch (error) {
    throw new Error(error);
  }
}  
  
